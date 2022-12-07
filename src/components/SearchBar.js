import React from 'react';

export default function SearchBar() {
  return (
    <label htmlFor="search-input">
      <input
        type="text"
        name=""
        id=""
        data-testid="search-input"
      />
    </label>
  );
}

SearchBar.propTypes = {}.isRequired;
