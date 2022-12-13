import React from 'react';
import './SearchBar.css';

export default function SearchBar() {
  return (
    <form>
      <label htmlFor="search-input">
        <input
          type="text"
          name="query"
          id="query"
          data-testid="search-input"
          className="search-input"
          autoComplete="off"
        />
      </label>
      <div className="radio-search">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="ingredient"
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="name"
            id="name"
            data-testid="name-search-radio"
          />
          Recipe name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name="first-letter"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="search-btn"
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {}.isRequired;
