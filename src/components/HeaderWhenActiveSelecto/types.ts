import { SelectedPakeepsIdType, SelectedPakeepsType } from 'models/types';
import { VariantsOfropertiesToUtils } from 'models/unums';
import { PakeepsType } from 'store/modules/App/types';

export type HeaderWhenActiveSelectoPropsType = {
  selectedPakeeps: SelectedPakeepsType;
  selectedPakeepsId: SelectedPakeepsIdType;
};
export type IconUtilsFuncNameType = string;
export type PropertyValueType = keyof typeof VariantsOfropertiesToUtils | 'isPinned';

export type PakeepPropertyiesType = {
  [key: string]: {
    func?: Function;
    funcName: IconUtilsFuncNameType;
    propertyValue: PropertyValueType;
    isShouldBeClosed?: boolean;
  };
};

export type HandleSelectedPakeepsPropertyFuncType = (newPakeeps: PakeepsType) => void;
