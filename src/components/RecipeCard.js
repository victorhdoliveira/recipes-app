import { number, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard(props) {
  const { index, name, thumb, type, id } = props;

  return (
    <Link
      to={ `/${type}/${id}` }
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
    </Link>
  );
}

RecipeCard.propTypes = {
  index: number.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  thumb: string.isRequired,
};

export default RecipeCard;
