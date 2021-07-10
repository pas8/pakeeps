import { useFindLabelItem } from 'hooks/useFindLabelItem.hook';
import { DEFAULT, OUTLINED } from 'models/denotation';
import { useSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toChangeGlobalLabelItem, toDeleteGlobalLabel } from 'store/modules/App/actions';
import { ILabelElement } from 'store/modules/App/types';
import MenuOfLabelPart from '../Menu';
import {
  HandleChangeLabelColorType,
  HandleChangeLabelIconNameType,
  HandleChangeLabelTitleType,
  MenuStateOfChangingLabelMenuType,
  WrapperOfMenuOfLabelPartPropsType
} from './types';

const WrapperOfMenuOfLabelPart: FC<WrapperOfMenuOfLabelPartPropsType> = ({
  mouseX,
  mouseY,
  customColor,
  id,
  onClose
}) => {
  const dispatch = useDispatch();

  const findedLabel = useFindLabelItem(id);

  const handleChangeGlobalLabelItem = (changedLabel: ILabelElement) => {
    dispatch(toChangeGlobalLabelItem({ changedLabel }));
  };

  const nullityOfMenuState = {
    iconName: '',
    color: '',
    variant: DEFAULT,
    title: '',
    mouseX: 0,
    mouseY: 0,
    id: ''
  } as const;

  const [menuState, setMenuState] = useState<MenuStateOfChangingLabelMenuType>(nullityOfMenuState);

  const { mouseX: placeholderX, mouseY: placeholderY, ...newLabel } = menuState;

  useEffect(() => {
    setMenuState(state => ({ ...state, mouseX, mouseY, ...findedLabel }));
  }, [mouseX, mouseY, findedLabel]);

  const handleClose = () => {
    onClose();
    setMenuState(nullityOfMenuState);
  };

  const handleDeleteLabel = () => {
    dispatch(toDeleteGlobalLabel({ labelId: menuState.id }));
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
    const variant = menuState.variant === DEFAULT ? OUTLINED : DEFAULT;
    setMenuState(state => ({ ...state, variant }));
  };

  const onClickOfSaveButton = () => {
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
