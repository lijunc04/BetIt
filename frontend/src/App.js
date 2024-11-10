import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import VerifyPopup from './pages/VerifyPopUp';
import Leaderboards from './pages/Leaderboards';
//import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/verify' element = {<VerifyPopup taskName="wear glasses"/>}/>
        <Route path='/leaderboards' element = {<Leaderboards/>}/> 
        {/*<Route path="/profile" element={<Profile />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
