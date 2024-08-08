import React, { useState } from 'react';

function SearchBar({ bugs, setFilteredBugs }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = bugs.filter(bug => 
      bug.name.toLowerCase().includes(term) || 
      bug.description.toLowerCase().includes(term)
    );
    setFilteredBugs(filtered);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search bugs..." 
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;