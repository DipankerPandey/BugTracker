import React from 'react';
import { getAuth, signOut } from "firebase/auth";

function Navbar({ currentUser, setCurrentUser }) {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="navbar">
      <h1>Bug Tracker</h1>
      <div className="user-info">
        <span>Welcome, {currentUser.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;