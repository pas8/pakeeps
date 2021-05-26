import PropTypes from "prop-types";
import { Dialog, makeStyles, DialogActions, DialogTitle, Button, Grid, Chip } from '@material-ui/core';
import { themeColors } from 'components/theme';
import { useState } from 'react';
import { connect } from 'react-redux';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { handleAddNewGlobalLabelThunk } from 'store/modules/App/operations';
import SteperOfDialogOfAddNewLabel from './components/Steper';
import FirstStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/First';
import SecondStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Second';
import ThirdStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Third';
import { nanoid } from 'nanoid';
import FourthStepOfSteperOfDialogOfAddNewLabel from './components/Steper/components/Fourth';
import PreparedIconSelectingList from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/Menu/components/PreparedIconSelectingList';
import { iconsArr } from 'components/Icons';
import PreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples';
import ColorPickerByPas from 'components/ColorChanger';
import includes from 'lodash.includes';
import LabelItem from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/LabelItem';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import { useSnackbar } from 'notistack';
import { isEqual } from 'lodash';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { usePrevious } from 'react-use';

const DialogOfAddNewLabel = ({ isDialogOpen, handleCloseAddNewLabelDialog, handleAddNewGlobalLabelThunk ,handleOpenAddNewLabelDialog}) => {
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

const toNullityNewLabelState = () => setNewLabelState(nullityOfNewLabelState)

  const handleRestoreLastGlobalLabel = () =>{
    !isEqual(nullityOfNewLabelState, previuosNewLabelState) && setNewLabelState(previuosNewLabelState);
    handleOpenAddNewLabelDialog()
    closeSnackbar()
  }

  const handleCloseDialog = () => {
    handleCloseAddNewLabelDialog();
    toNullityNewLabelState()
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
    if(!newLabelState.title) return enqueueSnackbar({ message: 'Label should have more than 1 letter', severity: 'error' });

    try {
      handleAddNewGlobalLabelThunk(newLabelState);
      enqueueSnackbar({ message: 'Global label was successfully added' });
      handleCloseAddNewLabelDialog();
      toNullityNewLabelState()
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

  const steperOfDialogOfAddNewLabelProps = { stepsArrOfDialogOfAddNewLabel,toNullityNewLabelState };

  const previewLabelProps = {
    ...newLabelState,
    icon: useFindIcon(newLabelState.iconName),
    label: newLabelState.title,
    size: 'small'
  };
  const labelItemProps = { currentColor: newLabelState.color, handleOpen: null, labelChipProps: previewLabelProps };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Add new global label</DialogTitle>
      <SteperOfDialogOfAddNewLabel {...steperOfDialogOfAddNewLabelProps} />
      <DialogActions>
        <LabelItem {...labelItemProps} />
        <Button onClick={handleCloseDialog} style={{ color: themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal }}>
          Close
        </Button>

        <Button onClick={handleSave} color={'primary'} startIcon={<SaveRoundedIcon />}>
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
}

const mapDispatchToProps = dispatch => ({
  handleAddNewGlobalLabelThunk: newLabel => dispatch(handleAddNewGlobalLabelThunk(newLabel))
});

export default connect(null, mapDispatchToProps)(DialogOfAddNewLabel);
