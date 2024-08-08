import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

function BugItem({ bug, setBugs, currentUser, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBug, setEditedBug] = useState({ ...bug });

  const handleSolved = async () => {
    if (bug.userId !== currentUser.uid) {
      alert("You can only mark your own bugs as solved.");
      return;
    }

    try {
      await deleteDoc(doc(db, 'bugs', bug.id));
      setBugs(prevBugs => prevBugs.filter(b => b.id !== bug.id));
    } catch (error) {
      console.error("Error marking bug as solved: ", error);
      alert("An error occurred while marking the bug as solved. Please try again.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'bugs', bug.id), editedBug);
      setBugs(prevBugs => prevBugs.map(b => b.id === bug.id ? editedBug : b));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating bug: ", error);
      alert("An error occurred while updating the bug. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBug(prev => ({ ...prev, [name]: value }));
  };

  if (isEditing) {
    return (
      <div className="bug-item">
        <input
          type="text"
          name="name"
          value={editedBug.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={editedBug.description}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={editedBug.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          name="category"
          value={editedBug.category}
          onChange={handleChange}
        />
        <div className="bug-item-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bug-item">
      <h3>{bug.name}</h3>
      <p>{bug.description}</p>
      <p className={`priority priority-${bug.priority}`}>Priority: {bug.priority}</p>
      <p>Category: {bug.category}</p>
      <p>Date: {new Date(bug.date).toLocaleDateString()}</p>
      <div className="bug-item-buttons">
        <button className="edit-button" onClick={handleEdit}>Edit</button>
        <button className="solved-button" onClick={handleSolved}>Solved</button>
      </div>
    </div>
  );
}

export default BugItem;