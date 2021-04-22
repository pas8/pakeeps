const ADD_NEW_PAKEEP = 'ADD_NEW_PAKEEP';

const initialState = {
  data: 1,
  pakeeps: [
    {
      title: 'Placeholder',
      text: 'Placeholder total time fwemn dvfkbnd  ewkfjqbn mfewqb nm wef qmnmwfemm',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: false
    }
  ]
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PAKEEP:
      return { ...state, pakeeps: [...state.pakeeps, action.newPaKeep] };
    default:
      return state;
  }
};

const addNewPakeep = data => ({ type: ADD_NEW_PAKEEP, newPaKeep: data });

export const addNewPaKeepThunk = data => dispatch => {
  console.log(dispatch);
  dispatch(addNewPakeep(data));
};

export default AppReducer;
