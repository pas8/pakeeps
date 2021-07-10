import { NONE } from 'models/denotation';
import { UsePakeepFoldersType } from 'models/types';

export const usePakeepFolders: UsePakeepFoldersType = ({ events, labels, defaultFolderArr }) => {
  const labelsArr = labels.map(({ title, iconName, id, color }) => ({ title, iconName, id, property: 'label', color }));
  const eventArr = events.map(({ title, iconName, id, color }) => ({ title, iconName, id, property: 'event', color }));
  const foldersArr = [
    defaultFolderArr,
    [{ title: 'labels', iconName: NONE, id: 'labels-pl', isFolderIsPlaceholder: true }, ...labelsArr],
    eventArr
  ];

  return foldersArr;
};
