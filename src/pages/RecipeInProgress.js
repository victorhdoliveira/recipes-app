import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { cocktailDetails, mealDetails } from '../components/services/dataFetchApi';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);

  const infoItem = async () => {
    const { pathname } = history.location;
    let recipeInfo = recipe;
    if (pathname.includes('/meals')) {
      const getMeal = await mealDetails(id);
      recipeInfo = getMeal;
    } else if (pathname.includes('/drinks')) {
      const getDrink = await cocktailDetails(id);
      recipeInfo = getDrink;
    }
    setRecipe(recipeInfo);
  };

  useEffect(() => {
    infoItem();
  }, []);

  const defineRecipe = () => {
    let recipeInfo = {
      recipeTitle: '',
      recipeImage: '',
      recipeIngredients: [],
      recipeMeasures: [],
      recipeCategory: '',
      recipeVideo: '',
      checkboxesObj: {},
    };

    const listIngredient = [];
    const listMeasures = [];
    Object.entries(recipe[0]).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== null && value.length > 0) {
        listIngredient.push(value);
      }

      if (key.includes('strMeasure') && value !== null && value.length > 0) {
        listMeasures.push(value);
      }
    });

    if (recipe[0].strMeal) {
      recipeInfo = {
        recipeTitle: recipe[0].strMeal,
        recipeImage: recipe[0].strMealThumb,
        recipeIngredients: listIngredient,
        recipeMeasures: listMeasures,
        recipeCategory: recipe[0].strCategory,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
      };
    } else if (recipe[0].strDrink) {
      recipeInfo = {
        recipeTitle: recipe[0].strDrink,
        recipeImage: recipe[0].strDrinkThumb,
        recipeIngredients: listIngredient,
        recipeMeasures: listMeasures,
        recipeCategory: `${recipe[0].strAlcoholic} ${recipe[0].strCategory}`,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
      };
    }

    return recipeInfo;
  };

  return (
    <div>
      {recipe.length > 0
        && (
          <>
            <h1 data-testid="recipe-title">
              {`Recipe: ${defineRecipe().recipeTitle}`}
            </h1>
            <img
              data-testid="recipe-photo"
              src={ defineRecipe().recipeImage }
              alt={ defineRecipe().recipeTitle }
              width="300"
            />
            <h2 data-testid="recipe-category">
              { `Category: ${defineRecipe().recipeCategory}`}
            </h2>

            <p data-testid="instructions">
              { `Instructions: ${defineRecipe().recipeInstructions}`}
            </p>
            <iframe
              data-testid="video"
              src={ defineRecipe().recipeVideo }
              title={ defineRecipe().recipeTitle }
            />

            <div id="inProgress">
              <button
                data-testid="finish-recipe-btn"
                type="button"
              >
                Terminar Receita
              </button>
              <button
                data-testid="share-btn"
                type="button"
              >
                Compartilhar
              </button>

              <button
                data-testid="favorite-btn"
                type="button"
              >
                Favoritar
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default RecipeInProgress;
