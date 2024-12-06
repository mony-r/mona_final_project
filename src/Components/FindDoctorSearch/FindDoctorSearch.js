import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
    const [searchParams] = useSearchParams();
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState(searchParams.get('speciality') || ''); // Default to empty string if no speciality
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    // Filter specialities based on the search input, but ensure searchDoctor is not null or undefined
    const filteredSpecialities = specialities.filter(speciality =>
        searchDoctor && speciality.toLowerCase().includes(searchDoctor.toLowerCase())
    );

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/booking-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    return (
        <div className='main-content'>
            <div className='finddoctor'>
                <center>
                    <h1>Find a doctor and Consult instantly</h1>
                    <div>
                        <i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i>
                    </div>
                    <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="doctor-search-box">
                            <input
                                type="text"
                                className="search-doctor-input-box"
                                placeholder="Search doctors, clinics, hospitals, etc."
                                onFocus={() => setDoctorResultHidden(false)}
                                onBlur={() => setDoctorResultHidden(true)}
                                value={searchDoctor}
                                onChange={(e) => setSearchDoctor(e.target.value)} // Update searchDoctor state on change
                            />
                            <div className="findiconimg">
                                <div className='findiconimgpos'>
                                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                                </div>
                            </div>
                            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                                {filteredSpecialities.map(speciality => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        onMouseDown={() => handleDoctorSelect(speciality)}
                                    >
                                        <span>
                                            <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: "10px", width: "10px" }} width="12" />
                                        </span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    );
};

export default FindDoctorSearch;
