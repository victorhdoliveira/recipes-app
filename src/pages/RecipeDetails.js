import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DetailBody from '../components/DetailBody';
import DetailHeader from '../components/DetailHeader';
import Loading from '../components/Loading';
import RecomendedCarousel from '../components/RecomendedCarousel';
import { fetchRecipeById, fetchRecipes } from '../redux/actions';
import './RecipeDetails.css';

export default function RecipeDetails({ match, location: { pathname } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [recomendedRecipes, setRecomendedRecipes] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { params: { id } } = match;
  const type = pathname.split('/')[1];
  const otherType = type === 'meals' ? 'drinks' : 'meals';
  const allRecipes = useSelector((state) => state[otherType].recipes);

  const data = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) || { [type]: { [id]: '' } };

  const isInProgress = !!data[type][id];

  const getAndSaveRecipe = async () => {
    const newRecipe = await dispatch(fetchRecipeById(type, id));
    setRecipe(newRecipe);
    setIsLoading(!newRecipe);
  };

  // Recebe uma palavra e a retorna em maiúsculo no singular
  const capitalize = (word) => word[0].toUpperCase() + word.substring(1, word.length - 1);
  const prefix = `str${capitalize(otherType)}`;

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchRecipes(otherType));
    getAndSaveRecipe();
  }, [type]);

  useEffect(() => {
    const limit = 6;
    setRecomendedRecipes(allRecipes.slice(0, limit));
  }, [type, allRecipes]);

  const handleStart = () => {
    history.push(`/${type}/${id}/in-progress`);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <DetailHeader recipe={ recipe } type={ capitalize(type) } path={ pathname } />
      <div className="detail-container">
        <DetailBody recipe={ recipe } type={ capitalize(type) } />
        {(recomendedRecipes.length && recomendedRecipes[0][prefix]) && (
          <RecomendedCarousel
            recipeList={ recomendedRecipes }
            type={ capitalize(otherType) }
          />
        )}
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
