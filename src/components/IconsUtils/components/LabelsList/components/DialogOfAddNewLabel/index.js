import PropTypes from 'prop-types';
import { useState } from 'react';
import { usePrevious } from 'react-use';
import { connect } from 'react-redux';
import includes from 'lodash.includes';
import { nanoid } from 'nanoid';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import { Dialog, DialogActions, DialogTitle, Button, makeStyles } from '@material-ui/core';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { handleAddNewGlobalLabelThunk } from 'store/modules/App/operations';
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
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useMix } from 'hooks/useMix.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({ customColor }) => ({
    '& .MuiDialog-paper': {
      // background: customColor && !useIsColorDark( customColor?.bgUnHover) ?grey[50] :  customColor?.bgUnHover,

      '& .MuiDialogTitle-root, .MuiStepper-root,.MuiDialogActions-root': {
        background: customColor && customColor?.bgUnHover,
        color: customColor?.hover
      },
      '& .MuiStepper-root': {
        padding: spacing(0.4, 2.8)
      }
    }
  }),

  closeButton: ({ customColor }) => {
    const color = !customColor ? palette?.mediumEmphasis?.main : customColor.unHover;
    return {
      color,
      '&:hover': {
        background: useAlpha(color)
      }
    };
  },

  saveButton: ({ reverserCustomColor:customColor }) => {
    const customMixedColor =  customColor?.secondaryColor
    return {
      color:customColor  &&  customMixedColor,
      '&:hover': {
        background:customColor &&  useAlpha(customMixedColor)
      }
    };
  }
}));

const DialogOfAddNewLabel = ({
  isDialogOpen,
  handleCloseAddNewLabelDialog,
  handleAddNewGlobalLabelThunk,
  handleOpenAddNewLabelDialog,
  customColor
}) => {
  const reverserCustomColor = useGetReversedCustomColor(customColor);
  const classes = useStyles({ customColor,reverserCustomColor  });


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const labelVariants = ['outlined', 'default'];
  const iconNameVariants = ['', 'favorite'];

  const nullityOfNewLabelState = {
    title: '',
    variant: labelVariants[0],
    id: nanoid(),
    color: '',
    iconName: ''
  };
  const [newLabelState, setNewLabelState] = useState(nullityOfNewLabelState);

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
      handleAddNewGlobalLabelThunk(newLabelState);
      enqueueSnackbar({ message: 'Global label was successfully added' });
      handleCloseAddNewLabelDialog();
      toNullityNewLabelState();
    } catch (error) {
      enqueueSnackbar({ message: 'Something went wrong', severity: 'error' });
    }
  };

  const onChangeOfLabelTitleInput = ({ target: { value } }) => setNewLabelState(state => ({ ...state, title: value }));
  const onChangeOfLabelVariantSwitch = () => {
    setNewLabelState(state => ({ ...state, variant: isLabelOutlined ? labelVariants[1] : labelVariants[0] }));
  };
  const onChangeOfLabelColorRadio = ({ target: { value } }) => setNewLabelState(state => ({ ...state, color: value }));
  const onChangeOfLabelIconNameSwitch = () => {
    setNewLabelState(state => ({ ...state, iconName: isLabelHaveIcon ? iconNameVariants[1] : iconNameVariants[0] }));
  };

  const handleChangeLabelIconName = iconName => setNewLabelState(state => ({ ...state, iconName }));
  const handleChangeLabelColor = color => setNewLabelState(state => ({ ...state, color }));
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
    parentBackgrounColor:customColor?.bgHover,
    labelChipProps: previewLabelProps,
    aplyMargin: false,
    customColor
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} className={classes.container}>
      <DialogTitle>Add new global label</DialogTitle>
      <SteperOfDialogOfAddNewLabel {...steperOfDialogOfAddNewLabelProps} />
      <DialogActions>
        <LabelItem {...labelItemProps} />
        <Button onClick={handleCloseDialog}  className={classes.closeButton}>
          Close
        </Button>

        <Button onClick={handleSave} color={'primary'} startIcon={<SaveRoundedIcon />} className={classes.saveButton}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogOfAddNewLabel.propTypes = {
  handleAddNewGlobalLabelThunk: PropTypes.func,
  handleCloseAddNewLabelDialog: PropTypes.func,
  handleOpenAddNewLabelDialog: PropTypes.func,
  isDialogOpen: PropTypes.bool
};

const mapDispatchToProps = dispatch => ({
  handleAddNewGlobalLabelThunk: newLabel => dispatch(handleAddNewGlobalLabelThunk(newLabel))
});

export default connect(null, mapDispatchToProps)(DialogOfAddNewLabel);
