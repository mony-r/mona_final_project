import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [username, setUsername] = useState(""); // Store username
    const [email, setEmail] = useState(""); // Store email
    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle mobile menu on click
    const handleClick = () => setClick(!click);

    // Handle logout functionality
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");

        // Optionally clear any other local storage items
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }

        // Reset state after logout
        setIsLoggedIn(false);
        setUsername("");
        setEmail('');
        window.location.reload(); // Reload to reset UI
    };

    // Handle dropdown visibility
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // On component mount, check for stored email and set user data
    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            const name = storedEmail.split('@')[0]; // Extract username
            setIsLoggedIn(true);
            setUsername(name);
            setEmail(storedEmail); // Store full email if needed
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{ color: '#2190FF' }} className="fa fa-user-md"></i>
                </Link>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/booking-consultation">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>

                {/* If logged in, show username and logout button */}
                {isLoggedIn ? (
                    <>
                        <li className="link">
                            <button onClick={handleDropdown} className="btn3">
                                {username}
                            </button>
                            {/* Show dropdown if visible */}
                            {showDropdown && (
                                <ul className="username-menu">
                                    <li>
                                        <Link to="/profile" onClick={() => setShowDropdown(false)}>
                                            Your Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/reports" onClick={() => setShowDropdown(false)}>
                                            Your Reports
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="link">
                            <button className="btn2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    // If not logged in, show sign up and login buttons
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
