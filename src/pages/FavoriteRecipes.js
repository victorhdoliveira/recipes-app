import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes({ location }) {
  return (
    <Header
      renderProfileIcon
      renderSearchIcon={ false }
      location={ location }
    />
  );
}

FavoriteRecipes.propTypes = {}.isRequired;
