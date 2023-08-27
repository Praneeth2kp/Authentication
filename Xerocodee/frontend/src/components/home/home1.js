import React, { useState } from "react";
import "./home.css"
import axios from "axios"
import logo from '../assets/logo 5.svg';
import { useNavigate, useLocation } from "react-router-dom";


function Home1() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    developername: "",
    organisationname: '',
    companyname: '',
  });

  const location = useLocation();
  const userName = location.state ? location.state.developername : "";

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let endpoint = "";
      if (selectedOption === "Developer") {
        endpoint = "api/developer";
      } else if (selectedOption === "Organisation") {
        endpoint = "api/organisation";
      } else if (selectedOption === "Company") {
        endpoint = "api/company";
      }

      const response = await axios.post(`https://praneeth-task.onrender.com/${endpoint}`, formData);
      setMessage(`${selectedOption} data saved successfully!!`);
      console.log('Response from backend:', response.data);
      setFormData({
        developername: '',
        organizationname: '',
        companyname: '',
      });

      navigate('/home2', { state: { developername: formData.developername, organisationname: formData.organisationname, companyname: formData.companyname } });
    } catch (error) {
      setMessage(`An error occurred while saving ${selectedOption} data`);
      console.error('Error sending data:', error);
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
    <div className="container">
      <div className="screen-box">
        <img className="logo1" src={logo} alt="logo"></img>
        <h1 className="hh1">Welcome {userName}!</h1>
        <p className="pp1">Choose from the following</p>
        <div className="btn-box">
          <button
            className="btn-11"
            name="developername"
            onClick={() => handleButtonClick("Developer")}
            style={{
              backgroundColor:
                selectedOption === "Developer" ? "#1F64FF" : "initial",
              color:
                selectedOption === "Developer" ? "white" : "initial"
            }}
          >
            Developer
          </button>
          <button
            className="btn-11"
            name="organisationname"
            onClick={() => handleButtonClick("Organisation")}
            style={{
              backgroundColor:
                selectedOption === "Organisation" ? "#1F64FF" : "initial",
              color:
                selectedOption === "Organisation" ? "white" : "initial"
            }}
          >
            Organisation
          </button>
          <button
            className="btn-11"
            name="companyname"
            onClick={() => handleButtonClick("Company")}
            style={{
              backgroundColor:
                selectedOption === "Company" ? "#1F64FF" : "initial",
              color:
                selectedOption === "Company" ? "white" : "initial"
            }}
          >
            Company
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {selectedOption === "Developer" && (
            <div className="btn-box-1">
              <input
                placeholder="Developer Name"
                onChange={handleChange}
                required
              />
              <button type="submit" className="sub-btn">SUBMIT</button>
            </div>
          )}
        </form>
        <div className="message">{message}</div>
        <form onSubmit={handleSubmit}>
          {selectedOption === "Organisation" && (
            <div className="btn-box-1">
              <input
                placeholder="Organization Name"
                onChange={handleChange}
                required
              />
              <button type="submit" className="sub-btn">SUBMIT</button>
            </div>
          )}
        </form>
        <form onSubmit={handleSubmit}>
          {selectedOption === "Company" && (
            <div className="btn-box-1">
              <input
                placeholder="Company Name"
                onChange={handleChange}
                required
              />
              <button type="submit" className="sub-btn">SUBMIT</button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Home1;
