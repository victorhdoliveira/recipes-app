import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import blackHeart from '../images/blackHeartIcon.svg';
import shareSvg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { fetchRecipeById, fetchRecipes } from '../redux/actions';
import './RecipeDetails.css';

const copy = require('clipboard-copy');

export default function RecipeDetails({ match, location: { pathname } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [recomendedRecipes, setRecomendedRecipes] = useState([]);
  const [embededVideo, setEmbededVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { params: { id } } = match;
  const type = pathname.split('/')[1];
  const otherType = type === 'meals' ? 'drinks' : 'meals';
  const allRecipes = useSelector((state) => state[otherType].recipes);

  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const data = storage && storage[type];
  const isInProgress = data && !!data[id];

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

  const getFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const bool = !!favorites.find((favorite) => favorite.id === id);
    setIsFavorite(bool);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchRecipes(otherType));
    getFavorite();
    getAndSaveRecipe();
  }, [type]);

  useEffect(() => {
    const limit = 6;
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

  const handleCopy = () => {
    copy(`http://localhost:3000${pathname}`);
    setIsCopied(true);
  };

  const handleFavorite = () => {
    const favorite = {
      id,
      type: (type === 'meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[prefix],
      image: recipe[`${prefix}Thumb`],
    };
    console.log(favorite);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    let favoriteIndex;
    const isNotFavorite = !favorites.find((fav, i) => {
      favoriteIndex = i;
      return fav.id === id;
    });
    if (isNotFavorite) {
      favorites.push(favorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(true);
    } else {
      favorites.splice(favoriteIndex, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(false);
    }
  };

  const handleStart = () => {
    history.push(`/${type}/${id}/in-progress`);
  };

  if (isLoading) return <h1>Carregando...</h1>;

  return (
    <>
      <div className="detail-container">
        <header>
          <button type="button" data-testid="share-btn" onClick={ handleCopy }>
            <img src={ shareSvg } alt="compartilhar" />
          </button>
          <button type="button" onClick={ handleFavorite }>
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeart : whiteHeart }
              alt="favoritar"
            />
          </button>
          {isCopied && <p>Link copied!</p>}
        </header>
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
        onClick={ handleStart }
      >
        {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
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
