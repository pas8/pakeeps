import { arrOfProfileUtilsIdOfAlwaysInSameColumn } from 'components/TransferListOfHeaderUtils';
import { keys, omit, pick } from 'lodash';

import { getHeaderProperties } from 'store/modules/App/selectors';
import { NamesArrOFOrderOfHeaderUtilsType } from 'store/modules/App/types';
import { ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType } from './../models/types';
import { useBreakpointNames } from './useBreakpointNames.hook';
import { useSetHeaderExclusionNames } from './useSetHeaderExclusionNames.hook';

export const useFindCorrectHeaderUtilsObj = (
  allHeaderButtonUtils: ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType
): ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType => {
  const { order } = useSelector(getHeaderProperties);
  const { isSiveIsXs } = useBreakpointNames();

  const exclusionNames = isSiveIsXs
    ? (keys(omit(allHeaderButtonUtils, arrOfProfileUtilsIdOfAlwaysInSameColumn[0])) as NamesArrOFOrderOfHeaderUtilsType)
    : order.exclusionNames;

  const headerProfileUtilsObj = omit(allHeaderButtonUtils, exclusionNames);
  const accountProfileUtilsArr = pick(allHeaderButtonUtils, exclusionNames);

  useSetHeaderExclusionNames(accountProfileUtilsArr);

  return headerProfileUtilsObj;
};
