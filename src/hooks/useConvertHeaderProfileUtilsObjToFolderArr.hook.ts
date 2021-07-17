import { map } from 'lodash';
import { UseConvertHeaderProfileUtilsObjToFolderArrType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';

export const useConvertHeaderProfileUtilsObjToFolderArr: UseConvertHeaderProfileUtilsObjToFolderArrType = arr => {
  const newArr = map(arr, ({ component: customComponent, toolTipText, onClick, iconName }, id) => {
    return {
      title: toolTipText,
      iconName: !!iconName ? iconName : '',
      id,
      property: { value: AdditionalFolderPropertyNames.CUSTOM_COMPONENT, customComponent, onClick },
      color: 'default'
    };
  });
  return newArr;
};
