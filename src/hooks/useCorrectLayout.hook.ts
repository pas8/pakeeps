import DateLayout from 'layouts/DateLayout';
import DialogsLayout from 'layouts/DialogsLayout';
import FolderLayout from 'layouts/FolderLayout';
import MenuesLayout from 'layouts/MenuesLayout';
import { denotationOfCorrectLayoutCases } from 'layouts/RouterLayout/denotation';
import { usePropertyDueToRoute } from './usePropertyDueToRoute.hook';

export const useCorrectLayout = (): any[] => {
  const pakeepLayouts = [DateLayout, MenuesLayout, DialogsLayout, FolderLayout];
  const PROPERTY = usePropertyDueToRoute();

  switch (PROPERTY) {
    case denotationOfCorrectLayoutCases.BASE_URL:
      return pakeepLayouts;

    case denotationOfCorrectLayoutCases.FOLDER_LAYOUT_HIDDEN:
      return [];

    default:
      return [FolderLayout];
  }
};
