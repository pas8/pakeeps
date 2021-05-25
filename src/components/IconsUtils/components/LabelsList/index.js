import { Grid, makeStyles, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import includes from 'lodash.includes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLabels } from 'store/modules/App/selectors';
const useStyles = makeStyles(theme => ({
  container: {
    '& li': {
      paddingRight: theme.spacing(1)
    }
  }
}));

const LabelsList = ({ handleAddNewLabel, handleDeleteNewLabel, globalLabels, selectedLabels }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      {globalLabels.map(({ title, id }) => {
        const isChecked = includes(selectedLabels, id);

        const onClick = () => (isChecked ? handleDeleteNewLabel(id) : handleAddNewLabel(id));
        return (
          <MenuItem disableGutters onClick={onClick} key={`newPakeep-label-${id}`}>
            <Checkbox checked={isChecked} /> <ListItemText primary={title} />
          </MenuItem>
        );
      })}
    </Grid>
  );
};

LabelsList.propTypes = {
  globalLabels: PropTypes.array,
  handleAddNewLabel: PropTypes.func,
  handleDeleteNewLabel: PropTypes.func,
  selectedLabels: PropTypes.array
}

const mapStateToProps = ({ app: { labels } }) => ({
  globalLabels: getLabels(labels)
});

// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(LabelsList);
