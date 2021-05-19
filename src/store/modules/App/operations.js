import {
  toAddDateToPakeep,
  toAddNewPakeep,
  toChangeColumns,
  toChangeTwoColumns,
  toDeletePakeep,
  toScroll,
  toSetMenuOpenStatus,
  toSetNewOrderNames,
  toSetCurrentFolderPropertyIdx,
  toChangeFolders,
  toChangeLabelItem,
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


export const handleCurrentFolderPropertyIdxThunk = folderIdx => dispatch => {
  dispatch(toSetCurrentFolderPropertyIdx(folderIdx));
};

export const handleFoldersThunk = foldersArr => dispatch => {
  dispatch(toChangeFolders(foldersArr));
};


// export const addNewLabelItemThunk = (id,changedLabel) => dispatch => {
//   dispatch(toChangeLabelItem(id,changedLabel));
// };

export const  changeLabelItemThunk = (id,property) => (dispatch,getState) => {
  console.log(getState)
  dispatch(toChangeLabelItem(id,property));
};


