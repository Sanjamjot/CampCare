import requests
import unittest

class TestAuthAPI(unittest.TestCase):

    BASE_URL = "http://localhost:3000/api"  # Your backend URL

    # def test_register_success(self):
    #     data = {
    #         "phone": "1234567890",  # Replace with a test phone number
    #         "password": "password123",  # Replace with a test password
    #     }
    #     response = requests.post(f"{self.BASE_URL}/register", json=data)

    #     self.assertEqual(response.status_code, 201, "Registration failed with status code {}".format(response.status_code))
    #     self.assertIn("Registration successful", response.json().get("message", ""))

    def test_register_failure(self):
        # Registering with the same phone again should return 400
        data = {
            "phone": "102203272",  # Replace with an existing phone number
            "password": "1234568",  # Replace with a test password
        }
        response = requests.post(f"{self.BASE_URL}/register", json=data)

        self.assertEqual(response.status_code, 400, "Expected 400 for already existing user.")
        self.assertIn("User already exists", response.json().get("message", ""))

    def test_login_success(self):
        # Assuming the user has been registered already
        data = {
            "phone": "102203278",  # Replace with a test phone number
            "password": "123456",  # Replace with a correct password
        }
        response = requests.post(f"{self.BASE_URL}/login", json=data)

        self.assertEqual(response.status_code, 200, "Login failed with status code {}".format(response.status_code))
        self.assertIn("Login successful", response.json().get("message", ""))
        self.assertIn("token", response.json())  # Ensure token is returned

    def test_login_failure_wrong_password(self):
        data = {
            "phone": "102203272",  # Replace with an existing phone number
            "password": "123458",  # Incorrect password
        }
        response = requests.post(f"{self.BASE_URL}/login", json=data)

        self.assertEqual(response.status_code, 400, "Expected 400 for wrong password.")
        self.assertIn("Invalid credentials", response.json().get("message", ""))

    def test_login_failure_unregistered_user(self):
        data = {
            "phone": "0000000000",  # Unregistered phone number
            "password": "123456",
        }
        response = requests.post(f"{self.BASE_URL}/login", json=data)

        self.assertEqual(response.status_code, 400, "Expected 400 for unregistered user.")
        self.assertIn("User not found", response.json().get("message", ""))


if __name__ == "__main__":
    unittest.main()
