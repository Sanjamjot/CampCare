import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const genAI = new GoogleGenerativeAI("AIzaSyDwhU5fK_D9hk5hyiDcpHlsEHqepqyhETY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function PrecautionAdvisor() {
  const [symptoms, setSymptoms] = useState(""); // Store input symptoms
  const [response, setResponse] = useState(null); // Store API response

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `A student is experiencing the following symptoms: ${symptoms}. Provide a list of precautions they should take. Give me only precautions and nothing else.`;

    try {
      const result = await model.generateContent(prompt);
      const textResponse = await result.response.text();
      setResponse(textResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Unable to fetch precautions at the moment. Please try again later.");
    }
  };

  const formatResponse = (text) => {
    if (!text) return null;

    return text.split("\n").map((line, index) => {
      if (line.trim().startsWith("*")) {
        return (
          <motion.li
            key={index}
            style={styles.listItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {line.replace("*", "").trim()}
          </motion.li>
        );
      }
      return (
        <p key={index} style={styles.paragraph}>
          {line}
        </p>
      );
    });
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <motion.div
          style={styles.contentContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Form Section */}
          <motion.div
            style={styles.formSection}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={styles.heading}>Precaution Advisor</h2>
            <p style={styles.subheading}>Enter your symptoms to get precautionary advice.</p>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="symptoms" style={styles.label}>Symptoms:</label>
                <input
                  id="symptoms"
                  type="text"
                  name="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="E.g., fever, headache, fatigue"
                />
              </div>
              <motion.button
                type="submit"
                style={styles.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Advice
              </motion.button>
            </form>
          </motion.div>

          {/* Precautionary Advice Section */}
          <motion.div
            style={styles.adviceSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 style={styles.heading}>Precautionary Advice</h3>
            {response ? (
              <ul style={styles.adviceList}>{formatResponse(response)}</ul>
            ) : (
              <p style={styles.textMuted}>Your advice will appear here.</p>
            )}
          </motion.div>

          {/* Image Section */}
          <motion.div
            style={styles.imageSection}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://www.thapar.edu/upload/files/hlc2.jpg"
              alt="Precaution Advisor"
              style={styles.image}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  contentContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
  },
  formSection: {
    flex: 1,
    minWidth: "300px",
    marginBottom: "20px",
  },
  adviceSection: {
    flex: 1,
    minWidth: "300px",
  },
  imageSection: {
    flex: 1,
    minWidth: "300px",
    paddingTop: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  subheading: {
    marginBottom: "15px",
    color: "#555",
  },
  adviceList: {
    paddingLeft: "20px",
    listStyleType: "disc",
  },
  listItem: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  textMuted: {
    color: "#777",
  },
  paragraph: {
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};
