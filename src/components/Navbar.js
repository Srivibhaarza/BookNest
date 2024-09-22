import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("User signed out");
            })
            .catch((error) => {
                console.error("Error during sign out:", error);
            });
    };

    return (
        <nav>
            <h1>Book Nest</h1>
            <Link to="/">Home</Link>
            
            {user ? (
                <>
                    <Link to="/upload">Upload Book</Link>
                    {/* Display the first letter of the user's email */}
                    <span className="user-initial">{user.email.charAt(0).toUpperCase()}</span>

                    {/* <span>{user.email.charAt(0).toUpperCase()}</span> */}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;

