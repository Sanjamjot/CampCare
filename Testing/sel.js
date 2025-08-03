import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js"; // Required for newer versions

async function testLogin() {
  const options = new chrome.Options();
  // options.addArguments('--headless'); // Uncomment for headless mode

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // 1. Open login/register page
    await driver.get("http://localhost:5173");
    await driver.sleep(2000);

    // 2. Perform login
    await driver.findElement(By.name("phone")).sendKeys("102203272");
    await driver.findElement(By.name("password")).sendKeys("123456", Key.RETURN);
    await driver.sleep(3000);

    // 3. Handle login alert (if any)
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      console.log("🔔 Pop-up:", await alert.getText());
      await alert.accept();
      console.log("✅ Pop-up closed.");
    } catch {
      console.log("⚠ No alert appeared.");
    }

    // 4. Confirm successful login
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes("/home")) {
      console.log("✅ Login Successful & Redirected to /home.");
    } else {
      const bodyText = await driver.findElement(By.tagName("body")).getText();
      if (bodyText.includes("Login Successful")) {
        console.log("✅ Login message detected on page.");
      } else {
        console.log("❌ Login failed or message not found.");
      }
    }

    // 5. Slowly scroll the page
    const scrollStep = 100;
    const delay = 100;
    let currentScroll = 0;
    const totalHeight = await driver.executeScript("return document.body.scrollHeight");

    while (currentScroll < totalHeight) {
      await driver.executeScript(`window.scrollBy(0, ${scrollStep});`);
      currentScroll += scrollStep;
      await driver.sleep(delay);
    }
    console.log("⬇️ Slowly scrolled to bottom.");

    // 6. Go to campus dispensary
    await driver.get("http://localhost:5173/campus-dispensary");
    console.log("➡️ Redirected to /campus-dispensary.");
    await driver.sleep(2000);

    // 7. Fill dispensary form
    await driver.findElement(By.name("name")).sendKeys("Sanjamjot Singh");
    await driver.findElement(By.name("email")).sendKeys("bindrasanjamjot@gmail.com");
    await driver.findElement(By.name("date")).sendKeys("06-05-2025");
    await driver.findElement(By.name("time")).sendKeys("10:00");
    await driver.findElement(By.name("problemType")).sendKeys("Skin");
    await driver.findElement(By.name("issue")).sendKeys("disease");
    console.log("📝 Form filled.");

    // 8. Handle submission alert
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      console.log("🔔 Pop-up:", await alert.getText());
      await alert.accept();
      console.log("✅ Alert closed.");
    } catch {
      console.log("⚠ No alert appeared after form submission.");
    }

    // 9. Use AI Help
    await driver.get("http://localhost:5173/ai-help");
    console.log("➡️ Redirected to /ai-help page.");
    await driver.sleep(2000);

    await driver.findElement(By.name("symptoms")).sendKeys("fever");
    const submitButton = await driver.findElement(By.css("button[type='submit']"));
    await submitButton.click();
    console.log("🧠 Clicked 'Get Advice'.");

    await driver.sleep(10000); // Wait for AI response
    const responseText = await driver.findElement(By.css("ul")).getText();
    console.log("📝 AI Response:", responseText);

    // 10. Navigate through other pages
    await driver.get("http://localhost:5173/tips");
    console.log("➡️ Redirected to /lifestyle.");
    await driver.sleep(2000);

    await driver.get("http://localhost:5173/doctor-details");
    console.log("➡️ Redirected to /doctor page.");
    await driver.sleep(2000);

    await driver.get("http://localhost:5173/appointments");
    console.log("➡️ Redirected to /appointments.");
    await driver.sleep(2000);

    // 11. Interact with doctor login
    await driver.findElement(By.id("jii")).sendKeys("admin123");
    await driver.wait(until.elementLocated(By.id("hello")), 5000);
    await driver.findElement(By.id("hello")).click();
    console.log("🖱️ Clicked 'hello' button.");

    // 12. Visit About Us page
    await driver.get("http://localhost:5173/aboutus");
    console.log("➡️ Redirected to /aboutus.");
    await driver.sleep(2000);

  } catch (error) {
    console.error("❌ Test Error:", error.message);
  } finally {
    // Optional: Uncomment to close browser after test
    // await driver.quit();
  }
}

testLogin();
