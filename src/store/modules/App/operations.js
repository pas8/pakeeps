import {
  toAddDateToPakeep,
  toAddNewPakeep,
  toChangeColumns,
  toChangeTwoColumns,
  toDeletePakeep,
  toScroll,
  toSetMenuOpenStatus,
  toSetNewOrderNames
} from './actions';

export const addNewPaKeepThunk = data => dispatch => {
  console.log(data)
  dispatch(toAddNewPakeep(data));
};

export const deletePakeepThunk = id => dispatch => {
  dispatch(toDeletePakeep(id));
};
export const setMenuOpenStatusThunk = boolStatus => dispatch => {
  dispatch(toSetMenuOpenStatus(boolStatus));
};

export const addDateToPakeepThunk = (pakeepId, event) => dispatch => {
  dispatch(toAddDateToPakeep(pakeepId, event));
};

export const changePakeepColumnsDataThunk = (columnValue, breakpointName) => dispatch => {
  dispatch(toChangeColumns(columnValue, breakpointName));
};
export const changeTwoPakeepColumnsDataThunk = (startColumn, finishColumn, breakpointName) => dispatch => {
  dispatch(toChangeTwoColumns(startColumn, finishColumn, breakpointName));
};

export const handleScrollDirectionName = scrollDirectionName => dispatch => {
  dispatch(toScroll(scrollDirectionName));
};
export const handlePakeepsOrderNamesThunk = newOrder => dispatch => {
  dispatch(toSetNewOrderNames(newOrder));
};


