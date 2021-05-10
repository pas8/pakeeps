const CHANGE_VIEW_OF_THEME_CHANGER_BUTTON = 'CHANGE_VIEW_OF_THEME_CHANGER_BUTTON';
const CHANGE_MAX_SNACK_VALUE = 'CHANGE_MAX_SNACK_VALUE';

const initialState = { viewOfThemeChangerButton: 'iconButton', maxSnack: 4, };

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW_OF_THEME_CHANGER_BUTTON:
      return { ...state, viewOfThemeChangerButton: action.data };

    case CHANGE_MAX_SNACK_VALUE:
      return { ...state, maxSnack: action.snackNumber };
    default:
      return state;
  }
};

const changeViewOfThemeChangerButton = data => ({
  type: CHANGE_VIEW_OF_THEME_CHANGER_BUTTON,
  data
});
const changeMaxSnackValue = snackNumber => ({
  type: CHANGE_MAX_SNACK_VALUE,
  snackNumber
});



export const changeMaxSnackValueThunk = snackNumber => dispatch => {
  dispatch(changeMaxSnackValue(snackNumber));
};

export const changeViewOfThemeChangerButtonThunk = data => dispatch => {
  dispatch(changeViewOfThemeChangerButton(data));
};

export default settingsReducer;
