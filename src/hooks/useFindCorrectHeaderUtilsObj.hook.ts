import { omit, pick } from 'lodash';
import { useSelector } from 'react-redux';
import { getHeaderProperties } from 'store/modules/App/selectors';
import { ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType } from './../models/types';
import { useSetHeaderExclusionNames } from './useSetHeaderExclusionNames.hook';

export const useFindCorrectHeaderUtilsObj = (
  allHeaderButtonUtils: ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType
): ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType => {
  const { order } = useSelector(getHeaderProperties);

  const headerProfileUtilsObj = omit(allHeaderButtonUtils, order.exclusionNames);
  const accountProfileUtilsArr = pick(allHeaderButtonUtils, order.exclusionNames);

  useSetHeaderExclusionNames(accountProfileUtilsArr);

  return headerProfileUtilsObj;
};
