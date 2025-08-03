import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering
        ? "http://localhost:3000/api/register"
        : "http://localhost:3000/api/login";
      const { data } = await axios.post(endpoint, form);
      setMessage(data.message);
      if (!isRegistering) {
        console.log("Logged in:", data.token);
        alert("Login Successful! Redirecting to Home...");
        window.location.href = "/home";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.thapar.edu/upload/files/hlc2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(7px)",
        fontFamily: "'Poppins', sans-serif",
        color: "white",
      }}
    >
      <motion.div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "2rem",
            color: "#333",
          }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isRegistering ? "Register" : "Login"}
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="phone"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "1rem",
                color: "#555",
              }}
            >
              Unique ID
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "1rem",
                color: "#555",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
              required
            />
          </div>
          <motion.button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRegistering ? "Register" : "Login"}
          </motion.button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontSize: "0.95rem",
              color: message.includes("success") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            fontSize: "1rem",
            color: "#555",
          }}
        >
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleMode}
            style={{
              color: "#4CAF50",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default App;
