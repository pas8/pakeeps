import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import MenuOfLabelPart from '../Menu';

const WrapperOfMenuOfLabelPart = ({ handleClose, handleDeleteLabel, menuState, changeLabelItemFunc, setMenuState }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChangeLabelColor = color => setMenuState(state => ({ ...state, color }));
  const handleChangeLabelTitle = ({ target: { value: title } }) => setMenuState(state => ({ ...state, title }));
  const handleChangeLabelIconName = labelIconName => setMenuState(state => ({ ...state, labelIconName }));
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
      changeLabelItemFunc(newLabel);
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
    buttonSaveState: true
  };

  return <MenuOfLabelPart {...menuOfLabelPartProps} />;
};

WrapperOfMenuOfLabelPart.propTypes = {
  changeLabelItemFunc: PropTypes.func,
  handleClose: PropTypes.func,
  handleDeleteLabel: PropTypes.func,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func
};

export default WrapperOfMenuOfLabelPart;
