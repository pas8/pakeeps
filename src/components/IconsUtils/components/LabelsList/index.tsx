import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { filter } from 'lodash';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {
  toChangeDefaultLayoutDialogProps,
  toChangeGlobalLabelListTemproparyData,
  toChangeTemporaryData
} from 'store/modules/App/actions';
import { getGlobalLabelListTemproparyData } from 'store/modules/App/selectors';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { HandleChangeNewLabelType, LabelsListPropsType } from './types';
import { DialogLayoutName } from 'models/unums';

const DefaultMenuListOflabelList = dynamic(() => import('./components/DefaultMenuList'));

const GlobalLabelListOflabelList = dynamic(() => import('./components/GlobalLabelList'), {
  loading: () => (
    <Grid style={{ width: 200, height: 400 }} container justify={'center'} alignItems={'center'}>
      <CircularProgress />
    </Grid>
  )
});

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
  pakeepId: id,
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

  const handleOpenAddNewLabelDialog = () => {
    dispatch(
      toChangeDefaultLayoutDialogProps({
        props: {
          id,
          name: DialogLayoutName.LABELS,
          customColor
        }
      })
    );
  };

  const defaultMenuListArr = [
    {
      title: 'Add new global label',
      Icon: AddCircleOutlineOutlinedIcon,
      onClick: handleOpenAddNewLabelDialog!
    },
    {
      title: isLabelViewHidden ? 'Show label view' : 'Hide label view',
      Icon: isLabelViewHidden ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon,
      onClick: handleStatusOfHideLabelView!
    }
  ];

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
    </Grid>
  );
};

export default LabelsList;
