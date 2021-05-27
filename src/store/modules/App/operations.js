import { find, filter } from 'lodash';
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
  toDeleteLabelFromPakeep,
  toSetPreviusOrderNames,
  toHandleDrawerWidth,
  toAddNewGlobalLabel
} from './actions';

export const addNewPaKeepThunk = data => dispatch => {
  console.log(data);
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

export const changeLabelItemThunk = changedLabel => (dispatch, getState) => {
  const {
    app: { labels }
  } = getState();

  const filteredLabels = filter(labels, ({ id }) => id !== changedLabel.id);
  const newLabels = [...filteredLabels, changedLabel];
  dispatch(toChangeLabelItem(newLabels));
};

export const handleDeleteLabelFromPakeepThunk = (pakeepId, labelId) => (dispatch, getState) => {
  const {
    app: { pakeeps }
  } = getState();

  const currentPakeep = find(pakeeps, ({ id }) => pakeepId === id);
  const labels = filter(currentPakeep.labels, id => labelId !== id);

  dispatch(toDeleteLabelFromPakeep(currentPakeep, labels));
};

export const handleDrawerWidthThunk = drawerWidth => dispatch => {
  dispatch(toHandleDrawerWidth(drawerWidth));
};

export const handleSetPreviusOrderNames = orderNames => dispatch => {
  dispatch(toSetPreviusOrderNames(orderNames));
};

export const handleAddNewGlobalLabelThunk = newLabel => dispatch => {
  dispatch(toAddNewGlobalLabel(newLabel));
};
