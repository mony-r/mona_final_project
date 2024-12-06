import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState([]);
  const [showNotification, setShowNotification] = useState(false); // State for controlling notification visibility

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    // const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData && storedAppointmentData.length > 0) {
      setAppointmentData(storedAppointmentData);
      console.log(storedAppointmentData)
      setShowNotification(true); // Show notification if appointment data exists
    }
    else {
        setShowNotification(false)
    }

  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar></Navbar>
      {/* Render children components */}
      {children}
      
      {/* Conditionally display notification if logged in and appointmentData is available */}
      {showNotification && isLoggedIn && appointmentData && (
        <div className="notification-container">
          <div className="notification-card">
            <div className="notification-card__content">
              {/* Display title for appointment details */}
              <h3 className="notification-card__title">Appointment Details</h3>
              
              {/* Display user name, doctor name, and appointment details */}
              <p className="notification-card__message">
                <strong>Doctor:</strong> {appointmentData[0]?.doctorName}
              </p>
              <p className="notification-card__message">
                <strong>speciality:</strong> {appointmentData[0]?.doctorSpeciality}
              </p>
              <p className="notification-card__message">
                <strong>Name:</strong> {appointmentData[0]?.name}
              </p>
              <p className="notification-card__message">
                <strong>Phone Number:</strong> {appointmentData[0]?.phoneNumber}
              </p>
              <p className="notification-card__message">
                <strong>Date of Appointment:</strong> {appointmentData[0]?.date}
              </p>
              <p className="notification-card__message">
                <strong>Time Slot:</strong> {appointmentData[0]?.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
