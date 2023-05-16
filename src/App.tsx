import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homePage';
import NavBar from './pages/navbar/navBar';
import LoginPage from './pages/loginpage/login';
import TrackerPage from './pages/trackerpage/trackerPage';
import ProfilePage from './pages/profilepage/profilePage';
import StudyPage from './pages/studypage/studyPage';
import CurrUserDocs from './pages/alluserdocs/allUserDocs';
import Progress from './pages/progresspage/progressPage';
import { Route, Routes } from 'react-router';
import { useState } from 'react';
import SUN from "../src/images/sun.png";
import MOON from "../src/images/moon6.png";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggle = () => {
    if(darkMode){
      setDarkMode(false);
    }else{
      setDarkMode(true);
    }
  }
  return (
    <div className="App">
      <div className={darkMode ? "dark" : "light"}>
      <span id={darkMode ? 'check' : 'check2'} onClick={toggle}>
        {
          darkMode ? (<img alt='' id='sun' src={SUN}></img>) : (<img alt='' id='moon' src={MOON}></img>)
        }
      </span>
        <Routes>
          <Route path="/" element={<NavBar></NavBar>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/progress" element={<Progress></Progress>}></Route>
            <Route path="/tracker" element={<TrackerPage></TrackerPage>}></Route>
            <Route path="/studyDocs" element={<CurrUserDocs></CurrUserDocs>}></Route>
            <Route path="/study/*" element={<StudyPage></StudyPage>}></Route>
            <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
