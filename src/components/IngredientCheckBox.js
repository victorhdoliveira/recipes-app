import React from 'react';

export default function IngredientCheckbox({ index }) {
  return (
    <label htmlFor="ingredient-step" data-testid={ `${index}-ingredient-step>` }>
      <input type="checkbox" name="ingredient-step" />
    </label>
  );
}

IngredientCheckbox.propTypes = {}.isRequired;
