import { DEFAULT, denotationOfDefaultPakeepPropetiesOfFolders, pakeepPropertyiesNames } from 'models/denotation';
import { AdditionalFolderPropertyNames } from 'models/unums';

export const useTakeDefaultPakeepPropetiesFolderArr = () => {
  const property = { value: AdditionalFolderPropertyNames.DEFAULT };

  const defaultPropetiesFolderArr = [
    { id: pakeepPropertyiesNames.isPinned },
    { id: pakeepPropertyiesNames.isInBookmark },
    { id: pakeepPropertyiesNames.isFavorite },
    { id: pakeepPropertyiesNames.isCheckBoxes },
    { id: pakeepPropertyiesNames.isArchived }
  ].map(value => ({ ...denotationOfDefaultPakeepPropetiesOfFolders[value.id], property, color: DEFAULT, ...value }));

  return defaultPropetiesFolderArr;
};
