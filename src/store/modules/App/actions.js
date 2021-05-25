import * as types from './types';

export const toAddNewPakeep = data => ({ type: types.ADD_NEW_PAKEEP, newPaKeep: data });
export const toDeletePakeep = id => ({ type: types.DELETE_PAKEEP, id });

export const toSetMenuOpenStatus = boolStatus => ({ type: types.IS_MENU_OPEN, boolStatus });

export const toChangeColumns = (columnVvalue, breakpointName) => ({
  type: types.CHANGE_PAKEEP_COLUMNS,
  columnValue,
  breakpointName
});
export const toAddDateToPakeep = (pakeepId, event) => ({ type: types.ADD_DATE_TO_PAKEEP, pakeepId, event });

export const toChangeTwoColumns = (startColumn, finishColumn, breakpointName) => ({
  type: types.CHANGE_TWO_PAKEEP_COLUMNS,
  startColumn,
  finishColumn,
  breakpointName
});

export const toScroll = scrollDirectionName => ({ type: types.SCROLL_DIRECTION, scrollDirectionName });

export const toSetNewOrderNames = newOrder => ({ type: types.SET_NEW_ORDER_NAMES, newOrder });
export const toSetCurrentFolderPropertyIdx = folderIdx => ({
  type: types.HANDLE_CURRENT_FOLDER_PROPERTY_IDX,
  folderIdx
});

export const toChangeFolders = foldersArr => ({ type: types.HANDLE_FOLDERS, foldersArr });
export const toChangeLabelItem = labels => ({ type: types.CHANGE_LABEL_ITEM, labels });

export const toMovePakeepToArchive = (id, changedLabel) => ({ type: types.MOVE_PAKEEP_TO_ARCHIVE, id, changedLabel });
export const toDeleteLabelFromPakeep = (currentPakeep, labels) => ({
  type: types.DELETE_LABEL_FROM_PAKEEP,
  currentPakeep,
  labels
});

export const toSetPreviusOrderNames = orderNames => ({ type: types.HANDLE_SET_PREVIUOS_ORDER_NAMES, orderNames });
export const toHandleDrawerWidth = drawerWidth => ({ type: types.HANDLE_DRAWER_WIDTH, drawerWidth });
