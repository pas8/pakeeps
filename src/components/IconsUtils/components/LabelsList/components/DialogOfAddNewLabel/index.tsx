import PropTypes from 'prop-types';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { usePrevious } from 'react-use';
import { connect, useDispatch } from 'react-redux';
import includes from 'lodash.includes';
import { nanoid } from 'nanoid';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import { Dialog, DialogActions, DialogTitle, Button, makeStyles } from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { toAddNewGlobalLabel } from 'store/modules/App/actions';
import { ColorType, IconNameType, LabelVariantType } from 'store/modules/App/types';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import ActionsButtonGroup from 'components/ActionsButtonGroup/index';
import { iconsArr } from 'components/Icons';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import ColorPickerByPas from 'components/ColorChanger';
import LabelItem from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/LabelItem';
import PreparedIconSelectingList from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/PreparedIconSelectingList';
import SteperOfDialogOfAddNewLabel from './components/Steper';
import FirstStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/First';
import SecondStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Second';
import ThirdStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Third';
import FourthStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Fourth';
import {
  DialogOfAddNewLabelPropsType,
  HandleAddNewGlobalLabelType,
  NewLabelStateType,
  OnChangeOfLabelColorRadioType,
  UseStylesOfDialogOfAddNewLabelProps
} from './types';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({ customColor }: UseStylesOfDialogOfAddNewLabelProps) => ({
    '& .MuiDialog-paper': {
      // background: customColor && !useIsColorDark( customColor?.bgUnHover) ?grey[50] :  customColor?.bgUnHover,

      '& .MuiDialogTitle-root, .MuiStepper-root,.MuiDialogActions-root': {
        background: customColor?.isUseDefault ? '' : customColor?.bgUnHover,
        color: customColor?.hover
      },
      '& .MuiStepper-root': {
        padding: spacing(0.4, 2.8)
      }
    }
  })
}));

const DialogOfAddNewLabel: FC<DialogOfAddNewLabelPropsType> = ({
  isDialogOpen,
  handleCloseAddNewLabelDialog,
  handleOpenAddNewLabelDialog,
  customColor
}) => {
  const dispatch = useDispatch();

  const handleAddNewGlobalLabel: HandleAddNewGlobalLabelType = newLabel => {
    dispatch(toAddNewGlobalLabel({ newLabel }));
  };

  const reverserCustomColor = useGetReversedCustomColor(customColor);
  const classes = useStyles({ customColor });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const labelVariants: LabelVariantType[] = ['outlined', 'default'];
  const iconNameVariants = ['', 'favorite'];

  const nullityOfNewLabelState: NewLabelStateType = {
    title: '',
    variant: labelVariants[0],
    id: nanoid(),
    color: '',
    iconName: ''
  };

  const [newLabelState, setNewLabelState] = useState<NewLabelStateType>(nullityOfNewLabelState);

  const colorVariantsNames = ['', 'primary', 'secondary'];
  const customColorValue = includes(colorVariantsNames, newLabelState.color) ? 'customColor' : newLabelState.color;

  const colorVariants = [
    { labelText: 'Default color', value: colorVariantsNames[0] },
    { labelText: 'Primary color', value: colorVariantsNames[1] },
    { labelText: 'Secondary color', value: colorVariantsNames[2] },
    { labelText: 'Custom color', value: customColorValue }
  ];

  const isLabelOutlined = newLabelState.variant === labelVariants[0];
  const isLabelHaveIcon = newLabelState.iconName === iconNameVariants[0];
  const previuosNewLabelState = usePrevious(newLabelState);

  const toNullityNewLabelState = () => setNewLabelState(nullityOfNewLabelState);

  const handleRestoreLastGlobalLabel = () => {
    if (!previuosNewLabelState) return;

    !isEqual(nullityOfNewLabelState, previuosNewLabelState) && setNewLabelState(previuosNewLabelState);
    handleOpenAddNewLabelDialog();
    closeSnackbar();
  };

  const handleCloseDialog = () => {
    handleCloseAddNewLabelDialog();
    toNullityNewLabelState();
    !isEqual(nullityOfNewLabelState, newLabelState) &&
      enqueueSnackbar({
        message: 'Dialog of creating label was closed',
        severity: 'warning',
        buttonText: 'Restore',
        onClick: handleRestoreLastGlobalLabel,
        icon: RestoreOutlinedIcon
      });
  };

  const handleSave = () => {
    if (!newLabelState.title)
      return enqueueSnackbar({ message: 'Label should have more than 1 letter', severity: 'error' });

    try {
      handleAddNewGlobalLabel(newLabelState);
      enqueueSnackbar({ message: 'Global label was successfully added' });
      handleCloseAddNewLabelDialog();
      toNullityNewLabelState();
    } catch (error) {
      enqueueSnackbar({ message: 'Something went wrong', severity: 'error' });
    }
  };

  const onChangeOfLabelTitleInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setNewLabelState(state => ({ ...state, title: value }));

  const onChangeOfLabelVariantSwitch = () => {
    const variant = isLabelOutlined ? labelVariants[1] : labelVariants[0];
    setNewLabelState(state => ({ ...state, variant }));
  };
  const onChangeOfLabelColorRadio: OnChangeOfLabelColorRadioType = ({ target: { value } }) =>
    setNewLabelState(state => ({ ...state, color: value }));

  const onChangeOfLabelIconNameSwitch = () => {
    setNewLabelState(state => ({ ...state, iconName: isLabelHaveIcon ? iconNameVariants[1] : iconNameVariants[0] }));
  };

  const handleChangeLabelIconName = (iconName: IconNameType) => setNewLabelState(state => ({ ...state, iconName }));
  const handleChangeLabelColor = (color: ColorType) => setNewLabelState(state => ({ ...state, color }));

  const stepsArrOfDialogOfAddNewLabel = [
    {
      title: 'Enter the title',
      Component: FirstStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: newLabelState.title, onChange: onChangeOfLabelTitleInput }
    },
    {
      title: 'Chose a variant',
      Component: SecondStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { checked: isLabelOutlined, onChange: onChangeOfLabelVariantSwitch }
    },
    {
      title: 'Chose a color',
      Component: ThirdStepOfSteperOfDialogOfAddNewLabel,
      componentProps: { value: newLabelState.color, onChange: onChangeOfLabelColorRadio, colorVariants },
      isAdditionalComponentHidden: newLabelState.color !== customColorValue,
      AdditionalComponent: ColorPickerByPas,
      additionalComponentProps: {
        handleSave: handleChangeLabelColor
      }
    },
    {
      title: 'Chose an icon',
      Component: FourthStepOfSteperOfDialogOfAddNewLabel,
      isAdditionalComponentHidden: isLabelHaveIcon,
      AdditionalComponent: PreparedColorExamples,
      additionalComponentProps: {
        isColor: false,
        customColumnElementProps: { handleChangeLabelIconName, labelIconName: newLabelState.iconName },
        CustomColumnElement: PreparedIconSelectingList,
        columnArr: iconsArr
      },
      componentProps: { checked: !isLabelHaveIcon, onChange: onChangeOfLabelIconNameSwitch }
    }
  ];

  const steperOfDialogOfAddNewLabelProps = {
    stepsArrOfDialogOfAddNewLabel,
    toNullityNewLabelState,
    customColor: reverserCustomColor
  };

  const previewLabelProps = {
    ...newLabelState,
    icon: useFindIcon(newLabelState.iconName),
    label: newLabelState.title,
    size: 'small'
  };
  const labelItemProps = {
    currentColor: newLabelState.color,
    handleOpen: null,
    parentBackgrounColor: customColor?.bgHover,
    labelChipProps: previewLabelProps,
    aplyMargin: false,
    customColor
  };

  const actionsButtonGroupProps = {
    onSave: handleSave,
    colorOfSaveButton: reverserCustomColor?.secondaryColor,
    onClose: handleCloseDialog,
    colorOfCloseButton: customColor?.unHover
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} className={classes.container}>
      <DialogTitle>Add new global label</DialogTitle>
      <SteperOfDialogOfAddNewLabel {...steperOfDialogOfAddNewLabelProps} />
      <DialogActions>
        {
          //@ts-ignore
          <LabelItem {...labelItemProps} />
        }
        <ActionsButtonGroup {...actionsButtonGroupProps} />
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfAddNewLabel;
