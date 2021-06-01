import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, makeStyles, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { getLabels } from 'store/modules/App/selectors';
import { changeLabelItemThunk } from 'store/modules/App/operations';
import WrapperOfMenuOfLabelPart from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/LabelPart/components/MenuWrapper';
import DialogOfAddNewLabel from './components/DialogOfAddNewLabel';
import DefaultMenuListOflabelList from './components/DefaultMenuList';
import GlobalLabelListOflabelList from './components/GlobalLabelList';
import { SelectedLabels } from 'components/NewPakeep';

const LabelsList = ({
  handleAddNewLabel,
  handleDeleteNewLabel,
  handleDeleteLabelFromPakeepFunc,
  globalLabels,
  handleStatusOfHideLabelView,
  isLabelViewHidden,
  changeLabelItemThunk,
  isDefaultMenuListHidden = false,
  customColor
}) => {
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

  const dialogOfAddNewLabelProps = { isDialogOpen, handleCloseAddNewLabelDialog, handleOpenAddNewLabelDialog };

  const handleChangeNewLabel = (isChecked, id) => {
    isChecked ? handleDeleteNewLabel(id) : handleAddNewLabel(id);
  };

  const nullityOfMenuState = {
    mouseX: null,
    mouseY: null,
    id: '',
    variant: '',
    labelIconName: '',
    title: '',
    color: ''
  };
  const [menuState, setMenuState] = useState(nullityOfMenuState);

  const handleClose = () => setMenuState(nullityOfMenuState);
  const handleDeleteLabel = () => {
    handleDeleteLabelFromPakeepFunc(pakeepId, menuState.id);
    handleClose();
  };

  const globalLabelListProps = { globalLabels, handleChangeNewLabel, setMenuState,customColor };

  const wrapperOfMenuOfLabelPartProps = {
    handleClose,
    handleDeleteLabel,
    menuState,
    changeGloabalLabelItemFunc: changeLabelItemThunk,
    setMenuState,
    isThisMenuIsSecond: true,
    
  };

  return (
    <SelectedLabels.Consumer>
      {({ selectedLabels }) => (
        <Grid>
          {!isDefaultMenuListHidden && <DefaultMenuListOflabelList defaultMenuListArr={defaultMenuListArr} />}
          <GlobalLabelListOflabelList {...globalLabelListProps} selectedLabels={selectedLabels} />

          <WrapperOfMenuOfLabelPart {...wrapperOfMenuOfLabelPartProps} />
          <DialogOfAddNewLabel {...dialogOfAddNewLabelProps} />
        </Grid>
      )}
    </SelectedLabels.Consumer>
  );
};

LabelsList.propTypes = {
  globalLabels: PropTypes.array,
  handleAddNewLabel: PropTypes.func,
  handleDeleteNewLabel: PropTypes.func,
  handleStatusOfHideLabelView: PropTypes.func,
  isLabelViewHidden: PropTypes.bool,
  selectedLabels: PropTypes.array
};

const mapStateToProps = ({ app: { labels } }) => ({
  globalLabels: getLabels(labels)
});

const mapDispatchToProps = dispatch => ({
  changeLabelItemThunk: newLabel => dispatch(changeLabelItemThunk(newLabel))
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelsList);
