import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";

const AppointmentsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState([]);

  const correctPassword = "admin123";

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchAppointments();
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Error deleting appointment. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Please Enter the Password to Access Appointments</h2>
        <input id="jii"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <button id="hello"
          onClick={handleLogin}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    );
  }

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
        <h2>All Appointments</h2>
        {appointments.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Email</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Date</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Time</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Issue</th>
                <th style={{ padding: "10px", border: "1px solid #ccc" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {appt.name}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {appt.email}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {appt.date}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {appt.time}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    {appt.issue}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteAppointment(appt._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
        <Link
          to="/bill"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Go to Bill Page
        </Link>
      </div>
    </>
  );
};

export default AppointmentsPage;
