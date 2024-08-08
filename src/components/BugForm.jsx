import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

function BugForm({ currentUser, setBugs }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to add a bug.");
      return;
    }

    const newBug = {
      name,
      description,
      priority,
      category,
      date: new Date().toISOString(),
      userId: currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, 'bugs'), newBug);
      setBugs((prevBugs) => [...prevBugs, { id: docRef.id, ...newBug }]);
      
      // Reset form
      setName('');
      setDescription('');
      setPriority('low');
      setCategory('');
    } catch (error) {
      console.error("Error adding bug: ", error);
      alert("An error occurred while adding the bug. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Bug Name" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <button type="submit">Add Bug</button>
    </form>
  );
}

export default BugForm;