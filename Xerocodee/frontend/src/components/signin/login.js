import React, { useState } from "react";
import "./signin.css"
import axios from 'axios';
import logo from '../assets/logo 5.svg';
import img1 from "../assets/image 1.svg"
import img2 from "../assets/image 2.svg"
import img3 from "../assets/image 6.svg"
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const handleGitHubSignUp = () => {
        window.location.href = 'https://praneeth-task.onrender.com/api/auth/github';
    };
    const handleGoogleSignUp = () => {
        window.location.href = 'https://praneeth-task.onrender.com/auth/google/callback';
    }

    const [loginStatus, setLoginStatus] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://praneeth-task.onrender.com/api/login', formData);
            if (response.data.success) {
                setLoginStatus("Login successful!");
                navigate('/home1', { state: { fname: formData.fname } });
            } else {
                setLoginStatus("Incorrect username or password");
            }
            setShowPopup(true);
        } catch (error) {
            console.error('Error during login:', error);
            setLoginStatus("Email or password wrong");
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <div className="box-11">
                <div className="box-2">
                    <div className="inner-box-1">
                        <img className='logo' src={logo} alt="logo"></img>
                        <div className="boxs">
                            <h1 className="hello">Hello!</h1>
                            <p className="p1">Login to your Account</p>
                            <input
                                type='email'
                                onChange={handleChange}
                                placeholder="Email-id"
                                required
                            />
                            <br />
                            <input type="password"
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            /><br />
                            <button type="submit" onClick={handleSubmit} className="signup-btn">LOGIN</button>
                            {showPopup && (
                                <div className="popup">
                                    <p>{loginStatus}</p>
                                </div>
                            )}
                            <p className="p2">or</p>
                            <div className="boxs-1">
                                <button onClick={handleGoogleSignUp} className="link-1">
                                    <p className="p3">Sign In With Google</p>
                                    <img className="img-2" src={img1} alt="Google Logo" />
                                </button>
                                <button onClick={handleGitHubSignUp} className="link-1">
                                    <p className="p3">Sign In With Github</p>
                                    <img className="img-2" src={img2} alt="Github Logo" />
                                </button>
                            </div>
                            <p className="p4">Don't have an Account ?<Link to='/' className="link-2"> SIGN UP</Link></p>
                        </div>
                    </div>
                    <div className="inner-box-2">
                        <img className="img3" src={img3} alt="img3"></img>
                        <svg className="svg-2" xmlns="http://www.w3.org/2000/svg" width="411" height="143" viewBox="0 0 538 144" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 144L22.4167 125.913C44.8333 107.826 89.6667 71.6522 134.5 66.087C179.333 59.8261 224.167 84.1739 269 96C313.833 107.826 358.667 107.826 403.5 89.7391C448.333 71.6522 493.167 36.1739 515.583 18.087L538 0V144H515.583C493.167 144 448.333 144 403.5 144C358.667 144 313.833 144 269 144C224.167 144 179.333 144 134.5 144C89.6667 144 44.8333 144 22.4167 144H0Z" fill="#1F64FF" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
