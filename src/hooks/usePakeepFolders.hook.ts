import { DEFAULT, NONE, pakeepFoldersKeyName, pakeepPropertyiesNames } from 'models/denotation';
import { UsePakeepFoldersType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useSelector } from 'react-redux';
import { getGlobalEventsArr, getLabels, getSearchPropertyies } from 'store/modules/App/selectors';
import { useAddIdToFolder } from './useAddIdToFolder.hook';
import { useTakeDefaultPakeepPropetiesFolderArr } from './useTakeDefaultPakeepPropetiesFolderArr.hook';

export const usePakeepFolders: UsePakeepFoldersType = () => {


  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);

  const property = { value: AdditionalFolderPropertyNames.DEFAULT };

  const defaultPropetiesFolderArr =  useTakeDefaultPakeepPropetiesFolderArr()


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
