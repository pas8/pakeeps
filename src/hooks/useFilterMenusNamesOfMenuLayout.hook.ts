import { denotationOfCorrectLayoutCases } from 'layouts/RouterLayout/denotation';
import { MenusLayoutName } from 'models/unums';
import { usePropertyDueToRoute } from './usePropertyDueToRoute.hook';

export const useFilterMenusNamesOfMenuLayout = () => {
  const PROPERTY = usePropertyDueToRoute();

  switch (PROPERTY) {
    case denotationOfCorrectLayoutCases.BASE_URL:
      return [];

    case denotationOfCorrectLayoutCases.SETTING_URL:
      return [MenusLayoutName.LABELS, MenusLayoutName.EVENTS];

    default:
      return [];
  }
};
