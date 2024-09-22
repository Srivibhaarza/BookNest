import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth , onAuthStateChanged} from "firebase/auth";
//import {getDatabase, res, set} from 'firebase/database';
import {app} from "./firebase";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import UploadBook from './components/UploadBook';
import Signup from './components/Signup';
import './App.css';

const auth = getAuth(app);
//const db=getDatabase(app);

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/upload" element={<UploadBook />} />
            </Routes>
            <footer>
                <p>&copy; 2024 Book Store. All rights reserved.</p>
            </footer>
        </Router>
    );
};

export default App;
