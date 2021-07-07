import { Dispatch, SetStateAction } from 'react';
import { CheckBoxesArrtype } from 'store/modules/App/types';

export type CheckBoxItemPropsType = {
  checkBoxesArr: CheckBoxesArrtype;
  isAccomplishedCheckBoxesHidden: boolean;
  handleAccomplishedCheckBoxesHiddenStatus: () => void;
  setCheckBoxes: Dispatch<SetStateAction<any>>;
};
