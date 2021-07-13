import { UseFindFolderItemPropertyiesType } from 'models/types';

export const useFindFolderItemPropertyies: UseFindFolderItemPropertyiesType = (
  id,
  idx,
  globalFolderId,
  folderArrLength
) => {
  const propertyies = {
    isSelected: id === globalFolderId,
    isLast: folderArrLength === idx + 1,
    isFirst: idx === 0,
    isFolderArrHaveOnlyOneItem: folderArrLength === 1
  };

  return propertyies;
};
