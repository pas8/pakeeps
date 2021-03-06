import { map } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toChangeHeaderOrder, toChangeTemporaryData } from 'store/modules/App/actions';
import { NotifinationArrType } from 'store/modules/App/types';
import { ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType } from './../models/types';
import { useBreakpointNames } from './useBreakpointNames.hook';

export const useSetHeaderExclusionNames = (
  accountProfileUtilsObj: ParamsOfUseConvertHeaderProfileUtilsObjToFolderArrType
) => {
  const dispatch = useDispatch();

  const menuAccountUtilsArr: NotifinationArrType = map(
    accountProfileUtilsObj,
    ({ component: customIconComponent, toolTipText: text, ...props }, id) => ({
      ...props,
      id,
      customIconComponent,
      text
    })
  );

  useEffect(() => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { menuAccountUtilsArr } }));
  }, [menuAccountUtilsArr]);
};
