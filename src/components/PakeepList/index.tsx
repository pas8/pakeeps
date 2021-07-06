import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import {
  getCurrentFolderPropertyIdx,
  getFolders,
  getIsCancelSelectedPakeepsId,
  getIsPakeepHovering,
  getPakeeps,
  getPakeepsOrderNames,
  getPinnedPakeepsOrderNames,
  getSelectedPakeepsId
} from 'store/modules/App/selectors';
import { difference, filter, flatten, forEach, includes, map, words } from 'lodash';
import WrapperOfContainerOfPakeepList from './components/WrapperOfContainer';
import { createContext, FC, memo, useEffect, useRef, useState } from 'react';
import SelectofFPakeepListContainer from './components/WrapperOfContainer/components/Container/components/Selecto';
import { useIsomorphicLayoutEffect, useKeyPressEvent } from 'react-use';
import EditingDialogOfPakeepElement from './components/EditingDialogOfPakeepElement';
import { FoldersType, PakeepElementType, PakeepIdType, PakeepsType } from 'store/modules/App/types';
import {
  toCancelSelectingStatus,
  toSetOrderNamesOfPakeeps,
  toSetOrderNamesOfPinnedPakeeps,
  toSetSelectedPakeepIdsArr
} from 'store/modules/App/actions';
import { CustomColorType, SelectedPakeepsIdType } from 'models/types';
import {
  HandleSetPakeepsOrderNamesType,
  HandleSetPinnedPakeepsOrderNamesType,
  HandleSetSelectedPakeepsIdType,
  PakeepHoveringContextPropviderPropsValueType
} from './types';
import { Optional } from 'utility-types';
// const WrapperOfContainerOfPakeepList = dynamic(() => import(), {
//   loading: () => (
//     <Grid style={{ height: '80vh', width: '100%' }} container alignItems={'center'} justify={'center'}>
//       <CircularProgress />
//     </Grid>
//   ),
//   ssr: false
// });

export const PakeepHoveringContext = createContext({} as PakeepHoveringContextPropviderPropsValueType);

const PakeepList: FC = () => {
  const dispatch = useDispatch();
  const pakeeps = useSelector(getPakeeps);
  const selectedPakeepsId = useSelector(getSelectedPakeepsId);
  const pakeepsOrderNames = useSelector(getPakeepsOrderNames);
  const pinnedPakeepsOrderNames = useSelector(getPinnedPakeepsOrderNames);
  const currentFolderPropertyIdx = useSelector(getCurrentFolderPropertyIdx);
  const folders: FoldersType = useSelector(getFolders);
  const isCancelSelectedPakeepsId = useSelector(getIsCancelSelectedPakeepsId);
  const isPakeepHovering = useSelector(getIsPakeepHovering);

  const handleSetSelectedPakeepsId: HandleSetSelectedPakeepsIdType = selectedPakeepsId => {
    dispatch(toSetSelectedPakeepIdsArr({ selectedPakeepsId }));
  };
  const handleChangeSelectingStatus = (isCancelSelectedPakeepsId: boolean) => {
    dispatch(toCancelSelectingStatus({ isCancelSelectedPakeepsId }));
  };

  const handleSetPakeepsOrderNames: HandleSetPakeepsOrderNamesType = pakeepsOrderNames => {
    dispatch(toSetOrderNamesOfPakeeps({ pakeepsOrderNames }));
  };

  const handleSetPinnedPakeepsOrderNames: HandleSetPinnedPakeepsOrderNamesType = pinnedPakeepsOrderNames => {
    dispatch(toSetOrderNamesOfPinnedPakeeps({ pinnedPakeepsOrderNames }));
  };

  const SELECTED = 'selected';
  const [isPakeepDragging, setIsPakeepDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const [pakeepDialogId, setPakeepDialogId] = useState<PakeepIdType>('');

  const flattenFolder = flatten(folders);
  const folderProperty = flattenFolder[currentFolderPropertyIdx]?.property;
  const folderId = flattenFolder[currentFolderPropertyIdx]?.id;

  const isFolderPropertyIsAll = folderProperty === 'ALL';
  const pinnedPakeeps = filter(pakeeps, ({ isPinned }) => !!isPinned);

  const onClickOfPakeepElement = (id: PakeepIdType) => {
    // if (!isSomePakeepsSelected) return setPakeepDialogId(id);
    // const newItem: HTMLElement = document.getElementById(id)!;
    // const isSelected = includes(newItem.className, SELECTED);
    // if (isSelected) {
    //   const newSelectedPakeepsId = filter(selectedPakeepsId, pakeepId => pakeepId !== id);
    //   newItem.classList.remove(SELECTED);
    //   return handleSetSelectedPakeepsId(newSelectedPakeepsId);
    // }
    // const newSelectedPakeepsId = [...selectedPakeepsId, id];
    // newItem.classList.add(SELECTED);
    // return handleSetSelectedPakeepsId(newSelectedPakeepsId);
  };
  const defaultPakeepListContainerProps = {
    folderProperty,
    folderId,
    isPakeepDragging,
    onClickOfPakeepElement,
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
    handleSetPakeepsOrderNames: handleSetPinnedPakeepsOrderNames
  };

  const wrapperOfContainerOfAllPakeepListProps = {
    columnOfPakeepListContainerProps: { ...defaultPakeepListContainerProps, isPakeepDragContextPinned: false },
    setIsPakeepDragging,
    pakeeps,
    pakeepsOrderNames,
    handleSetPakeepsOrderNames
  };
  const scrollerRef = useRef(null);

  const selectoOfPakeepListContainerProps = {
    scrollerRef,
    setSelectedIds: handleSetSelectedPakeepsId,
    setIsSelecting,
    SELECTED
  };
  const isSelectoHidden = isPakeepHovering || isPakeepDragging;

  const cancelSelectedPakeepsId = () => {
    handleChangeSelectingStatus(true);
  };

  useIsomorphicLayoutEffect(() => {
    if (!isCancelSelectedPakeepsId) return;

    handleSetSelectedPakeepsId([]);
    const selectedItems = document.querySelectorAll(`.${SELECTED}`);
    selectedItems.forEach(el => el.classList.remove(SELECTED));
    handleChangeSelectingStatus(false);
  }, [isCancelSelectedPakeepsId]);

  useKeyPressEvent('Escape', cancelSelectedPakeepsId);
  const isSomePakeepsSelected = selectedPakeepsId.length > 0;

  const handleClosePakeepDialog = () => setPakeepDialogId('');

  // const pakeepHoveringContextPropviderPropsValue = {
  //   setIsPakeepHovering,
  //   onClickOfPakeepElement,
  //   isSomePakeepsSelected
  // };
  useEffect(() => {
    cancelSelectedPakeepsId();
  }, [currentFolderPropertyIdx]);

  useEffect(() => {
    !isSomePakeepsSelected && cancelSelectedPakeepsId();
  }, [isSomePakeepsSelected]);

  const allPakeepDialogProps = {
    id: pakeepDialogId,
    handleClosePakeepDialog
  };

  return (
    <>
      {/* <PakeepHoveringContext.Provider value={pakeepHoveringContextPropviderPropsValue}> */}
      <Grid ref={scrollerRef} className={'selectoContainer'}>
        {/* {isFolderPropertyIsAll && <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfPinnedPakeepListProps} />} */}

        <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfAllPakeepListProps} />
      </Grid>
      {/* {!isSelectoHidden && <SelectofFPakeepListContainer {...selectoOfPakeepListContainerProps} />} */}
      {/* <SelectofFPakeepListContainer {...selectoOfPakeepListContainerProps} /> */}

      {/* </PakeepHoveringContext.Provider> */}
      {!!pakeepDialogId && <EditingDialogOfPakeepElement {...allPakeepDialogProps} />}
    </>
  );
};

export default PakeepList;
