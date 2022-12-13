import { arrayOf, bool, string } from 'prop-types';
import React, { useState } from 'react';
import './IngredientList.css';

export default function IngredientList({ ingredients, measures, inProgress }) {
  const [ingredientList, setIngredientList] = useState([]);

  const handleChange = ({ target }) => {
    const tempList = [...ingredientList];
    const notRepeated = -1;
    const isRepeated = tempList.findIndex((ingredient) => (ingredient === target.value));

    if (isRepeated === notRepeated) {
      tempList.push(target.value);
    } else {
      tempList.splice(isRepeated, 1);
    }
    setIngredientList(tempList);
  };

  const isChecked = (ingredient) => {
    const getIngredient = ingredientList.find((value) => (value === ingredient));
    return (getIngredient) ? 'checked' : '';
  };

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            {inProgress ? (
              <label
                htmlFor={ `${i}-ingredient-step>` }
                data-testid={ `${i}-ingredient-step>` }
                className={ isChecked(ingredient) }
              >
                <input
                  type="checkbox"
                  name="ingredient-step"
                  value={ ingredient }
                  id={ `${i}-ingredient-step>` }
                  onChange={ (event) => handleChange(event) }
                />
                <span>{`${ingredient}`}</span>
                {' - '}
                <span>{measures[i]}</span>
              </label>
            ) : (
              <>
                <span>{`${ingredient}`}</span>
                {' - '}
                <span>{measures[i]}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientList.propTypes = {
  ingredients: arrayOf(string).isRequired,
  measures: arrayOf(string).isRequired,
  inProgress: bool,
};

IngredientList.defaultProps = {
  inProgress: false,
};
