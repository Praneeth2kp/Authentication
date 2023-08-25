import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup/signup'
import Signin from './components/signin/login';
import Home1 from './components/home/home1';
import Home2 from './components/home/home2';
import Home3 from './components/home/home3';
import Home4  from './components/home/home4';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path="/home1" element={<Home1 />}></Route>
          <Route path="/home2" element={<Home2 />}></Route>
          <Route path="/home3" element={<Home3 />}></Route>
          <Route path="/home4" element={<Home4 />}></Route>
        </Routes>
      </Router>

    </div>
  )
}
export default App