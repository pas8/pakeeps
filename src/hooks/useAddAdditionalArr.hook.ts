import { FolderArrType } from 'store/modules/App/types';

export const useAddAdditionalArr = (arr: FolderArrType): FolderArrType => {
  return arr.map(el => {
    //@ts-ignore
    const additionalArr = drop(settingUrls[el.id]?.map((route, title) => ({ route, title })));
    return { ...el, property: { ...el.property, additionalArr } };
  });
};
