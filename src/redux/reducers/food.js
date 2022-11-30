const INITIAL_STATE = {
  recipes: [],
};

function foodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_MEALS_RECIPES':
    return {
      ...state,
      recipes: action.payload,
    };
  default:
    return state;
  }
}

export default foodReducer;
