import { iconsArr } from 'components/Icons';

export const useTakeIcon = keyName => {
  const findedElement = iconsArr.find(({ iconName }) => keyName === iconName);

  const findedIcon = findedElement?.icon ??  <></>;

  return [findedIcon];
};