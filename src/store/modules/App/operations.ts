// export const addDateToPakeepThunk = (pakeepId, event) => dispatch => {
//   dispatch(toAddDateToPakeep(pakeepId, event));
// };

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
