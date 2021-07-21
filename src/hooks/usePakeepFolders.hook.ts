import { DialogLayoutName } from './../models/unums';
import { DEFAULT, NONE, pakeepFoldersKeyName, pakeepPropertyiesNames } from 'models/denotation';
import { UsePakeepFoldersType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { getGlobalEventsArr, getLabels, getSearchPropertyies } from 'store/modules/App/selectors';
import { useAddIdToFolder } from './useAddIdToFolder.hook';
import { useTakeDefaultPakeepPropetiesFolderArr } from './useTakeDefaultPakeepPropetiesFolderArr.hook';
import { customColorPlaceholder } from 'components/AccountAvatar';

export const usePakeepFolders: UsePakeepFoldersType = () => {
  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);
  const dispatch = useDispatch();
  const property = { value: AdditionalFolderPropertyNames.DEFAULT };

  const defaultPropetiesFolderArr = useTakeDefaultPakeepPropetiesFolderArr();

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

  const ADD_NEW_LABEL = 'ADD_NEW_LABEL';
  const ADD_NEW_EVENT = 'ADD_NEW_EVENT';

  const handleOpenDialogAddingNewEvent = () => {
    dispatch(
      toChangeTemporaryData({
        newTemporaryData: {
          defaultDialogProps: {
            dialogName: DialogLayoutName.EVENTS,
            customColor: customColorPlaceholder,
            id: ADD_NEW_EVENT
          }
        }
      })
    );
  };

  const handleOpenDialogAddingNewLabel = () => {
    dispatch(
      toChangeTemporaryData({
        newTemporaryData: {
          defaultDialogProps: {
            dialogName: DialogLayoutName.LABELS,
            customColor: customColorPlaceholder,
            id: ADD_NEW_LABEL
          }
        }
      })
    );
  };

  const defaultFolders = useAddIdToFolder({
    [pakeepFoldersKeyName.PAKEEP_UTILS]: {
      label: 'Properties',
      arr: defaultPropetiesFolderArr
    },
    [pakeepFoldersKeyName.LABELS]: {
      label: 'Labels',
      arr: [
        {
          title: 'Add new label',
          iconName: 'addLabel',
          id: ADD_NEW_LABEL,
          property: { value: AdditionalFolderPropertyNames.ON_CLICK, onClick: handleOpenDialogAddingNewLabel },
          
          color: DEFAULT
        },
        ...labelsArr
      ]
    },
    [pakeepFoldersKeyName.EVENTS]: {
      label: 'Events',
      arr: [
        {
          title: 'Add new event',
          iconName: 'addEvent',
          id: ADD_NEW_EVENT,
          property: { value: AdditionalFolderPropertyNames.ON_CLICK, onClick: handleOpenDialogAddingNewEvent },
          color: DEFAULT
        },
        ...eventArr
      ]
    }
  });

  const { name } = useSelector(getSearchPropertyies);

  if (name === NONE) return defaultFolders;

  const searchFolder = useAddIdToFolder({
    [pakeepFoldersKeyName.SEARCH]: {
      label: '',
      arr: [
        {
          title: name,
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
