import { filter, flatten, includes } from 'lodash';
import { createContext, FC, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useKeyPressEvent } from 'react-use';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  getIsCancelSelectedPakeepsId,
  getIsPakeepHovering,
  getPakeeps,
  getPakeepsOrderNames,
  getPinnedPakeepsOrderNames,
  getSelectedPakeepsId
} from 'store/modules/App/selectors';
import { FoldersType, PakeepIdType } from 'store/modules/App/types';
import { DialogLayoutName } from 'models/unums';
import { customColorPlaceholder } from 'components/AccountAvatar';
import {
  toCancelSelectingStatus,
  toChangeTemporaryData,
  toSetOrderNamesOfPakeeps,
  toSetOrderNamesOfPinnedPakeeps,
  toSetSelectedPakeepIdsArr
} from 'store/modules/App/actions';

import WrapperOfContainerOfPakeepList from './components/WrapperOfContainer';
import SelectofFPakeepListContainer from './components/WrapperOfContainer/components/Container/components/Selecto';
import {
  HandleSetPakeepsOrderNamesType,
  HandleSetPinnedPakeepsOrderNamesType,
  HandleSetSelectedPakeepsIdType,
  PakeepHoveringContextPropviderPropsValueType
} from './types';


const PakeepList: FC = () => {
  const dispatch = useDispatch();
  const pakeeps = useSelector(getPakeeps);
  const selectedPakeepsId = useSelector(getSelectedPakeepsId);
  const pakeepsOrderNames = useSelector(getPakeepsOrderNames);
  const pinnedPakeepsOrderNames = useSelector(getPinnedPakeepsOrderNames);
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

  const pinnedPakeeps = filter(pakeeps, ({ isPinned }) => !!isPinned);

  const handleOpenDialog = (id: PakeepIdType) => {
    dispatch(
      toChangeTemporaryData({
        newTemporaryData: {
          defaultDialogProps: { id, dialogName: DialogLayoutName.PAKEEPS, customColor: customColorPlaceholder }
        }
      })
    );
  };

  const onClickOfPakeepElement = (id: PakeepIdType) => {
    if (!isSomePakeepsSelected) return handleOpenDialog(id);
    const newItem: HTMLElement = document.getElementById(id)!;
    const isSelected = includes(newItem.className, SELECTED);
    if (isSelected) {
      const newSelectedPakeepsId = filter(selectedPakeepsId, pakeepId => pakeepId !== id);
      newItem.classList.remove(SELECTED);
      return handleSetSelectedPakeepsId(newSelectedPakeepsId);
    }
    const newSelectedPakeepsId = [...selectedPakeepsId, id];
    newItem.classList.add(SELECTED);
    return handleSetSelectedPakeepsId(newSelectedPakeepsId);
  };
  const defaultPakeepListContainerProps = {
    isPakeepDragging,
    onClickOfPakeepElement,
    isSelecting
  };

  // const wrapperOfContainerOfPinnedPakeepListProps = {
  //   columnOfPakeepListContainerProps: {
  //     ...defaultPakeepListContainerProps,
  //     isPakeepDragContextPinned: isFolderPropertyIsAll
  //   },
  //   pakeeps: pinnedPakeeps,
  //   setIsPakeepDragging,
  //   pakeepsOrderNames: pinnedPakeepsOrderNames,
  //   handleSetPakeepsOrderNames: handleSetPinnedPakeepsOrderNames
  // };

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

  // useEffect(() => {
  //   cancelSelectedPakeepsId();
  // }, [currentFolderPropertyIdx]);

  useEffect(() => {
    !isSomePakeepsSelected && cancelSelectedPakeepsId();
  }, [isSomePakeepsSelected]);

  return (
    <>
      <Grid ref={scrollerRef} className={'selectoContainer'} container >
        {/* {isFolderPropertyIsAll && <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfPinnedPakeepListProps} />} */}

        <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfAllPakeepListProps} />
      </Grid>
      {!isSelectoHidden && <SelectofFPakeepListContainer {...selectoOfPakeepListContainerProps} />}
    </>
  );
};

export default PakeepList;
