import React from 'react';

const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="searchLabel">Search:</label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />
    </form>
  );
};

export default SearchItem;
