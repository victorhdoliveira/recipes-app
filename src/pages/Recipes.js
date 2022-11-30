import { arrayOf, func, shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../redux/actions';

function Recipes({ location, dispatch, meals, drinks }) {
  const [recipes, setRecipes] = useState([]);

  const { pathname } = location;
  const type = pathname.replace('/', '');

  useEffect(() => {
    console.log(type);
    dispatch(fetchRecipes(type));
  }, []);

  useEffect(() => {
    const limit = 12;
    if (type === 'meals') {
      setRecipes(meals.slice(0, limit));
    } else {
      setRecipes(drinks.slice(0, limit));
    }
  }, [meals, drinks]);

  return (
    <div>
      {(type === 'meals') ? (
        recipes.map(({ strMeal, strMealThumb }, i) => (
          <RecipeCard
            key={ strMeal }
            name={ strMeal }
            thumb={ strMealThumb }
            index={ i }
          />
        ))
      ) : (
        recipes.map(({ strDrink, strDrinkThumb }, i) => (
          <RecipeCard
            key={ strDrink }
            name={ strDrink }
            thumb={ strDrinkThumb }
            index={ i }
          />
        ))
      )}
    </div>
  );
}

Recipes.propTypes = {
  dispatch: func.isRequired,
  meals: arrayOf(shape({})).isRequired,
  drinks: arrayOf(shape({})).isRequired,
  location: shape({
    pathname: string,
  }).isRequired,
};

const mapStateToProps = ({ food, drink }) => ({
  meals: food.recipes,
  drinks: drink.recipes,
});

export default connect(mapStateToProps)(Recipes);
