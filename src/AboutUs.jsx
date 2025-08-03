import React from "react";
import Header from "./Header";
const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sanjamjot Singh (102203270)",
      email: "sbindra_be22@thapar.edu",
    },

    {
      name: "Geetansh Mohindru (102203718)",
      email: "gmohindru_be22@thapar.edu",
    },

    {
      name: "Iipsita Devgan (102203408)",
      email: "idevgan_be22@thapar.edu",
    },
  ];

  return (
    <><Header/>
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        margin: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* About Us Section */}
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h2>About Us</h2>
        <p>We are a passionate team dedicated to enhancing healthcare services.</p>
        <ul style={{ paddingLeft: "0", listStyleType: "none" }}>
          {teamMembers.map((member, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <strong>{member.name}</strong>
              <br />
              <a
                href={`mailto:${member.email}`}
                style={{
                  textDecoration: "none",
                  color: "#4CAF50",
                  fontWeight: "bold",
                }}
              >
                {member.email}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Section */}
      <div style={{ flex: 1, paddingTop: "15px" }}>
        <img
          src="https://www.thapar.edu/upload/files/hlc2.jpg"
          alt="Our Team"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
    </>
  );
};

export default AboutUs;
