import React from 'react';
import BugItem from './BugItem';

function BugList({ bugs, setBugs, currentUser }) {
  return (
    <div className="bug-list">
      {bugs.map(bug => (
        <BugItem key={bug.id} bug={bug} setBugs={setBugs} currentUser={currentUser} />
      ))}
    </div>
  );
}

export default BugList;