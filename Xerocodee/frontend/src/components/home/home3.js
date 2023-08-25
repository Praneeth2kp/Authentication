import React, { useState } from 'react';
import './home.css';
import logo from '../assets/logo 5.svg';
import { searchRepositories } from '../search/search.js'
import { useNavigate  } from 'react-router-dom';

function Home3() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [repoName, setRepoName] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
    
        try {
            const repositories = await searchRepositories(repoName);
    
            navigate('/home4', { state: { repositories } });
        } catch (error) {
            console.error('Error searching repositories:', error);
        }
    };
    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="container">
            <div className="screen-box">
                <img className="logo1" src={logo} alt="Logo"></img>
                <h1 className="hh1">Welcome Arya Soni !</h1>
                <p className="pp1">Choose from the following Deployment options</p>
                <div className="btn-box-11">
                    <button
                        className="btn-11"
                        style={{
                            backgroundColor: selectedOption === 'AWSCloud' ? '#1F64FF' : 'initial',
                            color: selectedOption === 'AWSCloud' ? "white" : 'initial'
                        }}
                    >
                        AWS Cloud
                    </button>
                    <button
                        className="btn-11"
                        onClick={() => handleButtonClick('Github')}
                        style={{
                            backgroundColor: selectedOption === 'Github' ? '#1F64FF' : 'initial',
                            color: selectedOption === 'Github' ? "white" : 'initial'
                        }}
                    >
                        Github
                    </button>
                </div>
                {selectedOption === 'Github' && (
                    <form onSubmit={handleSearch}>
                        <div className="btn-box-1">
                            <input
                                type="text"
                                placeholder="Enter repository name"
                                value={repoName}
                                onChange={(e) => setRepoName(e.target.value)}
                                required
                            />
                            <button className="sub-btn" type="submit">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
export default Home3;
