import { arrayOf, string } from 'prop-types';
import React from 'react';

export default function IngredientList({ ingredients, measures }) {
  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            <span>{`${ingredient}`}</span>
            {' - '}
            <span>{measures[i]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientList.propTypes = {
  ingredients: arrayOf(string).isRequired,
  measures: arrayOf(string).isRequired,
};
