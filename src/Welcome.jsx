import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";

const WelcomePage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Header Section */}
        <motion.header
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            textAlign: "center",
            marginBottom: "30px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to Thapar Institute Health Centre</h1>
          <p>Your health and well-being are our priority!</p>
        </motion.header>

        {/* Content Section */}
        <motion.main
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "30px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          {/* Introduction Text */}
          <section style={{ flex: 1, maxWidth: "600px" }}>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              About Us
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Health Centre, TIET provides essential medical services,
              addressing minor illnesses, injuries, and emergency cases. Equipped
              with modern facilities and a dedicated team, it ensures timely and
              efficient healthcare for the campus community.
            </motion.p>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              OPD Timings
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <li>
                <strong>Monday to Friday:</strong> 8:30 am to 6:00 pm
              </li>
              <li>
                <strong>Saturday:</strong>
                <ul>
                  <li>10:00 am to 2:00 pm</li>
                  <li>3:00 pm to 7:00 pm</li>
                  <li>8:00 pm to 2:00 am</li>
                </ul>
              </li>
              <li>
                <strong>Sunday:</strong>
                <ul>
                  <li>10:00 am to 2:00 pm</li>
                  <li>10:00 pm to 6:00 am (Only Medical Assistant available)</li>
                </ul>
              </li>
            </motion.ul>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Emergency Services
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Emergency cases are promptly attended to by the doctor. Ambulance
              services are available 24x7 for emergencies requiring
              transportation.
            </motion.p>
          </section>

          {/* Image Section */}
          <motion.section
            style={{ flex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.img
              src="https://www.thapar.edu/upload/files/hlc2.jpg"
              alt="Health Centre"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 120 }}
            />
          </motion.section>
        </motion.main>

        {/* Goals Section */}
        <motion.section
          style={{ marginBottom: "30px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
            Goals of the Health Centre
          </h3>
          <motion.ul
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <li>
              <strong>Enhance Overall Productivity:</strong> Ensure good health
              through basic medical care and counseling.
            </li>
            <li>
              <strong>Raise Health Awareness:</strong> Educate and inform the
              community about relevant health issues.
            </li>
            <li>
              <strong>Medical First Aid and Basic Health Care Services:</strong>{" "}
              Provide immediate care for minor illnesses and injuries.
            </li>
            <li>
              <strong>Prompt and Early Referral:</strong> Refer patients to
              specialized care for serious health concerns.
            </li>
            <li>
              <strong>Immediate Transfer of Emergency Cases:</strong> Utilize
              Institute ambulance services for critical situations.
            </li>
            <li>
              <strong>Health Awareness Programs:</strong> Conduct initiatives to
              promote health education and awareness.
            </li>
          </motion.ul>
        </motion.section>

        {/* Google Maps Embed Section */}
        <motion.section
          style={{ marginBottom: "30px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
            Visit Us
          </h3>
          <div style={{ textAlign: "center" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.8918282833565!2d76.36276687502257!3d30.35402400383756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028ac98e0ee71%3A0xca0c9c766e7f104f!2sThapar%20Dispensary!5e0!3m2!1sen!2sin!4v1732280115159!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: "0", borderRadius: "10px" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.section>

        {/* Call-to-Action */}
        <motion.footer
          style={{
            textAlign: "center",
            marginTop: "30px",
            backgroundColor: "#4CAF50",
            padding: "10px 20px",
            color: "white",
            borderRadius: "5px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p>Contact us today to book an appointment or learn more about our services!</p>
        </motion.footer>
      </div>
    </>
  );
};

export default WelcomePage;
 