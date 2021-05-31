import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import MenuOfLabelPart from '../Menu';

const WrapperOfMenuOfLabelPart = ({
  handleClose,
  handleDeleteLabel,
  menuState,
  changeGloabalLabelItemFunc,
  setMenuState,
  isThisMenuIsSecond
}) => {
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
      changeGloabalLabelItemFunc(newLabel);
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
    buttonSaveState: true
  };

  return <MenuOfLabelPart {...menuOfLabelPartProps} />;
};

WrapperOfMenuOfLabelPart.propTypes = {
  changeGloabalLabelItemFunc: PropTypes.func,
  handleClose: PropTypes.func,
  handleDeleteLabel: PropTypes.func,
  isThisMenuIsSecond: PropTypes.bool,
  menuState: PropTypes.object,
  setMenuState: PropTypes.func
};

export default WrapperOfMenuOfLabelPart;
