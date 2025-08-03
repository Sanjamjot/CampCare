import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./Header";

const CampusDispensary = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    issue: "",
    problemType: "",
  });

  const problemTypes = [
    "Fever & Cough",
    "Orthopedic",
    "Women Health",
    "Skin",
    "Respiratory",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/book-appointment",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          margin: "50px",
          fontFamily: "Arial, sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Form Section */}
        <motion.div
          style={{ flex: 1, marginRight: "20px" }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>Thapar Institute Campus Dispensary</h2>
          <p>Book your appointment with the campus doctor easily.</p>
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label>Problem Type:</label>
              <select
                name="problemType"
                value={formData.problemType}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select Problem Type</option>
                {problemTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Issue:</label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <motion.button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Appointment
            </motion.button>
          </form>
        </motion.div>

        {/* Image Section */}
        <motion.div
          style={{ flex: 1, paddingTop: "15px" }}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://www.thapar.edu/upload/files/hlc2.jpg"
            alt="Thapar Campus Dispensary"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CampusDispensary;
