const ADD_NEW_PAKEEP = 'ADD_NEW_PAKEEP';
const CHANGE_PAKEEP_COLUMNS = 'CHANGE_PAKEEP_COLUMNS';
const CHANGE_TWO_PAKEEP_COLUMNS = 'CHANGE_TWO_PAKEEP_COLUMNS';
const ADD_DATE_TO_PAKEEP = 'ADD_DATE_TO_PAKEEP';

const initialState = {
  colorsArr: {
    'column-1': [{ colorName: 'deepOrange' }, { colorName: 'orange' }, { colorName: 'amber' }, { colorName: 'yellow' }],
    'column-2': [{ colorName: 'lime' }, { colorName: 'lightGreen' }, { colorName: 'green' }, { colorName: 'teal' }],
    'column-3': [{ colorName: 'cyan' }, { colorName: 'lightBlue' }, { colorName: 'blue' }, { colorName: 'indigo' }],
    'column-4': [{ colorName: 'deepPurple' }, { colorName: 'purple' }, { colorName: 'pink' }, { colorName: 'red' }]
  }
};

const ColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PAKEEP:
      return { ...state, pakeeps: { ...state.pakeeps, [action.newPaKeep.id]: action.newPaKeep } };

    case CHANGE_PAKEEP_COLUMNS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.breakpointName]: {
            ...state.columns[action.breakpointName],
            [action.columnValue.id]: action.columnValue
          }
        }
      };
    case CHANGE_TWO_PAKEEP_COLUMNS:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.breakpointName]: {
            ...state.columns[action.breakpointName],
            [action.startColumn.id]: action.startColumn,
            [action.finishColumn.id]: action.finishColumn
          }
        }
      };

    default:
      return state;
  }
};

const addNewPakeep = data => ({ type: ADD_NEW_PAKEEP, newPaKeep: data });
const changeColumns = (columnValue, breakpointName) => ({ type: CHANGE_PAKEEP_COLUMNS, columnValue, breakpointName });
const changeTwoColumns = (startColumn, finishColumn, breakpointName) => ({
  type: CHANGE_TWO_PAKEEP_COLUMNS,
  startColumn,
  finishColumn,
  breakpointName
});

export const addNewPaKeepThunk = data => dispatch => {
  dispatch(addNewPakeep(data));
};

export const changePakeepColumnsDataThunk = (columnValue, breakpointName) => dispatch => {
  dispatch(changeColumns(columnValue, breakpointName));
};
export const changeTwoPakeepColumnsDataThunk = (startColumn, finishColumn, breakpointName) => dispatch => {
  dispatch(changeTwoColumns(startColumn, finishColumn, breakpointName));
};

export default ColorReducer;
