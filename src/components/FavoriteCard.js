import { func, number, shape, string } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import shareSvg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import './FavoriteCard.css';

const copy = require('clipboard-copy');

function FavoriteCard({ data, index, handleClick }) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const { alcoholicOrNot, category, id, image, name, nationality, type } = data;

  const handleCopy = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
    const seconds = 2000;
    setTimeout(() => setIsCopied(false), seconds);
  };

  const handleFavorite = () => {
    const favorite = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    let favoriteIndex;
    const isNotFavorite = !favorites.find((fav, i) => {
      favoriteIndex = i;
      return fav.id === id;
    });

    if (isNotFavorite) {
      favorites.push(favorite);
    } else {
      favorites.splice(favoriteIndex, 1);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setIsFavorite(isNotFavorite);
    handleClick(favorites);
  };

  return (
    <div className="favorite-card">
      <Link to={ `/${type}s/${id}` } className="favorite-card-left">
        <img
          data-testid={ `${index}-horizontal-image` }
          className="favorite-card-image"
          alt={ `${name} example` }
          src={ image }
        />
      </Link>
      <div className="favorite-card-right">
        <div>
          <Link
            to={ `/${type}s/${id}` }
            data-testid={ `${index}-horizontal-name` }
            className="recipe-name"
          >
            { name }
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` } className="recipe-data">
            {nationality || alcoholicOrNot}
            {' - '}
            {category}
          </p>
        </div>
        <div>
          <button type="button" onClick={ handleCopy } className="btns">
            <img
              src={ shareSvg }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="compartilhar"
            />
          </button>
          <button type="button" onClick={ handleFavorite } className="btns">
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ isFavorite ? blackHeart : whiteHeart }
              alt="favoritar"
            />
          </button>
          {isCopied && <p className="copy-toast">Link copied!</p>}
        </div>
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  handleClick: func.isRequired,
  index: number.isRequired,
  data: shape({
    alcoholicOrNot: string,
    category: string,
    id: string,
    image: string,
    name: string,
    nationality: string,
    type: string,
  }).isRequired,
};

export default FavoriteCard;
