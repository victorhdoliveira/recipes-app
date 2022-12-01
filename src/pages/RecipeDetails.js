import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipeById } from '../redux/actions';

export default function RecipeDetails({ match, location: { pathname } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [embededVideo, setEmbededVideo] = useState(false);

  const { params: { id } } = match;
  const type = pathname.split('/')[1];
  const dispatch = useDispatch();

  const getAndSaveRecipe = async () => {
    const newRecipe = await dispatch(fetchRecipeById(type, id));
    setRecipe(newRecipe);
    setIsLoading(false);
  };

  // Recebe uma palavra e a retorna em maiúsculo no singular
  const capitalize = (word) => word[0].toUpperCase() + word.substring(1, word.length - 1);

  // "ComponentDidMount"
  useEffect(() => {
    getAndSaveRecipe();
  }, []);

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
  }, [recipe, type]);

  if (isLoading) return <h1>Carregando...</h1>;
  const prefix = `str${capitalize(type)}`;

  return (
    <div>
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
      <ol>
        {ingredientList.map((ingredient, i) => (
          <li key={ ingredient } data-testid={ `${i}-ingredient-name-and-measure` }>
            <span>{`${ingredient}`}</span>
            {' - '}
            <span>{recipe[`strMeasure${i + 1}`]}</span>
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      { embededVideo && (
        <iframe data-testid="video" title={ recipe[prefix] } src={ embededVideo } />
      )}
    </div>
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
