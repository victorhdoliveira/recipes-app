import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import shareSvg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import './DetailHeader.css';

const copy = require('clipboard-copy');

function DetailHeader({ recipe, type, path }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const bool = !!favorites.find((favorite) => favorite.id === recipe[`id${type}`]);
    setIsFavorite(bool);
  };

  const handleCopy = () => {
    copy(`http://localhost:3000${path}`);
    setIsCopied(true);
    const seconds = 2000;
    setTimeout(() => setIsCopied(false), seconds);
  };

  const handleFavorite = () => {
    const favorite = {
      id: recipe[`id${type}`],
      type: type.toLowerCase(),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${type}`],
      image: recipe[`str${type}Thumb`],
    };

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    let favoriteIndex;
    const isNotFavorite = !favorites.find((fav, i) => {
      favoriteIndex = i;
      return fav.id === recipe[`id${type}`];
    });

    if (isNotFavorite) {
      favorites.push(favorite);
    } else {
      favorites.splice(favoriteIndex, 1);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setIsFavorite(isNotFavorite);
  };

  useEffect(() => {
    getFavorite();
  }, [type]);

  return (
    <header className="detail-header">
      <div className="multimedia">
        <p data-testid="recipe-category">
          {(type === 'Drink') && `${recipe.strAlcoholic} `}
          {recipe.strCategory}
        </p>
        <div>
          <button type="button" data-testid="share-btn" onClick={ handleCopy }>
            <img src={ shareSvg } alt="compartilhar" />
          </button>
          <button type="button" onClick={ handleFavorite }>
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeart : whiteHeart }
              alt="favoritar"
            />
          </button>
          {isCopied && <p className="copy-toast">Link copied!</p>}
        </div>
      </div>
      <img
        src={ recipe[`str${type}Thumb`] }
        alt={ recipe[`str${type}`] }
        data-testid="recipe-photo"
        className="header-image"
      />
      <p className="header-title" data-testid="recipe-title">{recipe[`str${type}`]}</p>
    </header>
  );
}

DetailHeader.propTypes = {
  recipe: shape({}).isRequired,
  type: string.isRequired,
  path: string.isRequired,
};

export default DetailHeader;
