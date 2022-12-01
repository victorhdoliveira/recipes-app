import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipeById, fetchRecipes } from '../redux/actions';
import './RecipeDetails.css';

export default function RecipeDetails({ match, location: { pathname } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [recomendedRecipes, setRecomendedRecipes] = useState([]);
  const [embededVideo, setEmbededVideo] = useState(false);
  const dispatch = useDispatch();

  const { params: { id } } = match;
  const type = pathname.split('/')[1];
  const otherType = type === 'meals' ? 'drinks' : 'meals';
  const allRecipes = useSelector((state) => state[otherType].recipes);

  const getAndSaveRecipe = async () => {
    const newRecipe = await dispatch(fetchRecipeById(type, id));
    if (newRecipe) {
      setRecipe(newRecipe);
      setIsLoading(false);
    }
  };

  // Recebe uma palavra e a retorna em maiúsculo no singular
  const capitalize = (word) => word[0].toUpperCase() + word.substring(1, word.length - 1);
  const prefix = `str${capitalize(type)}`;

  useEffect(() => {
    setIsLoading(true);
    getAndSaveRecipe();
  }, [type]);

  useEffect(() => {
    const limit = 6;
    dispatch(fetchRecipes(otherType));
    setRecomendedRecipes(allRecipes.slice(0, limit));
  }, [type, allRecipes]);

  // "Seta" o link do video e a lista de ingredientes usando as
  // informações do objeto salvo no "DidMount"
  useEffect(() => {
    if (Object.keys(recipe).length) {
      const maxIngredientsNumber = 20;
      let embed = 'https://www.youtube.com/embed/';
      const list = [];
      for (let i = 1; i <= maxIngredientsNumber; i += 1) {
        if (recipe[`strIngredient${i}`]) {
          list.push(recipe[`strIngredient${i}`]);
        } else {
          i = maxIngredientsNumber;
        }
      }
      if (type === 'meals') {
        const videoId = recipe.strYoutube.split('=')[1];
        embed += videoId;
        setEmbededVideo(embed);
      }
      setIngredientList(list);
    }
  }, [recipe]);

  if (isLoading) return <h1>Carregando...</h1>;

  return (
    <>
      <div className="detail-container">
        <p data-testid="recipe-title">{recipe[prefix]}</p>
        <img
          src={ recipe[`${prefix}Thumb`] }
          alt={ recipe[prefix] }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-category">
          {recipe.strCategory}
          {(type === 'drinks') && ` - ${recipe.strAlcoholic}`}
        </p>
        <ul>
          {ingredientList.map((ingredient, i) => (
            <li key={ ingredient } data-testid={ `${i}-ingredient-name-and-measure` }>
              <span>{`${ingredient}`}</span>
              {' - '}
              <span>{recipe[`strMeasure${i + 1}`]}</span>
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        { embededVideo && (
          <iframe data-testid="video" title={ recipe[prefix] } src={ embededVideo } />
        )}
        <div className="recomended-carousel">
          {recomendedRecipes.map((rec, i) => (
            <RecipeCard
              key={ i }
              name={ rec[`str${capitalize(otherType)}`] }
              type={ otherType }
              id={ rec[`id${capitalize(otherType)}`] }
              cardTestId="recommendation-card"
              titleTestId="recommendation-title"
              thumb={ rec[`str${capitalize(otherType)}Thumb`] }
              index={ i }
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="recipe-btn"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </>
  );
}

RecipeDetails.propTypes = {
  location: shape({
    pathname: string,
  }).isRequired,
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};
