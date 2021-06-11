import { find, filter, includes, mapValues, camelCase, map, replace, keys, cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import { useGetCurrentPakeep } from './hooks';
import { $enum } from 'ts-enum-util';
import { TypeNames } from './enums';
import { PayloadTypes } from './types';
import { $Keys, $Values } from 'utility-types';

// const f = keys(actions) as const
type ActionType = keyof typeof TypeNames;

type OperateWithOnlyPayload<N> = (payload: N) => void;

const operateToDispatch = <P>(action: ActionType, payload: P): void => {
  const dispatch = useDispatch();
  payload;

  const a = {
    toAddNewPakeep: 8
  };
  const getObjectKey = <T extends object, R extends keyof T>(obj: T, key: R) => {
    return obj[key];
  };

  const actionName = replace(camelCase(action),'handle','to')
  console.log(actionName)
  const actionFunc = getObjectKey(actions,actionName);
  // dispatch(actions[action](payload));
  // func()
};

type OperateToAddNewPakeepType = PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP];
export const operateToAddNewPakeep: OperateWithOnlyPayload<OperateToAddNewPakeepType> = payload => {
  operateToDispatch<OperateToAddNewPakeepType>(TypeNames.HANDLE_ADD_NEW_PAKEEP, payload);
};

// type i = PayloadTypes[TypeNames.HANDLE_DELETE_PAKEEP];
// export const operateToDeletePakeep: OperateWithOnlyPayload<i> = payload => {
//   operateToDispatch<i>(actions.toDeletePakeep, { pakeepId: ';' });
// };

// export const setMenuOpenStatusThunk = boolStatus => dispatch => {
//   dispatch(toSetMenuOpenStatus(boolStatus));
// };

// export const addDateToPakeepThunk = (pakeepId, event) => dispatch => {
//   dispatch(toAddDateToPakeep(pakeepId, event));
// };

// export const handleScrollDirectionName = scrollDirectionName => dispatch => {
//   dispatch(toScroll(scrollDirectionName));
// };
// export const handlePakeepsOrderNamesThunk = newOrder => dispatch => {
//   dispatch(toSetNewOrderNames(newOrder));
// };

// export const handleCurrentFolderPropertyIdxThunk = folderIdx => dispatch => {
//   dispatch(toSetCurrentFolderPropertyIdx(folderIdx));
// };

// export const handleFoldersThunk = foldersArr => dispatch => {
//   dispatch(toChangeFolders(foldersArr));
// };

// export const changeLabelItemThunk = changedLabel => (dispatch, getState) => {
//   const {
//     app: { labels }
//   } = getState();

//   const filteredLabels = filter(labels, ({ id }) => id !== changedLabel.id);
//   const newLabels = [...filteredLabels, changedLabel];
//   dispatch(toChangeLabelItem(newLabels));
// };

// export const handleDeleteLabelFromPakeepThunk = (pakeepId, labelId) => (dispatch, getState) => {
//   const currentPakeep = useGetCurrentPakeep(pakeepId, getState);
//   const labels = filter(currentPakeep.labels, id => labelId !== id);
//   dispatch(toChangeLabelFromPakeep(currentPakeep, labels));
// };

// export const handleAddLabelToPakeepThunk = (pakeepId, labelId) => (dispatch, getState) => {
//   const currentPakeep = useGetCurrentPakeep(pakeepId, getState);
//   const isPakeepHaveThisLabel = includes(currentPakeep.labels, labelId);

//   const newLabels = [...currentPakeep?.labels, labelId];
//   const labels = isPakeepHaveThisLabel ? currentPakeep.labels : newLabels;

//   dispatch(toChangeLabelFromPakeep(currentPakeep, labels));
// };

// export const handleDrawerWidthThunk = drawerWidth => dispatch => {
//   dispatch(toHandleDrawerWidth(drawerWidth));
// };

// export const handleSetPreviusOrderNames = orderNames => dispatch => {
//   dispatch(toSetPreviusOrderNames(orderNames));
// };

// export const handleSetOrderNamesOfPinnedPakeepsThunk = orderNames => dispatch => {
//   dispatch(toSetOrderNamesOfPinnedPakeeps(orderNames));
// };

// export const handleAddNewGlobalLabelThunk = newLabel => dispatch => {
//   dispatch(toAddNewGlobalLabel(newLabel));
// };

// export const handkePakeepPropertyThunk = (pakeepId, property) => (dispatch, getState) => {
//   const {
//     app: { pakeeps }
//   } = getState();

//   const currentPakeep = find(pakeeps, ({ id }) => pakeepId === id);
//   const concatedPakeepWithUpdatedProperty = { ...currentPakeep, ...property };
//   const filteredPakeeps = filter(pakeeps, ({ id }) => pakeepId !== id);

//   const newPakeeps = [...filteredPakeeps, concatedPakeepWithUpdatedProperty];
//   // console.log(newPakeeps)
//   dispatch(toSetNewPakeepsArr(newPakeeps));
// };

// export const handlePinStatusPakeepThunk = (pakeepId, isPakeepPinned) => dispatch => {
//   dispatch(toHandlePinStatusPakeep(pakeepId, isPakeepPinned));
// };

// export const handleSetSelectedPakeepsIdThunk = pakepsId => dispatch => {
//   dispatch(toSetSelectedPakeepIds(pakepsId));
// };

// export const handleCancelSelectingStatusThunk = boolValue => dispatch => {
//   dispatch(toSetIsCancelSelectedPakeepsId(boolValue));
// };

// export const operateToChangeSelectedPakeepsProperty = newPakeeps => dispatch => {
//   dispatch(actions.toChangeSelectedPakeepsProperty(newPakeeps));
// };

// export const handlePakeepPropertyThunk = (pakeepId, property) => dispatch => {
//   dispatch(toHandlePakeepProperty(pakeepId, property));
// };

// export const handlePakeepEventsThunk = (pakeepId, events) => dispatch => {
//   dispatch(toHandlePakeepProperty(pakeepId, { events }));
// };

// export const handleThemeColorsThunk = newThemeColors => dispatch => {
//   dispatch(toHandleThemeColors(newThemeColors));
// };
