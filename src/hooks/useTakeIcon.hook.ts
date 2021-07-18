import { iconsArr } from 'components/Icons';

export const useTakeIcon = (keyName: string) => {
  const findedElement = iconsArr.find(({ iconName }) => keyName === iconName);

  const findedIcon = findedElement?.icon;
  //@ts-ignore
  const findedcheckedIcon = findedElement?.checkedIcon;

  return [findedIcon, findedcheckedIcon];
};
