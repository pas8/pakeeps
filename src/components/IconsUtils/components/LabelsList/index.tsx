import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import WrapperOfMenuOfLabelPart from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/MenuWrapper';
import DialogOfAddNewLabel from './components/DialogOfAddNewLabel';
import DefaultMenuListOflabelList from './components/DefaultMenuList';
import GlobalLabelListOflabelList from './components/GlobalLabelList';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { HandleChangeNewLabelType, LabelsListPropsType, MenuStateOfLabelsListType } from './types';
import { toChangeGlobalLabelItem, toDeleteLabelFromPakeep } from 'store/modules/App/actions';
import { ILabelElement } from 'store/modules/App/types';
import PakeepPropertyProvider from 'components/PakeepPropertyProviders';

const LabelsList: FC<LabelsListPropsType> = ({
  handleAddNewLabel,
  handleDeleteNewLabel,
  handleStatusOfHideLabelView,
  isLabelViewHidden,
  pakeepId,
  isDefaultMenuListHidden = false,
  customColor,
  onMenuClose
}) => {
  const dispatch = useDispatch();
  const handleChangeGlobalLabelItem = (changedLabel: ILabelElement) => {
    dispatch(toChangeGlobalLabelItem({ changedLabel }));
  };

  const reversedCustomColor = useGetReversedCustomColor(customColor);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenAddNewLabelDialog = () => setIsDialogOpen(true);
  const handleCloseAddNewLabelDialog = () => setIsDialogOpen(false);

  const defaultMenuListArr = [
    {
      title: 'Add new labels',
      Icon: AddCircleOutlineOutlinedIcon,
      onClick: handleOpenAddNewLabelDialog
    },
    {
      title: isLabelViewHidden ? 'Show label view' : 'Hide label view',
      Icon: isLabelViewHidden ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon,
      onClick: handleStatusOfHideLabelView
    }
  ];

  const dialogOfAddNewLabelProps = {
    isDialogOpen,
    handleCloseAddNewLabelDialog,
    handleOpenAddNewLabelDialog,
    customColor: reversedCustomColor
  };

  const handleChangeNewLabel: HandleChangeNewLabelType = (isChecked, id) => {
    isChecked ? handleDeleteNewLabel(id) : handleAddNewLabel(id);
  };

  const nullityOfMenuState = {
    mouseX: 0,
    mouseY: 0,
    id: '',
    variant: '',
    labelIconName: '',
    title: '',
    color: ''
  };
  const [menuState, setMenuState] = useState<MenuStateOfLabelsListType>(nullityOfMenuState);

  const handleClose = () => setMenuState(nullityOfMenuState);
  const handleDeleteLabel = () => {
    dispatch(toDeleteLabelFromPakeep({ currentPakeepId: pakeepId, labelIdWhichShouldBeDeleted: menuState.id }));
    handleClose();
  };
  const arrowButtonFunc = () => onMenuClose();

  const globalLabelListProps = { handleChangeNewLabel, setMenuState, customColor };

  const wrapperOfMenuOfLabelPartProps = {
    handleClose,
    handleDeleteLabel,
    menuState,
    handleChangeGlobalLabelItem,
    setMenuState,
    customColor: reversedCustomColor,
    isThisMenuIsSecond: true
  };

  const defaultMenuListOflabelListProps = { defaultMenuListArr, customColor, arrowButtonFunc };
  return (
    <PakeepPropertyProvider.Consumer>
      {({ labels }) => (
        <Grid style={{ background:!customColor.isUseDefault ?  customColor.bgHover : '' }}>
          {!isDefaultMenuListHidden && <DefaultMenuListOflabelList {...defaultMenuListOflabelListProps} />}
          <GlobalLabelListOflabelList {...globalLabelListProps} selectedLabels={labels} />

          {/* <WrapperOfMenuOfLabelPart {...wrapperOfMenuOfLabelPartProps} /> */}
          <DialogOfAddNewLabel {...dialogOfAddNewLabelProps} />
        </Grid>
      )}
    </PakeepPropertyProvider.Consumer>
  );
};

export default LabelsList;
