import { FC } from 'react';
import TitleChangerOfLabel from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/TitleChangerOfLabel';
import { TitleChangerOfLabelPropsType } from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/TitleChangerOfLabel/type';
import { SECONDARY } from 'models/denotation';

const FirstStepOfSteperOfDialogOfAddNewLabel: FC<TitleChangerOfLabelPropsType> = ({ value, onChange, customColor }) => {
  const textFieldProps = {
    value,
    customColor,
    onChange,
    placeholder: 'Title',
    color: SECONDARY
  };

  return <TitleChangerOfLabel {...textFieldProps} />;
};

export default FirstStepOfSteperOfDialogOfAddNewLabel;
