import { ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType } from './../models/types';
import { useFindCorrectHeaderUtilsObj } from './useFindCorrectHeaderUtilsObj.hook';
import { useTakeAllHeaderUtils } from './useTakeAllHeaderUtils.hook';

export const useTakeHeaderProfileUtilsObj = (): ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType => {
  const allHeaderButtonUtils = useTakeAllHeaderUtils();
  const headerProfileUtilsObj = useFindCorrectHeaderUtilsObj(allHeaderButtonUtils);

  return headerProfileUtilsObj;
};
