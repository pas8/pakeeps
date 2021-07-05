import { FC } from 'react';
import TitleChangerOfLabel from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/TitleChangerOfLabel';
import { TitleChangerOfLabelPropsType } from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/TitleChangerOfLabel/type';

const FirstStepOfSteperOfDialogOfAddNewLabel: FC<TitleChangerOfLabelPropsType> = ({ value, onChange, customColor }) => {
  const textFieldProps = {
    value,
    customColor,
    onChange,
    color: 'secondary'
  };

  return <TitleChangerOfLabel {...textFieldProps} />;
};

export default FirstStepOfSteperOfDialogOfAddNewLabel;
