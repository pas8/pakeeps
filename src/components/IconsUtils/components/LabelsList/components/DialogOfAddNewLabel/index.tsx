import { ChangeEvent, FC, useEffect, useState } from 'react';
import { usePrevious, useToggle } from 'react-use';
import { useDispatch } from 'react-redux';
import includes from 'lodash.includes';
import { nanoid } from 'nanoid';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';
import { Dialog, DialogActions, DialogTitle, makeStyles, Box, useTheme, Grid } from '@material-ui/core';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';

import { toAddNewGlobalLabel } from 'store/modules/App/actions';
import { ColorType, IconNameType, LabelVariantType } from 'store/modules/App/types';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import ActionsButtonGroup from 'components/ActionsButtonGroup/index';
import { iconsArr } from 'components/Icons';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import { DialogOfAddingNewGlobalEventPropsType } from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/DialogOfAddingNewGlobalEvent/types';
import ColorPickerByPas from 'components/ColorChanger';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import LabelItem from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/LabelItem';
import PreparedIconSelectingList from 'components/PreparedIconSelectingList';
import SteperOfDialogOfAddNewLabel from './components/Steper';
import FirstStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/First';
import SecondStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Second';
import ThirdStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Third';
import FourthStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Fourth';
import {
  HandleAddNewGlobalLabelType,
  NewLabelStateType,
  OnChangeOfLabelColorRadioType,
  UseStylesOfDialogOfAddNewLabelProps
} from './types';
import { DefaultMenuLayoutElementPropsType } from 'layouts/DialogsLayout/types';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({ customColor }: UseStylesOfDialogOfAddNewLabelProps) => ({
    '& .MuiDialog-paper': {
      background: customColor?.isUseDefault ? '' : customColor?.bgUnHover,

      '& .MuiDialogTitle-root, .MuiStepper-root,.MuiDialogActions-root': {
        background: customColor?.isUseDefault ? '' : customColor?.bgUnHover,
        color: customColor?.isUseDefault ? palette.text.primary : customColor?.hover
      },
      '& .MuiStepper-root': {
        padding: spacing(0.4, 2.8)
      }
    }
  })
}));

const DialogOfAddNewLabel: FC<DefaultMenuLayoutElementPropsType> = ({ onClose, customColor }) => {
  const dispatch = useDispatch();
  const {
    palette: { primary, text }
  } = useTheme();
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

  const [isDialogOpen, setIsDialogOpen] = useToggle(true);
  const [isAwaited, setAwaitedStatus] = useToggle(false);

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
    setIsDialogOpen(true);
    closeSnackbar();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    toNullityNewLabelState();
    !isEqual(nullityOfNewLabelState, newLabelState) &&
      enqueueSnackbar({
        message: 'Dialog of creating label was closed',
        severity: 'warning',
        buttonText: 'Restore',
        onClick: handleRestoreLastGlobalLabel,
        icon: RestoreOutlinedIcon
      });

    setTimeout(() => {
      setAwaitedStatus(false);
      setAwaitedStatus(true);
    }, 4000);
  };

  useEffect(() => {
    if (!isDialogOpen && isAwaited) {
      setIsDialogOpen(true);
      onClose();
    }
  }, [isDialogOpen, isAwaited]);

  const handleSave = () => {
    if (!newLabelState.title)
      return enqueueSnackbar({ message: 'Label should have more than 1 letter', severity: 'error' });

    try {
      handleAddNewGlobalLabel(newLabelState);
      enqueueSnackbar({ message: 'Global label was successfully added' });
      onClose();
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
        customColumnElementProps: { onClick: handleChangeLabelIconName, selectedIconName: newLabelState.iconName },
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
    colorOfSaveButton: reverserCustomColor?.isUseDefault ? primary.main : reverserCustomColor?.secondaryColor,
    onClose: handleCloseDialog,
    colorOfCloseButton: reverserCustomColor?.isUseDefault ? text.hint : customColor?.unHover
  };

  const { isSiveIsXs } = useBreakpointNames();

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} className={classes.container} fullScreen={isSiveIsXs}>
      <DialogTitle>Add new global label</DialogTitle>
      <SteperOfDialogOfAddNewLabel {...steperOfDialogOfAddNewLabelProps} />
      <DialogActions  style={{position:isSiveIsXs ? 'absolute' : 'relative',bottom:0}}>

        <Grid container alignItems={'flex-end'} justify={isSiveIsXs ? 'flex-end' : 'space-between'}>
          <Box
            ml={1.4}
            mb={isSiveIsXs ? 1 : 0}
            display={'flex'}
            minWidth={216}
            justifyContent={isSiveIsXs ? 'flex-end' : 'flex-start'}
          >
            {
              //@ts-ignore
              <LabelItem {...labelItemProps} />
            }
          </Box>

          <Grid container>
            <ActionsButtonGroup {...actionsButtonGroupProps} />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfAddNewLabel;
