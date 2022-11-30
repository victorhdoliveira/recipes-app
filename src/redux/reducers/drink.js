const INITIAL_STATE = {
  recipes: [],
};

function drinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_DRINKS_RECIPES':
    return {
      ...state,
      recipes: action.payload,
    };
  default:
    return state;
  }
}

export default drinkReducer;
