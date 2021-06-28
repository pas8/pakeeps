import { UsePakeepFoldersType } from 'models/types';

export const usePakeepFolders: UsePakeepFoldersType = ({ labels, defaultFolderArr }) => {
  const labelsArr = labels.map(({ title, iconName, id, color }) => ({ title, iconName, id, property: 'label', color }));
  const foldersArr = [[...defaultFolderArr], [...labelsArr]];

  return foldersArr;
};
