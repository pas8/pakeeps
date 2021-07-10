import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'lodash';
import { Grid, makeStyles } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {
  toChangeGlobalLabelListTemproparyData,
} from 'store/modules/App/actions';
import { getGlobalLabelListTemproparyData } from 'store/modules/App/selectors';
import DialogOfAddNewLabel from './components/DialogOfAddNewLabel';
import DefaultMenuListOflabelList from './components/DefaultMenuList';
import GlobalLabelListOflabelList from './components/GlobalLabelList';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { HandleChangeNewLabelType, LabelsListPropsType } from './types';

const useStyles = makeStyles(({ spacing, palette: { secondary }, shape: { borderRadius } }) => {
  return {
    container: ({ backgroundColor }: any) => ({ backgroundColor, borderRadius })
  };
});

const LabelsList: FC<LabelsListPropsType> = ({
  labels,
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

  useEffect(() => {
    dispatch(toChangeGlobalLabelListTemproparyData({ globalLabelList: labels }));
  }, []);

  const selectedLabels = useSelector(getGlobalLabelListTemproparyData);


  const reversedCustomColor = useGetReversedCustomColor(customColor);
  const classes = useStyles({ backgroundColor: reversedCustomColor.isUseDefault ? '' : reversedCustomColor.bgHover });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenAddNewLabelDialog = () => setIsDialogOpen(true);
  const handleCloseAddNewLabelDialog = () => setIsDialogOpen(false);

  const defaultMenuListArr = [
    {
      title: 'Add new labels',
      Icon: AddCircleOutlineOutlinedIcon,
      onClick: handleOpenAddNewLabelDialog!
    },
    {
      title: isLabelViewHidden ? 'Show label view' : 'Hide label view',
      Icon: isLabelViewHidden ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon,
      onClick: handleStatusOfHideLabelView!
    }
  ];

  const dialogOfAddNewLabelProps = {
    isDialogOpen,
    handleCloseAddNewLabelDialog,
    handleOpenAddNewLabelDialog,
    customColor
  };
  const handleChangeNewLabel: HandleChangeNewLabelType = (isChecked, id) => {
    if (isChecked) {
      dispatch(
        toChangeGlobalLabelListTemproparyData({
          globalLabelList: filter(selectedLabels, idWhichShouldBeDeleted => id !== idWhichShouldBeDeleted)
        })
      );

      return handleDeleteNewLabel(id);
    }
    dispatch(
      toChangeGlobalLabelListTemproparyData({
        globalLabelList: [...selectedLabels, id]
      })
    );
    return handleAddNewLabel(id);
  };
  const arrowButtonFunc = () => {
    onMenuClose();
  };

  const globalLabelListProps = { handleChangeNewLabel, customColor: reversedCustomColor, selectedLabels };

  const defaultMenuListOflabelListProps = { defaultMenuListArr, customColor: reversedCustomColor, arrowButtonFunc };
  return (
    <Grid className={classes.container}>
      {!isDefaultMenuListHidden && <DefaultMenuListOflabelList {...defaultMenuListOflabelListProps} />}
      <GlobalLabelListOflabelList {...globalLabelListProps} />

      <DialogOfAddNewLabel {...dialogOfAddNewLabelProps} />
    </Grid>
  );
};

export default LabelsList;
