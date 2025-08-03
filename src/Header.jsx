import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "#4CAF50",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Link
        to="/home"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Home
      </Link>
      <Link
        to="/campus-dispensary"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
      Book Appointment
      </Link>
      <Link
        to="/ai-help"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        AI Help
      </Link>
      {/* <Link
        to="/tips"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
    Lifestyle
      </Link> */}
      <Link
        to="/doctor-details"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Doctor Details
      </Link>
      
      <Link
        to="/appointments"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Doctor's Column
      </Link>
      <Link
        to="/aboutus"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
       About Us
      </Link>
      
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
      Logout
      </Link>
    </nav>
  );
};

export default Header;
