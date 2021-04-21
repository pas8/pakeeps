const STATE_CHANGE = 'STATE_CHANGE';

const initialState = { data: 1 };

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATE_CHANGE:
      return { ...state, placeholder: action.placeholder };
    default:
      return state;
  }
};

export default AppReducer;
