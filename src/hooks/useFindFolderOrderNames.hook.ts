import { useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { UseFindFolderOrderNamesType } from 'models/types';
import { getHeaderHeight } from 'store/modules/App/selectors';
import { OPEN_MORE } from 'models/denotation';

export const useFindFolderOrderNames: UseFindFolderOrderNamesType = (
  notValidatedAllFolders,
  notValidatedFolderOrderNames
) => {
  const folderDimensions = {
    buttonGroup: { marginLeft: 0, marginRight: 0, marginBottom: 20, marginTop: 0, labelHeight: 28 },
    buttonItem: { defaultWidth: 42, height: 42 }
  };

  const { height: windowHeight, width } = useWindowSize();

  const headerHeight = useSelector(getHeaderHeight);
  const maxFolderHeight = windowHeight - headerHeight;

  const nulittyValueOfReduceFunc = {
    folderHeight: 0,
    folderHeightArr: [] as { id: string; folderGroupHeight: number }[]
  };

  const { folderHeight, folderHeightArr } = notValidatedFolderOrderNames.reduce((accumulator, id) => {
    const findedElement = notValidatedAllFolders[id];
    const itemCounter = findedElement.arr.length;

    const currentFolderHeight = itemCounter * folderDimensions.buttonItem.height;
    const defaultFolderHeight =
      currentFolderHeight + folderDimensions.buttonGroup.marginBottom + accumulator.folderHeight;

    const folderHeight = !!findedElement.label
      ? defaultFolderHeight + folderDimensions.buttonGroup.labelHeight
      : defaultFolderHeight;

    const itemOfFolderHeightArr = { id, folderGroupHeight: folderHeight };

    return { folderHeight, folderHeightArr: [...accumulator.folderHeightArr, itemOfFolderHeightArr] };
  }, nulittyValueOfReduceFunc);

  const folderThatHaveHeightMoreThanMaxFolderHeight = folderHeightArr.find(
    ({ folderGroupHeight }) => folderGroupHeight > maxFolderHeight
  );

  if (!folderThatHaveHeightMoreThanMaxFolderHeight) {
    return {
      folderDimensions,
      folderOrderNamesBefore: notValidatedFolderOrderNames,
      folderOrderNamesAfter: []
    };
  }

  // const folderHeightDifferenceOfMaxHeight = folderHeight - maxFolderHeight;

  const difference = folderThatHaveHeightMoreThanMaxFolderHeight.folderGroupHeight - maxFolderHeight;

  const endIdx = (difference - folderDimensions.buttonGroup.marginBottom) / folderDimensions.buttonItem.height - 1;

  const arrayFromNotValidatedFolderOrderNames = Array.from(notValidatedFolderOrderNames);

  const folderOrderNamesBefore = [...arrayFromNotValidatedFolderOrderNames.slice(0, endIdx - 1), OPEN_MORE];
  const folderOrderNamesAfter = arrayFromNotValidatedFolderOrderNames.slice(endIdx);

  return {
    folderDimensions,
    folderOrderNamesBefore,
    folderOrderNamesAfter
  };
  // const foldersSize = buttonSize + allMarginsOfToogleGroups;
  // const windowSize = positionOfFolderViewWithPakeepViewIsBottom ? windowWidth : windowHeight;

  // const idxOfFolderItemWhichShouldBeInMenu =
  //   flattenAllFolders.length - ~~((foldersSize - windowSize) / avarageButtonSize);

  // const arrToMapOfMoreMenu = filter(flattenAllFolders, (el, idx) => idxOfFolderItemWhichShouldBeInMenu <= idx);
};
