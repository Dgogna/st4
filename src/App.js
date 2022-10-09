import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/profile";
import AddNote from "./components/AddNote";

function App() {
  return (
    <div >
    <NoteState>
        <Router>
            <Navbar></Navbar>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/addNote" element={<AddNote />} />
                </Routes>
            </div>
            
            
        </Router>
    </NoteState>
    </div>
    
  );
}

export default App;
