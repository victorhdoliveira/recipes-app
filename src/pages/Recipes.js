import { shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../redux/actions';

function Recipes({ location }) {
  const [recipesList, setRecipesList] = useState([]);
  const dispatch = useDispatch();

  const { pathname } = location;
  const type = pathname.replace('/', '');
  const allRecipes = useSelector((state) => state[type].recipes);

  useEffect(() => {
    setRecipesList([]);
    dispatch(fetchRecipes(type));
  }, [type]);

  useEffect(() => {
    const limit = 12;
    setRecipesList(allRecipes.slice(0, limit));
  }, [allRecipes]);

  return (
    <div>
      <div>
        {(type === 'meals' && recipesList.length) ? (
          recipesList.map(({ strMeal, strMealThumb }, i) => (
            <RecipeCard
              key={ i }
              name={ strMeal }
              thumb={ strMealThumb }
              index={ i }
            />
          ))
        ) : (
          recipesList.map(({ strDrink, strDrinkThumb }, i) => (
            <RecipeCard
              key={ i }
              name={ strDrink }
              thumb={ strDrinkThumb }
              index={ i }
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  location: shape({
    pathname: string,
  }).isRequired,
};

export default Recipes;
