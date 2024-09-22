import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { Navigate } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleGoogleLogin = async () => {
        const auth = getAuth();
        const googleProvider = new GoogleAuthProvider();
    
        try {
            await signInWithPopup(auth, googleProvider);
            alert("Google Login Successful");
            setRedirectToHome(true); 
        } catch (error) {
            alert("Google Login Failed: " + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, username, password);
            setRedirectToHome(true);  
        } catch (err) {
            alert('Login Failed: ' + err.message);
        }
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
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
                <center><button type="submit">Login</button></center>
            </form>
            <br />
            <button className="google-button" onClick={handleGoogleLogin}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;

