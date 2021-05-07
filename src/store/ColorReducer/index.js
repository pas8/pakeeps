const CHANGE_ONE_COLOR_COLUMN = 'CHANGE_ONE_COLOR_COLUMN';
const CHANGE_TWO_COLOR_COLUMN = 'CHANGE_TWO_COLOR_COLUMN';

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
    case CHANGE_ONE_COLOR_COLUMN:
      return {
        ...state,
        colorsArr: {
          ...state.colorsArr,
          [action.columnId]: action.newArr
        }
      };
    case CHANGE_TWO_COLOR_COLUMN:
      return {
        ...state,
        colorsArr: {
          ...state.colorsArr,
          [action.startColumn.id]: action.startColumn.newArr,
          [action.finishColumn.id]: action.finishColumn.newArr
        }
      };
    default:
      return state;
  }
};

const changeOneColorColumn = (columnId, newArr) => ({ type: CHANGE_ONE_COLOR_COLUMN, columnId, newArr });
const changeTwoColorColumn = (startColumn, finishColumn) => ({
  type: CHANGE_TWO_COLOR_COLUMN,
  startColumn,
  finishColumn
});

export const changeOneColorColumnThunk = (columnId, newArr) => dispatch => {
  dispatch(changeOneColorColumn(columnId, newArr));
};
export const changeTwoColorColumnThunk = (startColumn, finishColumn) => dispatch => {
  dispatch(changeTwoColorColumn(startColumn, finishColumn));
};

export default ColorReducer;
