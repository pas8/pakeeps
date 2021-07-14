import { map } from 'lodash';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { FolderArrType } from 'store/modules/App/types';

export const useConvertHeaderProfileUtilsObjToFolderArr = (arr: {
  [key: string]: {
    component: any;
    toolTipText: string;
  };
}):FolderArrType => {
  const newArr = map(arr, ({ component: customComponent, toolTipText }, id) => {
    return {
      title: toolTipText,
      iconName: '',
      id,
      property: { value: AdditionalFolderPropertyNames.CUSTOM_COMPONENT, customComponent },
      color: 'default'
    };
  });
  return newArr;
};
