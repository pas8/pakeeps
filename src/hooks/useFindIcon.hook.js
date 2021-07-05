import { iconsArr } from 'components/Icons';
import { find } from 'lodash';

export const useFindIcon = name => {
  const icon = find(iconsArr,({ iconName }) => iconName === name)?.icon;

  return icon;
};
