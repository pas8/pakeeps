import { useSelector } from 'react-redux';
import { denotationOfCorrectLayoutCases } from 'layouts/RouterLayout/denotation';
import { UseFindCorrectFoldersPropertyiesType } from 'models/types';
import { getPakeepFolderOrderNames } from 'store/modules/App/selectors';
import { usePropertyDueToRoute } from './usePropertyDueToRoute.hook';

export const useFindCorrectFoldersPropertyies: UseFindCorrectFoldersPropertyiesType = ({
  defaultPakeepFolders,
  defaultFoldersBefore,
  defaultForderAfter,
  defaultSettingsFolders
}) => {
  const PROPERTY = usePropertyDueToRoute();

  const folderOrderNames = useSelector(getPakeepFolderOrderNames);

  const defaultFolders = () => {
    switch (PROPERTY) {
      case denotationOfCorrectLayoutCases.BASE_URL:
        return defaultPakeepFolders;

      case denotationOfCorrectLayoutCases.SETTING_URL:
        return defaultSettingsFolders;

      default:
        return {};
    }
  };

  const correctFolders = { ...defaultFoldersBefore, ...defaultFolders(), ...defaultForderAfter };
  const defaultFolderOrder = Object.values(correctFolders).map(({ id }) => id);

  const correctFolderValueOrder = !!folderOrderNames[PROPERTY] ? folderOrderNames[PROPERTY] : defaultFolderOrder;

  return { correctFolders, correctFolderValueOrder };
};
