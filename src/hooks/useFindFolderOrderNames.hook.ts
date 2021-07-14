import { useSelector } from 'react-redux';
import { findKey, pickBy, omit, findIndex, values, isNumber, sum, some } from 'lodash';
import { useWindowSize } from 'react-use';
import { UseFindFolderOrderNamesType } from 'models/types';
import { menuOpenStatusDenotation,OPEN_MORE } from 'models/denotation';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { getFolderDimensions, getHeaderHeight, getMenuOpenStatus } from 'store/modules/App/selectors';
import { useAddIdToFolder } from './useAddIdToFolder.hook';


export const useFindFolderOrderNames: UseFindFolderOrderNamesType = (
  notValidatedAllFolders,
  notValidatedFolderOrderNames,
  { handleOpenMoreFolders, aditionalFoldersHeigthObj }
) => {
  const folderDimensions = useSelector(getFolderDimensions);
  const menuOpenStatus = useSelector(getMenuOpenStatus);
  const isFolderExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;

  const { height: windowHeight, width } = useWindowSize();

  const headerHeight = useSelector(getHeaderHeight);
  const maxFolderHeight = windowHeight - headerHeight - folderDimensions.container.paddingBottom

  const nulittyValueOfFoldersReduceFunc = {
    foldersHeight: 0,
    folderGroupItemsHeightArr: [] as { id: string; folderGroupHeight: number }[],
    folderItemsArr: [] as { id: string; height: number }[]
  };

  const { folderGroupItemsHeightArr, folderItemsArr } = notValidatedFolderOrderNames.reduce((accumulator, id) => {
    const findedElement = notValidatedAllFolders[id];
    if (!findedElement) return accumulator;

    const nullityOfFolderGroipDimensionsReduceFunc = {
      folderItemsArr: accumulator.folderItemsArr,
      foldersHeight: accumulator.foldersHeight
    };

    const folderGroipDimensions = findedElement.arr.reduce((sum, { id }) => {
      const findedFolderHeight = aditionalFoldersHeigthObj[id];
      const foldersHeight = sum.foldersHeight + findedFolderHeight;

      const folderItemsArr = [...sum.folderItemsArr, { id, height: foldersHeight }];

      return { foldersHeight, folderItemsArr };
    }, nullityOfFolderGroipDimensionsReduceFunc);

    const folderGroupItemsHeightArr = [
      ...accumulator.folderGroupItemsHeightArr,
      { id, folderGroupHeight: folderGroipDimensions.foldersHeight }
    ];

    return { ...folderGroipDimensions, folderGroupItemsHeightArr };
  }, nulittyValueOfFoldersReduceFunc);

  const useFindIsHeightMoreThatMax = (searchingId: string) => {
    const findedElement = folderGroupItemsHeightArr?.find(({ id }) => id === searchingId);
    if (!findedElement) return false;
    return findedElement?.folderGroupHeight > maxFolderHeight;
  };
  const key = findKey(notValidatedAllFolders, ({ id }) => useFindIsHeightMoreThatMax(id));

  const defaultBeforeFoldersObj = pickBy(notValidatedAllFolders, value => !useFindIsHeightMoreThatMax(value.id));
  const defaultAfterFoldersObj = omit(
    pickBy(notValidatedAllFolders, value => useFindIsHeightMoreThatMax(value.id)),
    key!
  );
  const folderToChange = notValidatedAllFolders[key!];
  const folderItemIdWidthHaveMoreHeightThatMax = folderItemsArr.find(({ height }) => height > maxFolderHeight)?.id;

  if (!folderToChange) {
    return {
      folderDimensions,
      folderOrderNames: notValidatedFolderOrderNames,
      foldersBefore: notValidatedAllFolders,
      foldersAfter: []
    };
  }
  const idxToSliceSlicedFolderArr = findIndex(folderToChange.arr, ({ id }) => id === folderItemIdWidthHaveMoreHeightThatMax) -2

  const validatedIdxToSliceSlicedFolderArr = idxToSliceSlicedFolderArr >= 0 ? idxToSliceSlicedFolderArr : 0;
  const slicedBeforeFolderArr = folderToChange.arr.slice(0, validatedIdxToSliceSlicedFolderArr);
  const slicedAfterFolderArr = folderToChange.arr.slice(validatedIdxToSliceSlicedFolderArr);

  const sliderFolderNames = {
    BEFORE: `${folderToChange.id}_before`,
    OPEN_MORE: OPEN_MORE,
    AFTER: `${folderToChange.id}_after`
  };

  const slicedBeforeFolder = useAddIdToFolder({
    [sliderFolderNames.BEFORE]: {
      label: folderToChange.label,
      arr: slicedBeforeFolderArr
    }
  });

  const slicedAfterFolder = useAddIdToFolder({
    [sliderFolderNames.AFTER]: {
      label: folderToChange.label,
      arr: slicedAfterFolderArr
    }
  });

  const openMoreFolder = useAddIdToFolder({
    [sliderFolderNames.OPEN_MORE]: {
      label: '',
      arr: [
        {
          title: 'Open more',
          iconName: 'more',
          id: sliderFolderNames.OPEN_MORE,
          property: { value: AdditionalFolderPropertyNames.ON_CLICK, onClick: handleOpenMoreFolders },
          color: 'default'
        }
      ]
    }
  });
  const foldersBefore = { ...defaultBeforeFoldersObj, ...slicedBeforeFolder, ...openMoreFolder };
  const foldersAfter = { ...defaultAfterFoldersObj, ...slicedAfterFolder };

  const validatedDefautlFolderNames = Array.from(notValidatedFolderOrderNames);
  const startIdxToSliceFolderNames = findIndex(notValidatedFolderOrderNames, el => el === key);

  validatedDefautlFolderNames.splice(startIdxToSliceFolderNames, 1, ...values(sliderFolderNames));
  const folderOrderNames = validatedDefautlFolderNames;

  return {
    folderDimensions,
    folderOrderNames,
    foldersBefore,
    foldersAfter
  };
};
