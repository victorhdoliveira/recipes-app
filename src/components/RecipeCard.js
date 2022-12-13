import { number, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard(props) {
  const { index, name, thumb, type, id, cardTestId, titleTestId } = props;

  return (
    <Link
      to={ `/${type}/${id}` }
      data-testid={ `${index}-${cardTestId}` }
      className="recipe-card"
    >
      <p data-testid={ `${index}-${titleTestId}` }>{name}</p>
      <img
        className="image-card"
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
      />
    </Link>
  );
}

RecipeCard.propTypes = {
  index: number.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  thumb: string.isRequired,
  cardTestId: string,
  titleTestId: string,
};

RecipeCard.defaultProps = {
  cardTestId: 'recipe-card',
  titleTestId: 'card-name',
};

export default RecipeCard;
