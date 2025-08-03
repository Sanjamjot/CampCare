import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";

const HealthTips = () => {
  const tips = [
    { id: 1, title: "Balanced Diet", content: "Provides essential nutrients to boost immunity, energy, and overall health while reducing the risk of chronic diseases." },
    { id: 2, title: "Exercise", content: "Enhances cardiovascular health, strengthens muscles, improves mood, and prevents chronic diseases like diabetes and hypertension." },
    { id: 3, title: "Vaccination", content: "Protects against infectious diseases by strengthening immunity and preventing their spread through herd immunity." },
    { id: 4, title: "Hygiene", content: "Maintains cleanliness to prevent infections and contagious diseases, ensuring personal and community health." },
    { id: 5, title: "Mental Health", content: "Promotes emotional stability, stress management, and productivity while reducing the risk of anxiety and depression." },
    { id: 6, title: "Adequate Sleep", content: "Essential for mental clarity, physical repair, and immune function, reducing the risks of obesity, heart disease, and fatigue." },
    { id: 7, title: "Hydration", content: "Maintains bodily functions, improves digestion, regulates temperature, and prevents dehydration, enhancing overall energy and focus." },
    { id: 8, title: "Stress Management", content: "Reduces risks of chronic illnesses like heart disease and improves mental health through techniques like mindfulness and relaxation." },
    { id: 9, title: "Regular Checkups", content: "Detect health issues early, enabling timely treatment and reducing the risks of complications from undiagnosed conditions." },
  ];

  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "50px",
          textAlign: "center",
        }}
      >
        <h1>Health Tips for a Better Lifestyle</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }} // Slight shrink on tap
            >
              <h2 style={{ color: "#4CAF50", marginBottom: "10px" }}>
                {tip.title}
              </h2>
              <p style={{ color: "#555" }}>{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HealthTips;
