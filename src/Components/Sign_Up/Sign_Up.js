import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };


    return (
        <div className="main-content">
            <div className="sigup-container flex justify-center">
                <div className="w-[30rem] shadow-lg p-10 m-4 rounded-lg">
                    <div className="signup-form ">
                        <div className="mb-10">
                            <div className="font-bold text-2xl mb-3 text-center">
                                SIGN UP
                            </div>
                            <div className="font-light text-md  text-center">
                                <span>already a member?</span>
                                <span> </span>
                                <span>
                                    <Link to="/signup" style={{ color: '#2190FF' }}>
                                        LOGIN
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <form method="POST" onSubmit={register}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                                {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input required value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input required value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />

                            </div>
                            <button type="submit" className="btn signup-btn mb-2 mr-1 waves-effect waves-light">
                                SignUp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;