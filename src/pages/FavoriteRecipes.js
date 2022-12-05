import React, { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';

function FavoriteRecipes() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const temp = favoriteList.filter(({ type }) => (filter === type || filter === 'all'));
    setFilteredList(temp);
  }, [filter, favoriteList]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteList(storageData);
  }, []);

  return (
    <div>
      <h2>FAVORITES</h2>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      {filteredList.map((data, i) => (
        <FavoriteCard
          key={ data.id }
          index={ i }
          data={ data }
          handleClick={ setFavoriteList }
        />))}
    </div>
  );
}

export default FavoriteRecipes;
