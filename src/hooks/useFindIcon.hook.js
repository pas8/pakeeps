import { iconsArr } from 'components/Icons';

export const useFindIcon = name => {
  const icon = iconsArr.find(({ iconName }) => iconName === name)?.icon;

  return icon;
};
