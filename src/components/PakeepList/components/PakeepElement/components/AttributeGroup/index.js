import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';
import { changeLabelItemThunk } from 'store/modules/App/operations';
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  labelsContainer: { marginTop: theme.spacing(0.8) }
}));
const AttributeGroup = ({ events = [], labels, handleDeleteLabelFromPakeepFunc, pakeepId, changeLabelItemThunk }) => {
  const classes = useStyles();

  return (
    <Grid spacing={1} container className={classes.labelsContainer}>
      <LabelPart
        labels={labels}
        handleDeleteLabelFromPakeepFunc={handleDeleteLabelFromPakeepFunc}
        pakeepId={pakeepId}
        changeLabelItemFunc={changeLabelItemThunk}
      />
      {/* <EventsPart events={events}/> */}
    </Grid>
  );
};

AttributeGroup.propTypes = {
  changeLabelItemThunk: PropTypes.func,
  events: PropTypes.array,
  handleDeleteLabelFromPakeepFunc: PropTypes.func,
  labels: PropTypes.array,
  pakeepId: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  changeLabelItemThunk: (labelId, property) => dispatch(changeLabelItemThunk(labelId, property))
});

export default connect(null, mapDispatchToProps)(AttributeGroup);
