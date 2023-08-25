import "./home.css"
import logo from '../assets/logo 5.svg';
import { useLocation } from "react-router-dom";

function Home4() {
    const location = useLocation();
    const repositories = location.state ? location.state.repositories : [];

    return (
        <div className="container">
            <div className="screen-box">
                <img className="logo1" src={logo} alt="logo"></img>
                <h1 className="hh1">Welcome !</h1>
                <p className="pp1">Github Repository List</p>
                <div className="box-100">
                    {repositories.map((repo) => (
                        <p className="p100" key={repo.name}>
                            <a href={`https://github.com/${repo.owner}/${repo.name}`}>
                                {repo.name}
                            </a>
                            ({repo.owner})
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home4;
