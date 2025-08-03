import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BillingForm = () => {
  const [billingData, setBillingData] = useState({
    name: '',
    consultationFee: '',
    medicineCharges: '',
    pathologyCharges: '',
  });

  const [isBillVisible, setIsBillVisible] = useState(false); // State to toggle bill visibility

  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const { consultationFee, medicineCharges, pathologyCharges } = billingData;
    return (
      Number(consultationFee) + Number(medicineCharges) + Number(pathologyCharges)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBillVisible(true); // Show the bill once the form is submitted
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#2C6F2F',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
         Thapar Institute of Engineering and Technology
        </motion.h2>

        {!isBillVisible ? (
          // Form for data entry
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={billingData.name}
                onChange={handleChange}
                placeholder="Enter Patient Name"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label>Doctor Consultation Fee:</label>
              <input
                type="number"
                name="consultationFee"
                value={billingData.consultationFee}
                onChange={handleChange}
                placeholder="Enter Fee"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label>Medicine Charges:</label>
              <input
                type="number"
                name="medicineCharges"
                value={billingData.medicineCharges}
                onChange={handleChange}
                placeholder="Enter Charges"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <div>
              <label>Pathology Lab Charges:</label>
              <input
                type="number"
                name="pathologyCharges"
                value={billingData.pathologyCharges}
                onChange={handleChange}
                placeholder="Enter Charges"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <motion.button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
              whileHover={{
                scale: 1.05,
              }}
            >
              Submit & Generate Bill
            </motion.button>
          </form>
        ) : (
          // Display Bill
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: '#2C6F2F', textAlign: 'center', marginBottom: '20px' }}>
              Patient Bill
            </h3>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>
              <strong>Patient Name: </strong>{billingData.name}
            </div>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>
              <strong>Doctor Consultation Fee: </strong>₹{billingData.consultationFee}
            </div>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>
              <strong>Medicine Charges: </strong>₹{billingData.medicineCharges}
            </div>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>
              <strong>Pathology Lab Charges: </strong>₹{billingData.pathologyCharges}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px' }}>
              <strong>Total: </strong>₹{calculateTotal()}
            </div>
            <motion.button
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
              whileHover={{
                scale: 1.05,
              }}
              onClick={() => window.print()}
            >
              Print Bill
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingForm;
