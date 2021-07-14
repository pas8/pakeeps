import { settingUrls } from 'layouts/RouterLayout/denotation';
import { drop, map } from 'lodash';
import { FolderArrType } from 'store/modules/App/types';

export const useAddAdditionalArr = (arr: FolderArrType): FolderArrType => {
  const newArr = arr.map(el => {
    //@ts-ignore
    const additionalArr = drop(map(settingUrls[el.id], (route, title) => ({ route, title })));
    return { ...el, property: { ...el.property, additionalArr } };
  });
  return newArr;
};
