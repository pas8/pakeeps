import { UseTakeFoldersArrType } from 'models/types';
import { CLOSE_MENU_ID } from 'models/denotation';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useFindCorrectFoldersPropertyies } from './useFindCorrectFoldersPropertyies.hook';
import { useAddIdToFolder } from './useAddIdToFolder.hook';
import { useFindFolderOrderNames } from './useFindFolderOrderNames.hook';
import { useTakeAllFolders } from './useTakeAllFolders.hook';

export const useTakeFoldersPropertyies: UseTakeFoldersArrType = ({
  isFoldersHaveDraweView,
  handleCloseFoldersWithDrawerView,
  ...additiontalParamsOfUseFindFolderOrderNames
}) => {
  const closeMenuFolderArr = [
    {
      title: 'Close menu',
      iconName: 'close',
      id: 'folder-close',
      property: { value: AdditionalFolderPropertyNames.ON_CLICK, onClick: handleCloseFoldersWithDrawerView },
      color: 'default'
    }
  ];

  const closeMenuFolders = useAddIdToFolder({
    [CLOSE_MENU_ID]: {
      label: '',
      arr: closeMenuFolderArr
    }
  });

  const allFolders = useTakeAllFolders();

  const { correctFolderValueOrder, correctFolders } = useFindCorrectFoldersPropertyies(allFolders);

  const notValidatedAllFolders = isFoldersHaveDraweView ? { ...closeMenuFolders, ...correctFolders } : correctFolders;

  const notValidatedFolderOrderValueNames = isFoldersHaveDraweView
    ? [CLOSE_MENU_ID, ...correctFolderValueOrder]
    : correctFolderValueOrder;

  const { foldersBefore, ...defaultFolderPropertyies } = useFindFolderOrderNames(
    notValidatedAllFolders,
    notValidatedFolderOrderValueNames,
    additiontalParamsOfUseFindFolderOrderNames
  );

  return {
    ...defaultFolderPropertyies,
    foldersBefore: isFoldersHaveDraweView ? notValidatedAllFolders : foldersBefore
  };
};
