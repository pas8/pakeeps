import { IconsUtilsFunctionType } from 'components/IconsUtils/types';
import { pakeepPropertyiesNames } from 'models/denotation';
import { UsePakeepUtilsFuncType } from 'models/types';
import { useDispatch } from 'react-redux';
import {
  toChangePakeepCustomProperty,
  toChangePakeepProperty,
  toChangePinStatusOfPakeeps
} from 'store/modules/App/actions';
import { ColorType } from 'store/modules/App/types';

export const usePakeepUtilsFunc: UsePakeepUtilsFuncType = pakeepId => {
  const dispatch = useDispatch();

  const handleSetColorPakeep = (color: ColorType): void => {
    dispatch(toChangePakeepProperty({ pakeepId, property: { color } }));
  };

  const handleSetBackgroundColorPakeep = (backgroundColor: ColorType): void => {
    dispatch(toChangePakeepProperty({ pakeepId, property: { backgroundColor } }));
  };

  const handleSetBookmarkPakeep = (): void => {
    dispatch(toChangePakeepCustomProperty({ pakeepId, propertyName: pakeepPropertyiesNames.isInBookmark }));
  };

  const handleSetFavoritePakeep = (): void => {
    dispatch(toChangePakeepCustomProperty({ pakeepId, propertyName: pakeepPropertyiesNames.isFavorite }));
  };

  const handleSetArhivedPakeep = (): void => {
    dispatch(toChangePakeepCustomProperty({ pakeepId, propertyName: pakeepPropertyiesNames.isArchived }));
  };

  const handleSetIsPinnedPakeep = (): void => {
    dispatch(toChangePinStatusOfPakeeps({ pakeepId }));
  };

  return {
    handleSetColorPakeep,
    handleSetBackgroundColorPakeep,
    handleSetBookmarkPakeep,
    handleSetFavoritePakeep,
    handleSetArhivedPakeep,
    handleSetIsPinnedPakeep
  };
};
