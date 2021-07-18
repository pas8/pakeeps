import { mapValues } from 'lodash';
import { DEFAULT, NONE, pakeepFoldersKeyName, pakeepPropertyiesNames } from 'models/denotation';
import { UsePakeepFoldersType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useSelector } from 'react-redux';
import { getSearchPropertyies } from 'store/modules/App/selectors';
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
    iconName: !iconName || iconName === DEFAULT ? 'label' : iconName,
    id,
    property,
    color
  }));
  const eventArr = events.map(({ title, iconName, id, color }) => ({
    title,
    iconName: !iconName || iconName === DEFAULT ? 'event' : iconName,
    id,
    property,
    color
  }));



  const defaultFolders = useAddIdToFolder({
    [pakeepFoldersKeyName.PAKEEP_UTILS]: {
      label: 'Properties',
      arr: defaultPropetiesFolderArr
    },
    [pakeepFoldersKeyName.LABELS]: {
      label: 'Labels',
      arr: labelsArr
    },
    [pakeepFoldersKeyName.EVENTS]: {
      label: 'Events',
      arr: eventArr
    }
  });

  const { name } = useSelector(getSearchPropertyies);

  if (name === NONE) return defaultFolders;

  const searchFolder = useAddIdToFolder({
    [pakeepFoldersKeyName.SEARCH]: {
      label: '',
      arr: [
        {
          title:name,
          iconName: 'search',
          id: pakeepFoldersKeyName.SEARCH,
          property,
          color: DEFAULT
        }
      ]
    }
  });

  return { ...searchFolder, ...defaultFolders };
};
