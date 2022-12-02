import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import IngredientList from './IngredientList';

function DetailBody({ recipe, type }) {
  const [ingredientList, setIngredientList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [embededVideo, setEmbededVideo] = useState(false);

  useEffect(() => {
    if (Object.keys(recipe).length) {
      const maxIngredientsNumber = 20;
      let embed = 'https://www.youtube.com/embed/';
      const ingredients = [];
      const measures = [];
      for (let i = 1; i <= maxIngredientsNumber; i += 1) {
        if (recipe[`strIngredient${i}`]) {
          ingredients.push(recipe[`strIngredient${i}`]);
          measures.push(recipe[`strMeasure${i}`]);
        } else {
          i = maxIngredientsNumber;
        }
      }
      if (type === 'Meal') {
        const videoId = recipe.strYoutube.split('=')[1];
        embed += videoId;
        setEmbededVideo(embed);
      }
      setIngredientList(ingredients);
      setMeasureList(measures);
    }
  }, [recipe]);

  return (
    <div>
      <IngredientList ingredients={ ingredientList } measures={ measureList } />
      <div>
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      { embededVideo && (
        <div>
          <h2>Video</h2>
          <iframe
            data-testid="video"
            title={ recipe[`str${type}`] }
            src={ embededVideo }
          />
        </div>
      )}
    </div>
  );
}

DetailBody.propTypes = {
  recipe: shape({}).isRequired,
  type: string.isRequired,
};

export default DetailBody;
