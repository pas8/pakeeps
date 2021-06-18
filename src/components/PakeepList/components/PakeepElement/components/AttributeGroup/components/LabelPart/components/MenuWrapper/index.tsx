import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { FC } from 'react';
import MenuOfLabelPart from '../Menu';
import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  HandleChangeLabelTitleType,
  WrapperOfMenuOfLabelPartPropsType
} from './types';

const WrapperOfMenuOfLabelPart: FC<WrapperOfMenuOfLabelPartPropsType> = ({
  handleClose,
  handleDeleteLabel,
  menuState,
  handleChangeGlobalLabelItem,
  setMenuState,
  isThisMenuIsSecond,
  customColor
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChangeLabelColor: HandleChangeLabelColorType = color => setMenuState(state => ({ ...state, color }));

  const handleChangeLabelTitle: HandleChangeLabelTitleType = ({ target: { value: title } }) => {
    setMenuState(state => ({ ...state, title }));
  };

  const handleChangeLabelIconName: HandleChangeLabelIconNameType = labelIconName => {
    setMenuState(state => ({ ...state, labelIconName }));
  };

  const handleChangeLabelVariant = () => {
    const variant = menuState.variant === 'default' ? 'outlined' : 'default';
    setMenuState(state => ({ ...state, variant }));
  };

  const onClickOfSaveButton = () => {
    const newLabel = {
      id: menuState.id,
      iconName: menuState.labelIconName,
      title: menuState.title,
      color: menuState.color,
      variant: menuState.variant
    };
    try {
      handleChangeGlobalLabelItem(newLabel);
      enqueueSnackbar({ message: 'Label was successfully chnged' });
    } catch (error) {
      enqueueSnackbar({ message: !error ? 'Something went wrong ' : error, severity: 'error' });
    }
  };

  const menuOfLabelPartProps = {
    menuState,
    handleDeleteLabel,
    handleClose,
    handleChangeLabelColor,
    handleChangeLabelVariant,
    handleChangeLabelIconName,
    handleChangeLabelTitle,
    onClickOfSaveButton,
    isThisMenuIsSecond,
    buttonSaveState: true,
    customColor
  };

  return <MenuOfLabelPart {...menuOfLabelPartProps} />;
};

export default WrapperOfMenuOfLabelPart;
