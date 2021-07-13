import { useSelector } from 'react-redux';
import { findKey, pickBy, omit, findIndex, values, isNumber } from 'lodash';
import { useWindowSize } from 'react-use';
import { UseFindFolderOrderNamesType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { getHeaderHeight } from 'store/modules/App/selectors';
import { useAddIdToFolder } from './useAddIdToFolder.hook';

export const useFindFolderOrderNames: UseFindFolderOrderNamesType = (
  notValidatedAllFolders,
  notValidatedFolderOrderNames,
  { handleOpenMoreFolders, aditionalFoldersHeigthObj }
) => {
  const folderDimensions = {
    buttonGroup: { marginLeft: 0, marginRight: 0, marginBottom: 20, marginTop: 0, labelHeight: 32 },
    buttonItem: { defaultWidth: 42 + 12, height: 42 + 12 ,extendedWidth:200}
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

    const folderHeight =
      (!!findedElement.label ? defaultFolderHeight + folderDimensions.buttonGroup.labelHeight : defaultFolderHeight) +
      (isNumber(aditionalFoldersHeigthObj[id]) ? aditionalFoldersHeigthObj[id] : 0);

    const itemOfFolderHeightArr = { id, folderGroupHeight: folderHeight };

    return { folderHeight, folderHeightArr: [...accumulator.folderHeightArr, itemOfFolderHeightArr] };
  }, nulittyValueOfReduceFunc);

  const useFindIsHeightMoreThatMax = (searchingId: string) => {
    const findedElement = folderHeightArr?.find(({ id }) => id === searchingId);
    if (!findedElement) return false;
    return findedElement?.folderGroupHeight > maxFolderHeight;
  };
  const key = findKey(notValidatedAllFolders, value => useFindIsHeightMoreThatMax(value.id));

  const defaultBeforeFoldersObj = pickBy(notValidatedAllFolders, value => !useFindIsHeightMoreThatMax(value.id));
  const defaultAfterFoldersObj = omit(
    pickBy(notValidatedAllFolders, value => useFindIsHeightMoreThatMax(value.id)),
    key!
  );

  const folderToChange = notValidatedAllFolders[key!];
  const heightOffolderToChange = folderHeightArr?.find(({ id }) => id === key)?.folderGroupHeight!;

  if (!folderToChange) {
    return {
      folderDimensions,
      folderOrderNames: notValidatedFolderOrderNames,
      foldersBefore: notValidatedAllFolders,
      foldersAfter: []
    };
  }
  const difference = heightOffolderToChange - maxFolderHeight;
  const idxToSliceSlicedFolderArr = ~~(
    folderToChange.arr.length -
    (difference - folderDimensions.buttonGroup.marginBottom) / folderDimensions.buttonItem.height
  );

  const slicedBeforeFolderArr = folderToChange.arr.slice(0, idxToSliceSlicedFolderArr);
  const slicedAfterFolderArr = folderToChange.arr.slice(idxToSliceSlicedFolderArr);

  const sliderFolderNames = {
    BEFORE: `${folderToChange.id}_before`,
    OPEN_MORE: 'OPEN_MORE',
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
  const startIdxToSliceFolderNames = findIndex(notValidatedFolderOrderNames, key);

  validatedDefautlFolderNames.splice(startIdxToSliceFolderNames - 1, 1, ...values(sliderFolderNames));
  const folderOrderNames = validatedDefautlFolderNames;

  return {
    folderDimensions,
    folderOrderNames,
    foldersBefore,
    foldersAfter
  };
};
