import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { Navigate } from 'react-router-dom';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setRedirectToHome(true); // Redirect after successful Google signup
        } catch (error) {
            alert("Google Signup Failed: " + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createUserWithEmailAndPassword(auth, username, password);
            alert('Signup Successful');
            setRedirectToHome(true); // Redirect after successful signup
        } catch (error) {
            alert('Signup Failed: ' + error.message); // Show error message
        }
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    return (
        <div className="form-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <center><button type="submit">Signup</button></center>
            </form>
            <br />
            <button className="google-button" onClick={handleGoogleSignup}>
                Sign up with Google
            </button>
        </div>
    );
};

export default Signup;


