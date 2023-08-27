import React, { useState } from "react";
import "./signup.css";
import logo from '../assets/logo 5.svg';
import img1 from "../assets/image 1.svg";
import img2 from "../assets/image 2.svg";
import img3 from "../assets/image 6.svg"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://praneeth-task.onrender.com/api/signup', formData);
      setMessage('User registered successfully!!');
      console.log('Response from backend:', response.data);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/home1', { state: { email: formData.email } });
    } catch (error) {
      alert("User Present")
    }
  };

  const handleGitHubSignUp = () => {
    window.location.href = 'https://praneeth-task.onrender.com/api/auth/github';
  };
  const handleGoogleSignUp = () => {
    window.location.href = 'https://praneeth-task.onrender.com/auth/google/callback';
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="box-1">
        <div className="box-2">
          <div className="inner-box-1">
            <img className='logo' src={logo} alt="logo"></img>
            <div className="boxs">
              <h1 className="hello">Hello!</h1>
              <p className="p1">Create your Account</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                /><br />
                <input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  placeholder="Last Name"
                  required /><br />
                <input
                  type='email'
                  name="email"
                  onChange={handleChange}
                  placeholder="Email-id"
                  required /><br />
                <input type="password"
                name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required /><br />
                <input type="password"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required /><br />
                <button type="submit" className="signup-btn">SIGN UP</button>
              </form>
              <div className="message">{message}</div>
              <p className="p2">or</p>
              <div className="boxs-1">
                <button onClick={handleGoogleSignUp} className="link-1">
                  <p className="p3"> SignUp With Google</p>
                  <img className="img-2" src={img1} alt="Google Logo" />
                </button>
                <button onClick={handleGitHubSignUp} className="link-1">
                  <p className="p3"> SignUp With Github</p>
                  <img className="img-2" src={img2} alt="Github Logo" />
                </button>
              </div>
            </div>
            <p className="p4">Already have an Account ?<Link to='/signin' className="link-2"> LOGIN</Link></p>


          </div>
          <div className="inner-box-2">
            <img className="img3" src={img3} alt="logo"></img>
            <svg className="svg-1" xmlns="http://www.w3.org/2000/svg" width="411" height="143" viewBox="0 0 538 144" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 144L22.4167 125.913C44.8333 107.826 89.6667 71.6522 134.5 66.087C179.333 59.8261 224.167 84.1739 269 96C313.833 107.826 358.667 107.826 403.5 89.7391C448.333 71.6522 493.167 36.1739 515.583 18.087L538 0V144H515.583C493.167 144 448.333 144 403.5 144C358.667 144 313.833 144 269 144C224.167 144 179.333 144 134.5 144C89.6667 144 44.8333 144 22.4167 144H0Z" fill="#1F64FF" />
            </svg>

          </div>


        </div>

      </div>
    </div>

  );
};

export default Signup;
