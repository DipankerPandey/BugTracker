import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BugList from './components/BugList';
import BugForm from './components/BugForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import './BugTracker.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBugs = async () => {
      if (currentUser) {
        try {
          const q = query(collection(db, 'bugs'), where('userId', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          const bugsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBugs(bugsData);
          setFilteredBugs(bugsData);
        } catch (err) {
          console.error("Error fetching bugs:", err);
          setError("Failed to fetch bugs. Please check your connection and try again.");
        }
      } else {
        setBugs([]);
        setFilteredBugs([]);
      }
    };

    fetchBugs();
  }, [currentUser]);


  if (!currentUser) {
    return <AuthPage setCurrentUser={setCurrentUser} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="app-content">
        <BugForm currentUser={currentUser} setBugs={setBugs} />
        <div className="search-filter-container">
          <SearchBar bugs={bugs} setFilteredBugs={setFilteredBugs} />
          <FilterBar bugs={bugs} setFilteredBugs={setFilteredBugs} />
        </div>
        <BugList bugs={filteredBugs} setBugs={setBugs} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default App;