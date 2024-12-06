import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
// import DoctorCardIC from './DoctorCardIC/DoctorCardIC';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';
const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                if (searchParams.get('speciality')) {
                    const speciality = searchParams.get('speciality').toLowerCase();
                    const filtered = data.filter(doctor => doctor.speciality && doctor.speciality.toLowerCase() === speciality);
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                    window.reload(); // Avoid reloading the page here if not necessary
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
                setDoctors(data);
            })
            .catch(err => console.log(err));
    }

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const searchLowerCase = searchText.toLowerCase();
            const filtered = doctors.filter((doctor) => {
                // Add null check for doctor.speciality
                return doctor.speciality && doctor.speciality.toLowerCase().includes(searchLowerCase);
            });

            setFilteredDoctors(filtered);
            setIsSearched(true);
            window.location.reload(); // Avoid reloading the page here if not necessary
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        getDoctorsDetails();
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
    }, [searchParams])

    return (
        <center>
            <div className="main-content">
                <div className="searchpage-container">
                    <FindDoctorSearch onSearch={handleSearch} />
                    <div className="search-results-container">
                        {isSearched ? (
                            <center>
                                <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                                <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                                {filteredDoctors.length > 0 ? (
                                    filteredDoctors.map(doctor => <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />)
                                ) : (
                                    <p>No doctors found.</p>
                                )}
                            </center>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </center>
    )
}

export default BookingConsultation