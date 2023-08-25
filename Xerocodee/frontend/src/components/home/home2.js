import React, { useState } from "react";
import "./home.css";
import logo from '../assets/logo 5.svg';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Home2() {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const developername = location.state ? location.state.developername : "";
    const organizationname = location.state ? location.state.organizationname : "";
    const companyname = location.state ? location.state.companyname : "";

    const handleButtonClick = async (option) => {
        console.log("Selected Option:", option);
        navigate("/home3");
        setSelectedOption(option);

        try {
            const response = await axios.post("http://localhost:5000/api/option", {
                selectedOption: option,
            });
            console.log("Response from backend:", response.data);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="container">
            <div className="screen-box">
                <img className="logo1" src={logo} alt="Logo" />
                <h1 className="hh1">Welcome {developername || organizationname || companyname}!</h1>

                <p className="pp1">Choose from the following Deployment options</p>
                <div className="btn-box-11">
                    <button
                        className="btn-11"
                        name="selectedOption"
                        onClick={() => handleButtonClick("Self Hosting")}
                        style={{
                            backgroundColor:
                                selectedOption === "Self Hosting" ? "#1F64FF" : "initial",
                        }}
                    >
                        Self Hosting
                    </button>
                    <button
                        className="btn-11"
                        name="selectedOption"
                        onClick={() => handleButtonClick("XeroCodee Hosting")}
                        style={{
                            backgroundColor:
                                selectedOption === "XeroCodee Hosting" ? "#1F64FF" : "initial",
                        }}
                    >
                        XeroCodee Hosting
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home2;