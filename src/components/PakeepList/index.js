import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  handleSetPreviusOrderNames,
  handleSetOrderNamesOfPinnedPakeepsThunk,
  handleSetSelectedPakeepsIdThunk,
  handleCancelSelectingStatusThunk
} from 'store/modules/App/operations';
import dynamic from 'next/dynamic';
import {
  getCurrentFolderPropertyIdx,
  getFolders,
  getIsCancelSelectedPakeepsId,
  getPakeeps,
  getPakeepsOrderNames,
  getPinnedPakeepsOrderNames,
  getSelectedPakeepsId
} from 'store/modules/App/selectors';
import { difference, filter, flatten, includes, words } from 'lodash';
import WrapperOfContainerOfPakeepList from './components/WrapperOfContainer';
import { createContext, useEffect, useRef, useState } from 'react';
import SelectofFPakeepListContainer from './components/WrapperOfContainer/components/Container/components/Selecto';
import { useIsomorphicLayoutEffect, useKeyPressEvent } from 'react-use';
// const WrapperOfContainerOfPakeepList = dynamic(() => import(), {
//   loading: () => (
//     <Grid style={{ height: '80vh', width: '100%' }} container alignItems={'center'} justify={'center'}>
//       <CircularProgress />
//     </Grid>
//   ),
//   ssr: false
// });
export const PakeepHoveringContext = createContext();

const PakeepList = ({
  pakeeps,
  pakeepsOrderNames,
  currentFolderPropertyIdx,
  folders,
  pinnedPakeepsOrderNames,
  handleSetPreviusOrderNames,
  handleSetSelectedPakeepsIdThunk,
  handleSetOrderNamesOfPinnedPakeepsThunk,
  selectedPakeepsId,
  isCancelSelectedPakeepsId,
  handleCancelSelectingStatusThunk
}) => {
  const SELECTED = 'selected';

  const [isPakeepDragging, setIsPakeepDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isPakeepHovering, setIsPakeepHovering] = useState(false);
  console.log(selectedPakeepsId);

  const flattenFolder = flatten(folders);
  const folderProperty = flattenFolder[currentFolderPropertyIdx]?.property;
  const folderId = flattenFolder[currentFolderPropertyIdx]?.id;

  const isFolderPropertyIsAll = folderProperty === 'ALL';
  const pinnedPakeeps = filter(pakeeps, ({ isPinned }) => !!isPinned);

  const defaultPakeepListContainerProps = {
    folderProperty,
    folderId,
    isSelecting
  };

  const wrapperOfContainerOfPinnedPakeepListProps = {
    columnOfPakeepListContainerProps: {
      ...defaultPakeepListContainerProps,
      isPakeepDragContextPinned: isFolderPropertyIsAll
    },
    pakeeps: pinnedPakeeps,
    setIsPakeepDragging,
    pakeepsOrderNames: pinnedPakeepsOrderNames,
    handleSetPreviusOrderNamesFunc: handleSetOrderNamesOfPinnedPakeepsThunk
  };

  const wrapperOfContainerOfAllPakeepListProps = {
    columnOfPakeepListContainerProps: { ...defaultPakeepListContainerProps, isPakeepDragContextPinned: false },
    setIsPakeepDragging,
    pakeeps,
    pakeepsOrderNames,
    handleSetPreviusOrderNamesFunc: handleSetPreviusOrderNames
  };
  const scrollerRef = useRef(null);

  const selectofFPakeepListContainerProps = {
    scrollerRef,
    setSelectedIds: handleSetSelectedPakeepsIdThunk,
    setIsSelecting,
    SELECTED
  };

  const isSelectoHidden = isPakeepHovering || isPakeepDragging;

  const cancelSelectedPakeepsId = () => {
    handleCancelSelectingStatusThunk(true);
  };

  useIsomorphicLayoutEffect(() => {
    if (!isCancelSelectedPakeepsId) return;

    handleSetSelectedPakeepsIdThunk([]);
    const selectedItems = document.querySelectorAll(`.${SELECTED}`);
    selectedItems.forEach(el => el.classList.remove(SELECTED));
    handleCancelSelectingStatusThunk(false);
  }, [isCancelSelectedPakeepsId]);

  useKeyPressEvent('Escape', cancelSelectedPakeepsId);
  const isSomePakeepsSelected = selectedPakeepsId.length > 0;

  const onClickOfPakeepElement = id => {
    if (!isSomePakeepsSelected) return;
    const newItem = document.getElementById(id);
    const isSelected = includes(newItem.className, SELECTED);

    if (isSelected) {
      const newSelectedPakeepsId = filter(selectedPakeepsId, pakeepId => pakeepId !== id);
      newItem.classList.remove(SELECTED);

      return handleSetSelectedPakeepsIdThunk(newSelectedPakeepsId);
    }

    const newSelectedPakeepsId = [...selectedPakeepsId, id];
    newItem.classList.add(SELECTED);

    return handleSetSelectedPakeepsIdThunk(newSelectedPakeepsId);
  };
  const pakeepHoveringContextPropviderPropsValue = {
    setIsPakeepHovering,
    onClickOfPakeepElement,
    isSomePakeepsSelected
  };

  return (
    <PakeepHoveringContext.Provider value={pakeepHoveringContextPropviderPropsValue}>
      <Grid ref={scrollerRef} className={'selectoContainer'}>
        {isFolderPropertyIsAll && <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfPinnedPakeepListProps} />}

        <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfAllPakeepListProps} />
        {!isSelectoHidden && <SelectofFPakeepListContainer {...selectofFPakeepListContainerProps} />}
      </Grid>
    </PakeepHoveringContext.Provider>
  );
};

PakeepList.propTypes = {
  changePakeepColumnsDataThunk: PropTypes.func,
  changeTwoPakeepColumnsDataThunk: PropTypes.func,
  columnOrder: PropTypes.shape({
    slice: PropTypes.func
  }),
  columns: PropTypes.any,
  labels: PropTypes.any,
  pakeeps: PropTypes.any
};

const mapStateToProps = ({
  app: {
    pakeeps,
    pakeepsOrderNames,
    currentFolderPropertyIdx,
    folders,
    selectedPakeepsId,
    pinnedPakeepsOrderNames,
    isCancelSelectedPakeepsId
  }
}) => ({
  pakeeps: getPakeeps(pakeeps),
  selectedPakeepsId: getSelectedPakeepsId(selectedPakeepsId),

  pakeepsOrderNames: getPakeepsOrderNames(pakeepsOrderNames),
  pinnedPakeepsOrderNames: getPinnedPakeepsOrderNames(pinnedPakeepsOrderNames),
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders),
  isCancelSelectedPakeepsId: getIsCancelSelectedPakeepsId(isCancelSelectedPakeepsId)
});
const mapDispatchToProps = dispatch => ({
  handleSetPreviusOrderNames: orderNames => dispatch(handleSetPreviusOrderNames(orderNames)),
  handleSetSelectedPakeepsIdThunk: pakepsId => dispatch(handleSetSelectedPakeepsIdThunk(pakepsId)),
  // handlePakeepsOrderNamesThunk: newOrder => dispatch(handlePakeepsOrderNamesThunk(newOrder)),
  handleSetOrderNamesOfPinnedPakeepsThunk: orderNames => dispatch(handleSetOrderNamesOfPinnedPakeepsThunk(orderNames)),
  handleCancelSelectingStatusThunk: boolValue => dispatch(handleCancelSelectingStatusThunk(boolValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
