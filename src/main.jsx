import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import CampusDispensary from './CampusDispensary.jsx';
import AIHelp from './AIHelp.jsx';
import DoctorDetails from './DoctorDetails.jsx';
import AppointmentsPage from './Appointments.jsx';
import HealthTips from './Articles.jsx';
import WelcomePage from './Welcome.jsx';
import SecureBillingPage from './Billing.jsx';
import AboutUs from './AboutUs.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={< App/>} />
        <Route path="/home" element={<WelcomePage/>} />

        {/* Route for Campus Dispensary */}
        <Route path="/campus-dispensary" element={<CampusDispensary />} />

        {/* Route for AI Help */}
        <Route path="/ai-help" element={<AIHelp />} />

        {/* Route for Doctor Details */}
        <Route path="/doctor-details" element={<DoctorDetails />} />
        
        <Route path="/appointments" element={<AppointmentsPage />} />
        {/* <Route path="/tips" element={<HealthTips />} /> */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/bill" element={<SecureBillingPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
