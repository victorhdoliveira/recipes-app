export function setRecipes(type, recipes) {
  return {
    type: `SET_${type.toUpperCase()}_RECIPES`,
    payload: recipes,
  };
}

export function fetchRecipes(type) {
  const endpoint = (type === 'meals')
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  return (dispatch) => fetch(endpoint)
    .then((response) => response.json())
    .then((json) => dispatch(setRecipes(type, json[type])));
}
