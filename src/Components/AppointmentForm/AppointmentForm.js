import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    const availableSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
        setTime(slot); // Automatically set time when a slot is selected
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!date || !time) {
            alert('Please select both date and time for your appointment.');
            return;
        }

        onSubmit({ name, phoneNumber, date, time, doctorName, doctorSpeciality });
        setName('');
        setPhoneNumber('');
        setDate('');
        setTime('');
        setSelectedSlot(null);
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appointment-form-inputs"
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="appointment-form-inputs"
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="appointment-form-inputs"
                />
            </div>
            <div className="form-group">
                <label htmlFor="time">Time Slot:</label>
                <select
                    id="time"
                    value={time}
                    onChange={(e) => handleSlotSelection(e.target.value)}
                    required
                    className="appointment-form-inputs"

                >
                    <option value="">Select a time slot</option>
                    {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>
            <button className='book-btn book-appointment' type="submit">Book Now</button>
        </form>
    );
};

export default AppointmentForm;
