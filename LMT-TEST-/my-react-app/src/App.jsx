import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Student Profile Dashboard</h1>
      <div className="cards">
        <div className="card">
          <img src="https://i.pravatar.cc/100?img=3" alt="Student 1" />
          <h2>Aarav Sharma</h2>
          <p><b>Course:</b> B.Tech CSE</p>
          <p><b>Year:</b> 3rd Year</p>
          <p><b>CGPA:</b> 9.2</p>
        </div>
        <div className="card">
          <img src="https://i.pravatar.cc/100?img=5" alt="Student 2" />
          <h2>Priya Verma</h2>
          <p><b>Course:</b> B.Tech ECE</p>
          <p><b>Year:</b> 2nd Year</p>
          <p><b>CGPA:</b> 8.7</p>
        </div>
      </div>
    </div>
  );
}

export default App;


