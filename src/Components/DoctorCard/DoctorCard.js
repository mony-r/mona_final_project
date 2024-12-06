import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import { v4 as uuidv4 } from 'uuid';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [username, setUsername] = useState("");
    const [doctorData, setDoctorData] = useState(null);
    const [isDoctorBooked, setDoctorBooked] = useState(false);
    const [filteredAppointment, setfilteredAppointment] = useState([])


    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));


        // Set doctorData state if storedDoctorData exists
        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        }
        if (storedAppointmentData) {
            const filteredAppointmentArray = storedAppointmentData.filter((appointment) => appointment.doctorName === name);
            setfilteredAppointment(filteredAppointmentArray)
            setAppointments(storedAppointmentData);
            console.log(appointments)
            
        }

    }, []);

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));
        var updatedAppointments = storedAppointmentData.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
        setfilteredAppointment( updatedAppointments.filter((appointment) => appointment.doctorName === name))
        setShowModal(false)
        window.location.reload();
    };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            name: appointmentData.name,
            doctorName: appointmentData.doctorName,
            phoneNumber: appointmentData.phoneNumber,
            date: appointmentData.date,
            time: appointmentData.time,
            doctorSpeciality: appointmentData.doctorSpeciality,
            feedbackGiven: false,
            review: ""
        };
        var updatedAppointments = appointments;
        if (appointments && appointments.length > 0) {
            updatedAppointments = [...appointments, newAppointment];
        }
        else {
            updatedAppointments = [newAppointment];
        }
        
        setAppointments(updatedAppointments);
       
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
        setShowModal(false);
        setfilteredAppointment( updatedAppointments.filter((appointment) => appointment.doctorName === name))
        window.location.reload()
        
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
                </div>
                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>

            </div>


            <div className="doctor-card-options-container">
                <Popup
                    style={{ backgroundColor: '#FFFFFF' }}
                    trigger={
                        <button className={`book-btn ${filteredAppointment && filteredAppointment.length > 0 ? 'cancel-btn' : 'book-appointment'}`}>
                            {filteredAppointment && filteredAppointment.length > 0 ? (
                                <div>Cancel Appointment</div>
                            ) : (
                                <div>Book Appointment</div>
                            )}
                            <div>No Booking Fee</div>
                        </button>
                    }
                    modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                    {(close) => (
                        <div className="doctorbg" style={{ height: '100vh' }}>
                            <div>
                                <div className="doctor-card-profile-image-container justify-center flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
                                </div>
                                <div className="doctor-card-details">
                                    <div className="doctor-card-detail-name">{name}</div>
                                    <div className="doctor-card-detail-speciality">{speciality}</div>
                                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                                </div>
                            </div>

                            {filteredAppointment && filteredAppointment.length > 0 ? (
                                <>
                                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                                    {filteredAppointment.map((appointment) => (
                                        <div className="m-4 p-4" key={appointment.id}>
                                            <p><span className="font-bold">Name:</span>   {appointment.name}</p>
                                            <p><span className="font-bold">Phone Number:</span>   {appointment.phoneNumber}</p>
                                            <button className="book-btn cancel-btn" onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                            )}
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
};

export default DoctorCard;
