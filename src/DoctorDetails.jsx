import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

const DoctorDetails = () => {
  const doctors = [
    {
      name: 'Dr. Mahesh Kumar Sharma',
      position: 'Faculty-in-Charge, Health Centre',
      additional: 'Professor & Head, SOM',
      email: 'mksharma@thapar.edu',
      image: 'https://www.thapar.edu/upload/files/mahesh.jpg',
    },
    {
      name: 'Dr. Ritu Bassi',
      position: 'SR. MEDICAL OFFICER',
      additional: 'M.B.B.S, PGDHA',
      experience: 'Experience: 23 yrs',
      image: 'https://www.thapar.edu/upload/files/ritu.jpg',
    },
    {
      name: 'Dr. Ajay Gupta',
      position: 'MEDICAL OFFICER',
      additional: 'M.B.B.S, M.D (Pediatrics)',
      experience: 'Experience: 46 yrs',
      image: 'https://www.thapar.edu/upload/files/ajay.jpg',
    },
    {
      name: 'Dr. Jeevan Jot Singh',
      position: 'MEDICAL OFFICER',
      additional: 'M.B.B.S',
      experience: 'Experience: 9.2 yrs',
      image: 'https://www.thapar.edu/upload/files/jeevan.jpg',
    },
    {
      name: 'Dr. Gaganpreet Singh',
      position: 'RMO',
      additional: 'M.B.B.S',
      experience: 'Experience: 3 yrs',
      image: 'https://www.thapar.edu/upload/files/gaganpreethealth.jpg',
    },
    {
      name: 'Dr. Simran Sharma',
      position: 'MEDICAL OFFICER',
      additional: 'M.B.B.S',
      experience: 'Experience: 5 months',
      image: 'https://www.thapar.edu/upload/files/simranhl.jpg',
    },
  ];

  return (
    <>
      <Header />
      <div
        className="container mt-4"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'url(https://www.thapar.edu/upload/files/hlc2.jpg)', // Background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15, // Lighter background
            zIndex: -1, // Keep background behind content
          }}
        ></div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#2C6F2F',
              marginBottom: '30px',
            }}
          >
            Meet Our Doctors
          </motion.h2>

          {/* Head Doctor Section */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: '10px',
                width: '220px', // Slightly smaller width for all cards
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '15px', // Reduced padding for a compact look
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Added transition for hover effect
              }}
              whileHover={{
                scale: 1.05, // Slight scale effect on hover
                boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)', // Box-shadow on hover
              }}
            >
              <img
                src={doctors[0].image}
                alt={doctors[0].name}
                style={{
                  width: '170px', // Slightly smaller image size
                  height: 'auto',
                  borderRadius: '50%',
                  border: '4px solid #4CAF50',
                  marginBottom: '10px',
                }}
              />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                {doctors[0].name}
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '5px' }}>{doctors[0].position}</p>
              <p style={{ fontSize: '14px', marginBottom: '5px' }}>{doctors[0].additional}</p>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                <a href={`mailto:${doctors[0].email}`} style={{ color: '#4CAF50' }}>
                  {doctors[0].email}
                </a>
              </p>
            </motion.div>
          </div>

          {/* Second Row with Two Doctors */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            {[doctors[1], doctors[2]].map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  margin: '10px',
                  width: '200px', // Reduced width for better alignment
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '15px',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Added transition for hover effect
                }}
                whileHover={{
                  scale: 1.05, // Slight scale effect on hover
                  boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)', // Box-shadow on hover
                }}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: '140px', // Reduced image size
                    height: 'auto',
                    borderRadius: '50%',
                    border: '4px solid #4CAF50',
                    marginBottom: '10px',
                  }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  {doctor.name}
                </h3>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>{doctor.position}</p>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>{doctor.additional}</p>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>{doctor.experience}</p>
              </motion.div>
            ))}
          </div>

          {/* Third Row with Three Doctors */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {[doctors[3], doctors[4], doctors[5]].map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  margin: '10px',
                  width: '200px', // Reduced width
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  padding: '15px',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Added transition for hover effect
                }}
                whileHover={{
                  scale: 1.05, // Slight scale effect on hover
                  boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)', // Box-shadow on hover
                }}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: '140px', // Reduced image size
                    height: 'auto',
                    borderRadius: '50%',
                    border: '4px solid #4CAF50',
                    marginBottom: '10px',
                  }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                  {doctor.name}
                </h3>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>{doctor.position}</p>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>{doctor.additional}</p>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>{doctor.experience}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
