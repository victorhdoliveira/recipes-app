import { number, string } from 'prop-types';
import React from 'react';

function RecipeCard(props) {
  const { index, name, thumb } = props;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <img data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
    </div>
  );
}

RecipeCard.propTypes = {
  index: number.isRequired,
  name: string.isRequired,
  thumb: string.isRequired,
};

export default RecipeCard;
