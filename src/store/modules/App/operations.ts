import { toAddNewPakeep } from './actions';
import { PakeepElementType } from 'store/modules/App/types';
// import firebase from 'firebase/app';
// require('firebase/firestore');

export const operateToAddNewPakeep = () => {};
// export const operateToAddNewPakeep =
//   (newPakeep: PakeepElementType): ThunkType<PakeepElementType> =>
//   dispatch => {
//     firebase
//       .firestore()
//       .collection('users')
//       .doc('pas8')
//       .collection('pakeeps')
//       .add(newPakeep)
//       .then(snapshot => {
//         // if (snapshot.exists) {
//         // let newPakeep = snapshot.data();
//         console.log(snapshot);
//         //  dispatch(toAddNewPakeep({newPakeep}))
//         // }
//       });
//   };

// export const operateToChangeMenuOpenStatus: OperateWOP<
//   PayloadTypes[TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS]
// > = payload => {
//   useOperateToDispatch<PayloadTypes[TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS]>(actions.toChangeMenuOpenStatus, payload);
// };

// export const handleScrollDirectionName = scrollDirectionName => dispatch => {
//   dispatch(toScroll(scrollDirectionName));
// };
// export const handlePakeepsOrderNamesThunk = newOrder => dispatch => {
//   dispatch(toSetNewOrderNames(newOrder));
// };

// export const handleCurrentFolderPropertyIdx = folderIdx => dispatch => {
//   dispatch(toSetCurrentFolderPropertyIdx(folderIdx));
// };

// export const handleChangeFolders = foldersArr => dispatch => {
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

// export const handleDrawerWidth = drawerWidth => dispatch => {
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

// export const handlePinStatusPakeep = (pakeepId, isPakeepPinned) => dispatch => {
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
