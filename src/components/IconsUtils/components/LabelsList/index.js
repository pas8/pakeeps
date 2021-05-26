import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, makeStyles, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { getLabels } from 'store/modules/App/selectors';
import DefaultMenuListOflabelList from './components/DefaultMenuList';
import GlobalLabelListOflabelList from './components/GlobalLabelList';
import { useState } from 'react';
import DialogOfAddNewLabel from './components/DialogOfAddNewLabel';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    '& li': {
      paddingRight: spacing(1)
    }
  }
}));

const LabelsList = ({
  handleAddNewLabel,
  handleDeleteNewLabel,
  globalLabels,
  selectedLabels,
  handleStatusOfHideLabelView,
  isLabelViewHidden
}) => {
  const classes = useStyles();

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

  const handleChangeNewLabel = (isChecked, id) => (isChecked ? handleDeleteNewLabel(id) : handleAddNewLabel(id));
  const globalLabelListProps = { globalLabels, handleChangeNewLabel, selectedLabels };

  return (
    <Grid className={classes.container}>
      <DefaultMenuListOflabelList defaultMenuListArr={defaultMenuListArr} />

      <GlobalLabelListOflabelList {...globalLabelListProps} />
      <DialogOfAddNewLabel {...dialogOfAddNewLabelProps} />
    </Grid>
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

export default connect(mapStateToProps, null)(LabelsList);
