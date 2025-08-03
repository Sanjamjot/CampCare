import React, { useState } from "react";

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    review: "",
  });

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit reviewData (e.g., send it to a server)
    alert("Thank you for your review!");
    setReviewData({
      name: "",
      email: "",
      review: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        margin: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Form Section */}
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h2>Share Your Experience</h2>
        <p>We value your feedback. Please leave a review of our services.</p>
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
              value={reviewData.name}
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
              value={reviewData.email}
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
            <label>Review:</label>
            <textarea
              name="review"
              value={reviewData.review}
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
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div style={{ flex: 1, paddingTop: "15px" }}>
        <img
          src="https://www.thapar.edu/upload/files/hlc2.jpg"
          alt="Thank you for your feedback"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default ReviewForm;
