#define _CRT_SECURE_NO_WARNINGS
#ifndef M_PI
#define M_PI 3.141
#endif

#include <GL/glut.h>
#include <vector>
#include <cmath>
#include <ctime>
#include <cstdlib>
#include <algorithm>
#include <fstream>
#include <string>

int powerUpsSpawned = 0;
float powerUpSpawnTimer = 0.0f;

struct Bullet { float x, y; };

enum EnemyType { SMALL, MEDIUM, LARGE, BOSS };

struct Enemy {
    float x = 0.0f, y = 0.0f;
    bool alive = true;
    EnemyType type = SMALL;
    float speed = 0.01f;
    int health = 1;
    float movementTimer = 0.0f;
    float direction = 1.0f; // For boss movement pattern
};

enum PowerUpType { RAPID_FIRE, SHIELD, EXTRA_LIFE };

struct PowerUp {
    float x, y;
    PowerUpType type;
    bool active = true;
};

struct Explosion { float x, y; float radius = 0.0f; bool active = true; };
struct Star { float x, y; };

std::vector<Bullet> bullets;
std::vector<Enemy> enemies;
std::vector<Explosion> explosions;
std::vector<Star> stars;
std::vector<PowerUp> powerUps;

float shipX = 0.0f;
float shipVelocity = 0.0f;
float maxShipSpeed = 0.02f;
int score = 0, lives = 3, level = 1;
int highScore = 0;
bool gameOver = false, gameStarted = false, isPaused = false;
bool hasShield = false;
bool hasRapidFire = false;
float powerUpTimer = 0.0f;
float rapidFireTimer = 0.0f;
bool bossActive = false;
int nextBossScore = 200;
float gameTime = 0.0f;

// Load high score from file
void loadHighScore() {
    std::ifstream inFile("highscore.dat");
    if (inFile.is_open()) {
        inFile >> highScore;
        inFile.close();
    }
}

// Save high score to file
void saveHighScore() {
    if (score > highScore) {
        highScore = score;
        std::ofstream outFile("highscore.dat");
        if (outFile.is_open()) {
            outFile << highScore;
            outFile.close();
        }
    }
}

void drawText(const char* str, float x, float y, void* font = GLUT_BITMAP_HELVETICA_18) {
    glRasterPos2f(x, y);
    for (int i = 0; str[i] != '\0'; i++)
        glutBitmapCharacter(font, str[i]);
}

void drawShip() {
    // Draw shield if active
    if (hasShield) {
        glColor4f(0.4f, 0.8f, 1.0f, 0.5f);
        glBegin(GL_TRIANGLE_FAN);
        glVertex2f(shipX, -0.9f);
        for (int i = 0; i <= 20; i++) {
            float angle = i * 2.0f * M_PI / 20;
            glVertex2f(shipX + cos(angle) * 0.08f, -0.9f + sin(angle) * 0.08f);
        }
        glEnd();
    }

    // Draw ship
    glColor3f(0.0f, 0.9f, 1.0f);
    glBegin(GL_POLYGON);
    glVertex2f(shipX, -0.85f);
    glVertex2f(shipX - 0.03f, -0.95f);
    glVertex2f(shipX - 0.015f, -1.0f);
    glVertex2f(shipX + 0.015f, -1.0f);
    glVertex2f(shipX + 0.03f, -0.95f);
    glEnd();

    glColor3f(1.0f, 0.3f, 0.0f);
    glBegin(GL_TRIANGLES);
    glVertex2f(shipX - 0.015f, -1.0f);
    glVertex2f(shipX + 0.015f, -1.0f);
    glVertex2f(shipX, -1.05f);
    glEnd();

    // Draw rapid fire indicator
    if (hasRapidFire) {
        glColor3f(1.0f, 0.8f, 0.0f);
        glBegin(GL_QUADS);
        glVertex2f(shipX - 0.025f, -0.85f);
        glVertex2f(shipX + 0.025f, -0.85f);
        glVertex2f(shipX + 0.02f, -0.82f);
        glVertex2f(shipX - 0.02f, -0.82f);
        glEnd();
    }
}

void drawBullet(float x, float y) {
    glBegin(GL_QUADS);
    glColor3f(1.0f, 1.0f, 0.0f);
    glVertex2f(x - 0.01f, y);
    glVertex2f(x + 0.01f, y);
    glColor3f(1.0f, 0.5f, 0.0f);
    glVertex2f(x + 0.01f, y + 0.05f);
    glVertex2f(x - 0.01f, y + 0.05f);
    glEnd();
}

void drawEnemy(Enemy& e) {
    if (e.type == BOSS) {
        // Draw boss enemy
        glColor3f(0.8f, 0.1f, 0.5f);

        // Draw boss main body
        glBegin(GL_POLYGON);
        float radius = 0.12f;
        for (int i = 0; i < 20; ++i) {
            float angle = 2 * M_PI * i / 20;
            glVertex2f(e.x + radius * cos(angle), e.y + radius * sin(angle));
        }
        glEnd();

        // Draw boss details
        glColor3f(1.0f, 0.3f, 0.3f);
        glBegin(GL_TRIANGLES);
        glVertex2f(e.x - 0.12f, e.y);
        glVertex2f(e.x - 0.15f, e.y - 0.05f);
        glVertex2f(e.x - 0.15f, e.y + 0.05f);

        glVertex2f(e.x + 0.12f, e.y);
        glVertex2f(e.x + 0.15f, e.y - 0.05f);
        glVertex2f(e.x + 0.15f, e.y + 0.05f);
        glEnd();

        // Health bar
        float healthPercent = e.health / 10.0f;
        glColor3f(1.0f - healthPercent, healthPercent, 0.0f);
        glBegin(GL_QUADS);
        glVertex2f(e.x - 0.1f, e.y + 0.15f);
        glVertex2f(e.x - 0.1f + 0.2f * healthPercent, e.y + 0.15f);
        glVertex2f(e.x - 0.1f + 0.2f * healthPercent, e.y + 0.17f);
        glVertex2f(e.x - 0.1f, e.y + 0.17f);
        glEnd();
    }
    else {
        // Draw regular enemies
        switch (e.type) {
        case SMALL: glColor3f(0.9f, 0.1f, 0.1f); break;
        case MEDIUM: glColor3f(0.7f, 0.3f, 0.3f); break;
        case LARGE: glColor3f(0.5f, 0.1f, 0.1f); break;
        default: break;
        }
        glBegin(GL_POLYGON);
        float radius = (e.type == SMALL ? 0.04f : e.type == MEDIUM ? 0.06f : 0.08f);
        for (int i = 0; i < 20; ++i) {
            float angle = 2 * M_PI * i / 20;
            glVertex2f(e.x + radius * cos(angle), e.y + radius * sin(angle));
        }
        glEnd();
    }
}

void drawPowerUp(PowerUp& p) {
    glBegin(GL_QUADS);
    switch (p.type) {
    case RAPID_FIRE:
        glColor3f(1.0f, 0.8f, 0.0f);
        break;
    case SHIELD:
        glColor3f(0.0f, 0.8f, 1.0f);
        break;
    case EXTRA_LIFE:
        glColor3f(0.0f, 1.0f, 0.0f);
        break;
    }
    glVertex2f(p.x - 0.03f, p.y - 0.03f);
    glVertex2f(p.x + 0.03f, p.y - 0.03f);
    glVertex2f(p.x + 0.03f, p.y + 0.03f);
    glVertex2f(p.x - 0.03f, p.y + 0.03f);
    glEnd();

    // Draw symbol inside power-up
    glBegin(GL_LINES);
    glColor3f(1.0f, 1.0f, 1.0f);
    switch (p.type) {
    case RAPID_FIRE:
        // Draw "F" for rapid fire
        glVertex2f(p.x - 0.015f, p.y - 0.015f);
        glVertex2f(p.x - 0.015f, p.y + 0.015f);
        glVertex2f(p.x - 0.015f, p.y);
        glVertex2f(p.x + 0.01f, p.y);
        break;
    case SHIELD:
        // Draw "S" for shield
        glVertex2f(p.x + 0.01f, p.y + 0.015f);
        glVertex2f(p.x - 0.01f, p.y + 0.015f);
        glVertex2f(p.x - 0.01f, p.y + 0.015f);
        glVertex2f(p.x - 0.01f, p.y);
        glVertex2f(p.x - 0.01f, p.y);
        glVertex2f(p.x + 0.01f, p.y);
        glVertex2f(p.x + 0.01f, p.y);
        glVertex2f(p.x + 0.01f, p.y - 0.015f);
        glVertex2f(p.x + 0.01f, p.y - 0.015f);
        glVertex2f(p.x - 0.01f, p.y - 0.015f);
        break;
    case EXTRA_LIFE:
        // Draw "+" for extra life
        glVertex2f(p.x - 0.015f, p.y);
        glVertex2f(p.x + 0.015f, p.y);
        glVertex2f(p.x, p.y - 0.015f);
        glVertex2f(p.x, p.y + 0.015f);
        break;
    }
    glEnd();
}

void drawExplosion(Explosion& ex) {
    if (!ex.active) return;
    float alpha = 1.0f - ex.radius / 0.2f;
    glBegin(GL_TRIANGLE_FAN);
    glColor4f(1.0f, 1.0f, 0.0f, alpha);
    glVertex2f(ex.x, ex.y);
    for (int i = 0; i <= 20; i++) {
        float angle = i * 2.0f * M_PI / 20;
        float dx = cos(angle) * ex.radius;
        float dy = sin(angle) * ex.radius;
        glColor4f(1.0f, 0.4f + 0.6f * ((rand() % 100) / 100.0f), 0.0f, alpha);
        glVertex2f(ex.x + dx, ex.y + dy);
    }
    glEnd();
}

void drawStars() {
    glColor3f(1.0f, 1.0f, 1.0f);
    glBegin(GL_POINTS);
    for (auto& star : stars) glVertex2f(star.x, star.y);
    glEnd();
}

void spawnEnemy() {
    if (!bossActive) {
        if (score >= nextBossScore && !std::any_of(enemies.begin(), enemies.end(), [](const Enemy& e) { return e.type == BOSS; })) {
            // Spawn boss
            Enemy boss;
            boss.x = 0.0f;
            boss.y = 1.0f;
            boss.type = BOSS;
            boss.speed = 0.005f;
            boss.health = 10;
            enemies.push_back(boss);
            bossActive = true;
            nextBossScore += 200; // Next boss appears 200 points later
        }
        else {
            // Spawn regular enemy
            EnemyType type = static_cast<EnemyType>(rand() % 3);
            float speed = 0.01f + 0.002f * type + 0.0005f * level;
            enemies.push_back({ (rand() % 200 - 100) / 100.0f, 1.0f, true, type, speed, 1 });
        }
    }
}

void spawnPowerUp() {
    if (rand() % 150 <1 ) { // 2% chance per frame to spawn power-up
        PowerUpType type = static_cast<PowerUpType>(rand() % 3);
        powerUps.push_back({ (rand() % 180 - 90) / 100.0f, 1.0f, type, true });
    }
}

void fireBullet() {
    bullets.push_back({ shipX, -0.9f });
}

void update(int) {
    if (!gameStarted || gameOver || isPaused) {
        glutTimerFunc(16, update, 0);
        return;
    }

    gameTime += 0.016f;

    // Update ship position
    shipX += shipVelocity;
    if (shipX < -0.95f) shipX = -0.95f;
    if (shipX > 0.95f) shipX = 0.95f;
    shipVelocity *= 0.9f;

    // Update power-up effects
    if (hasRapidFire) {
        rapidFireTimer += 0.016f;
        if (rapidFireTimer >= 0.1f) { // Fire every 0.1 seconds
            fireBullet();
            rapidFireTimer = 0.0f;
        }

        powerUpTimer += 0.016f;
        if (powerUpTimer >= 5.0f) { // Rapid fire lasts 5 seconds
            hasRapidFire = false;
            powerUpTimer = 0.0f;
        }
    }

    // Update game objects
    for (auto& b : bullets) b.y += 0.05f;

    for (auto& e : enemies) {
        if (e.type == BOSS) {
            // Boss movement pattern - sway left and right
            e.movementTimer += 0.016f;
            if (e.y > 0.7f) {
                e.y -= e.speed;
            }
            else {
                e.x += e.direction * e.speed * 0.7f;
                if (e.x > 0.7f || e.x < -0.7f) {
                    e.direction *= -1;
                }

                // Periodically fire bullets at player
                if (fmod(e.movementTimer, 2.0f) < 0.05f) {
                    Enemy bullet;
                    bullet.x = e.x;
                    bullet.y = e.y - 0.1f;
                    bullet.type = SMALL;
                    bullet.speed = 0.02f;
                    enemies.push_back(bullet);
                }
            }
        }
        else {
            e.y -= e.speed;
        }
    }

    for (auto& p : powerUps) p.y -= 0.01f;

    for (auto& ex : explosions) {
        ex.radius += 0.01f;
        if (ex.radius > 0.2f) ex.active = false;
    }

    for (auto& star : stars) {
        star.y -= 0.002f;
        if (star.y < -1.0f) star.y = 1.0f;
    }

    // Check bullet collisions with enemies
    for (auto& e : enemies) {
        float radius = 0.0f;
        if (e.type == BOSS) radius = 0.12f;
        else radius = (e.type == SMALL ? 0.04f : e.type == MEDIUM ? 0.06f : 0.08f);

        for (auto it = bullets.begin(); it != bullets.end(); ) {
            bool hitDetected = false;
            if (e.alive && fabs(it->x - e.x) < radius && fabs(it->y - e.y) < radius) {
                e.health--;
                hitDetected = true;

                if (e.health <= 0) {
                    e.alive = false;
                    explosions.push_back({ e.x, e.y });

                    if (e.type == BOSS) {
                        // Bigger explosion for boss
                        for (int i = 0; i < 5; i++) {
                            float offsetX = (rand() % 20 - 10) / 100.0f;
                            float offsetY = (rand() % 20 - 10) / 100.0f;
                            explosions.push_back({ e.x + offsetX, e.y + offsetY });
                        }
                        score += 50;
                        bossActive = false;
                    }
                    else {
                        score += (e.type + 1) * 10;
                    }
                }

                it = bullets.erase(it);
            }
            else {
                ++it;
            }
        }
    }

    // Check powerup collisions with ship
    for (auto it = powerUps.begin(); it != powerUps.end(); ) {
        if (it->active && fabs(it->x - shipX) < 0.07f && fabs(it->y + 0.9f) < 0.07f) {
            switch (it->type) {
            case RAPID_FIRE:
                hasRapidFire = true;
                powerUpTimer = 0.0f;
                break;
            case SHIELD:
                hasShield = true;
                break;
            case EXTRA_LIFE:
                lives++;
                break;
            }
            it = powerUps.erase(it);
        }
        else if (it->y < -1.0f) {
            it = powerUps.erase(it);
        }
        else {
            ++it;
        }
    }

    // Remove objects that are no longer active
    enemies.erase(std::remove_if(enemies.begin(), enemies.end(), [](Enemy& e) {
        return !e.alive || e.y < -1.0f;
        }), enemies.end());

    bullets.erase(std::remove_if(bullets.begin(), bullets.end(), [](Bullet& b) {
        return b.y > 1.0f;
        }), bullets.end());

    explosions.erase(std::remove_if(explosions.begin(), explosions.end(), [](Explosion& e) {
        return !e.active;
        }), explosions.end());

    // Check ship collisions with enemies
    for (auto& e : enemies) {
        float radius = (e.type == BOSS) ? 0.12f :
            (e.type == SMALL ? 0.04f : e.type == MEDIUM ? 0.06f : 0.08f);

        if (e.alive && e.y < -0.85f && fabs(e.x - shipX) < (radius + 0.03f)) {
            if (hasShield) {
                // Shield absorbs the hit
                hasShield = false;
                e.alive = false;
                explosions.push_back({ e.x, e.y });
            }
            else {
                lives--;
                e.alive = false;
                explosions.push_back({ e.x, e.y });
                if (lives <= 0) {
                    gameOver = true;
                    saveHighScore();
                }
            }
        }
    }

    // Spawn enemies and power-ups
    if (rand() % (50 - level) == 0) spawnEnemy();
    spawnPowerUp();

    // Update level based on score
    level = 1 + score / 100;

    glutPostRedisplay();
    glutTimerFunc(16, update, 0);
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    drawStars();

    if (!gameStarted) {
        glColor3f(1, 1, 1);
        drawText("\xF0\x9F\x9A\x80 SPACE FIGHTER \xF0\x9F\x9A\x80", -0.35f, 0.3f);
        drawText("Press ENTER to Start", -0.3f, -0.1f);
        char highScoreText[64];
        sprintf(highScoreText, "High Score: %d", highScore);
        drawText(highScoreText, -0.2f, -0.3f);
        glutSwapBuffers();
        return;
    }

    drawShip();
    for (auto& b : bullets) drawBullet(b.x, b.y);
    for (auto& e : enemies) drawEnemy(e);
    for (auto& p : powerUps) drawPowerUp(p);
    for (auto& ex : explosions) drawExplosion(ex);

    // Draw HUD
    char hud[64];
    sprintf(hud, "Score: %d   Lives: %d   Level: %d", score, lives, level);
    glColor3f(1, 1, 1);
    drawText(hud, -0.95f, 0.9f);

    if (gameOver) {
        char gameOverText[64];
        sprintf(gameOverText, "GAME OVER! Final Score: %d", score);
        glColor3f(1, 0.3f, 0.3f);
        drawText(gameOverText, -0.4f, 0.1f);

        char highScoreText[64];
        sprintf(highScoreText, "High Score: %d", highScore);
        glColor3f(1, 1, 0.5f);
        drawText(highScoreText, -0.2f, 0.0f);

        glColor3f(1, 1, 1);
        drawText("Press R to Restart", -0.25f, -0.1f);
    }

    if (isPaused && !gameOver) {
        glColor3f(1, 1, 0.5f);
        drawText("PAUSED", -0.1f, 0.0f);
        drawText("Press P to Resume", -0.25f, -0.1f);
    }

    glutSwapBuffers();
}

void keyboard(unsigned char key, int, int) {
    if (!gameStarted && key == 13) { // Enter key
        gameStarted = true;
        glutTimerFunc(0, update, 0);
    }

    if ((key == ' ' || key == 'z') && !gameOver && gameStarted && !isPaused) {
        fireBullet();
    }

    if (key == 'r' || key == 'R') {
        gameOver = false;
        score = 0;
        lives = 3;
        level = 1;
        bullets.clear();
        enemies.clear();
        explosions.clear();
        powerUps.clear();
        hasShield = false;
        hasRapidFire = false;
        isPaused = false;
        bossActive = false;
        nextBossScore = 200;
        glutTimerFunc(0, update, 0);
    }

    if ((key == 'p' || key == 'P') && gameStarted && !gameOver) {
        isPaused = !isPaused;
        if (!isPaused) glutTimerFunc(0, update, 0);
    }
}

void special(int key, int, int) {
    if (!gameStarted || isPaused) return;
    if (key == GLUT_KEY_LEFT) shipVelocity -= 0.002f;
    if (key == GLUT_KEY_RIGHT) shipVelocity += 0.002f;
    if (shipVelocity > maxShipSpeed) shipVelocity = maxShipSpeed;
    if (shipVelocity < -maxShipSpeed) shipVelocity = -maxShipSpeed;
}

void init() {
    glClearColor(0.0, 0.0, 0.05, 1.0);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    gluOrtho2D(-1, 1, -1, 1);
    srand(static_cast<unsigned>(time(0)));

    // Generate stars
    for (int i = 0; i < 100; i++)
        stars.push_back({ (rand() % 200 - 100) / 100.0f, (rand() % 200 - 100) / 100.0f });

    // Load high score
    loadHighScore();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_ALPHA);
    glutInitWindowSize(800, 800);
    glutCreateWindow("\xF0\x9F\x9A\x80 Space Fighter: Bullet & Blast Game");
    init();
    glutDisplayFunc(display);
    glutKeyboardFunc(keyboard);
    glutSpecialFunc(special);
    glutMainLoop();
    return 0;
}