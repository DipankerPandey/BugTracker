import React from 'react';

function FilterBar({ bugs, setFilteredBugs }) {
  const handlePriorityFilter = (priority) => {
    const filtered = bugs.filter(bug => bug.priority === priority);
    setFilteredBugs(filtered);
  };

  const handleCategoryFilter = (category) => {
    const filtered = bugs.filter(bug => bug.category === category);
    setFilteredBugs(filtered);
  };

  return (
    <div className="filter-bar">
      <select onChange={e => handlePriorityFilter(e.target.value)}>
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select onChange={e => handleCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        {/* Dynamically generate category options based on unique categories in bugs */}
        {[...new Set(bugs.map(bug => bug.category))].map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;