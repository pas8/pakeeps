import { mapValues } from 'lodash';
import { NONE, pakeepPropertyiesNames } from 'models/denotation';
import { UsePakeepFoldersType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { ALL } from './../models/denotation';
import { useAddIdToFolder } from './useAddIdToFolder.hook';

export const usePakeepFolders: UsePakeepFoldersType = ({ events, labels }) => {
  const property = { value: AdditionalFolderPropertyNames.DEFAULT };

  const defaultPropetiesFolderArr = [
    {
      title: 'Pined',
      iconName: 'pin',
      id: pakeepPropertyiesNames.isPinned,
      color: 'default'
    },
    {
      title: 'Bookmark',
      iconName: 'bookmark',
      id: pakeepPropertyiesNames.isInBookmark,
      color: 'default'
    },
    { title: 'Favorite', iconName: 'favorite', id: pakeepPropertyiesNames.isFavorite, color: 'default' },
    {
      title: 'With checkBoxes',
      iconName: 'checkBox',
      id: pakeepPropertyiesNames.isCheckBoxes,
      color: 'default'
    },
    { title: 'Archiveted', iconName: 'archive', id: pakeepPropertyiesNames.isArchived, color: 'default' }
  ].map(value => ({ ...value, property }));

  const labelsArr = labels.map(({ title, iconName, id, color }) => ({
    title,
    iconName,
    id,
    property,
    color
  }));
  const eventArr = events.map(({ title, iconName, id, color }) => ({
    title,
    iconName,
    id,
    property,
    color
  }));

  const foldersKeyName = {
    PAKEEP_UTILS: 'PAKEEP_UTILS',
    LABELS: 'LABELS',
    EVENTS: 'EVENTS'
  };

  const folders = useAddIdToFolder({
    [foldersKeyName.PAKEEP_UTILS]: {
      label: 'Properties',
      arr: defaultPropetiesFolderArr
    },
    [foldersKeyName.LABELS]: {
      label: 'Labels',
      arr: labelsArr
    },
    [foldersKeyName.EVENTS]: {
      label: 'Events',
      arr: eventArr
    }
  });
  return folders;
};
