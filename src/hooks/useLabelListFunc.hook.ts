import { HandleDeleteNewLabelType } from 'components/IconsUtils/components/LabelsList/types';
import { HandleAddNewLabelType, UseLabelListFuncType } from 'models/types';
import { useDispatch } from 'react-redux';
import { toAddLabelToPakeep, toDeleteLabelFromPakeep } from 'store/modules/App/actions';
import { LabelIdType } from 'store/modules/App/types';

export const useLabelListFunc:UseLabelListFuncType = id => {
  const dispatch = useDispatch();

  const handleDeleteNewLabel:HandleDeleteNewLabelType = (labelIdWhichShouldBeDeleted: LabelIdType): void => {
    dispatch(toDeleteLabelFromPakeep({ currentPakeepId: id, labelIdWhichShouldBeDeleted }));
  };

  const handleAddNewLabel:HandleAddNewLabelType = (labelIdWhichShouldBeAdded) => {
    dispatch(toAddLabelToPakeep({ currentPakeepId: id, labelIdWhichShouldBeAdded }));
  };

  return {
    handleAddNewLabel,
    handleDeleteNewLabel
  };
};
