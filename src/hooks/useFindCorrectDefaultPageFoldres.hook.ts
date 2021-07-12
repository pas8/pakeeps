import { denotationOfCorrectLayoutCases } from 'layouts/RouterLayout/denotation';
import { FoldersType } from 'store/modules/App/types';
import { usePropertyDueToRoute } from './usePropertyDueToRoute.hook';

export const useFindCorrectDefaultPageFoldres = ({
  defaultPakeepFolders,
  defaultFoldersBefore,
  defaultForderAfter,
  defaultSettingsFolders
}: {
  [key: string]: FoldersType;
}): FoldersType => {
  const PROPERTY = usePropertyDueToRoute();

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

  return {...defaultFoldersBefore,...defaultFolders,};
};
