import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import RecipeCard from './RecipeCard';
import './RecomendedCarousel.css';

export default function RecomendedCarousel({ recipeList, type }) {
  return (
    <div>
      <h2>Recommended</h2>
      <div className="recomended-carousel">
        {recipeList.map((rec, i) => (
          <RecipeCard
            key={ i }
            name={ rec[`str${type}`] }
            type={ `${type.toLowerCase()}s` }
            id={ rec[`id${type}`] }
            cardTestId="recommendation-card"
            titleTestId="recommendation-title"
            thumb={ rec[`str${type}Thumb`] }
            index={ i }
          />
        ))}
      </div>
    </div>

  );
}

RecomendedCarousel.propTypes = {
  recipeList: arrayOf(shape({})).isRequired,
  type: string.isRequired,
};
