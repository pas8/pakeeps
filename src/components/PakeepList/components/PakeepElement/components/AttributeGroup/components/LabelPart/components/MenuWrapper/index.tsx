import { useFindLabelItem } from 'hooks/useFindLabelItem.hook';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeGlobalLabelItem } from 'store/modules/App/actions';
import { getTemporaryDataOfLabelItem } from 'store/modules/App/selectors';
import { ILabelElement } from 'store/modules/App/types';
import MenuOfLabelPart from '../Menu';
import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  HandleChangeLabelTitleType,
  MenuStateOfChangingLabelMenuType,
  WrapperOfMenuOfLabelPartPropsType
} from './types';

const WrapperOfMenuOfLabelPart: FC<WrapperOfMenuOfLabelPartPropsType> = ({ mouseX, mouseY, customColor }) => {
  const dispatch = useDispatch();

  const { id } = useSelector(getTemporaryDataOfLabelItem);
  const findedLabel = useFindLabelItem(id);

  const handleChangeGlobalLabelItem = (changedLabel: ILabelElement) => {
    dispatch(toChangeGlobalLabelItem({ changedLabel }));
  };

  const nullityOfMenuState = {
    iconName: '',
    color: '',
    variant: 'default' as 'default',
    title: '',
    mouseX: 0,
    mouseY: 0,
    id: ''
  };

  const [menuState, setMenuState] = useState<MenuStateOfChangingLabelMenuType>(nullityOfMenuState);

  useEffect(() => {
    setMenuState(state => ({ ...state, mouseX, mouseY, ...findedLabel }));
  }, [mouseX, mouseY, findedLabel]);


  const handleClose = () => setMenuState(nullityOfMenuState);

  const handleDeleteLabel = () => {
    // handleDeleteLabelFromPakeepFunc(pakeepId, menuState.id);
    console.log('should be dleted');
    handleClose();
  };

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
      iconName: menuState.iconName,
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
    isThisMenuIsSecond: true,
    buttonSaveState: true,
    customColor
  };

  return <MenuOfLabelPart {...menuOfLabelPartProps} />;
};

export default WrapperOfMenuOfLabelPart;
