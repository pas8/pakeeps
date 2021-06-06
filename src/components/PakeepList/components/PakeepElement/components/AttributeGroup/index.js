import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';
import { changeLabelItemThunk } from 'store/modules/App/operations';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  labelsContainer: { marginTop: theme.spacing(0.8) }
}));

const AttributeGroup = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  pakeepId,
  changeLabelItemThunk,
  customColor,
  parentBackgrounColor,
  globalEvents,
  events,
  timeFormat,
  timeAndDateFromat
}) => {
  const classes = useStyles();

  const labelPartProps = {
    labels,
    handleDeleteLabelFromPakeepFunc,
    pakeepId,
    changeGloabalLabelItemFunc: changeLabelItemThunk,
    customColor,
    parentBackgrounColor
  };

  const eventsPartProps = { globalEvents, events, customColor, timeFormat, timeAndDateFromat };

  return (
    <Grid spacing={1} container className={classes.labelsContainer}>
      <LabelPart {...labelPartProps} />
      <EventsPart {...eventsPartProps} />
    </Grid>
  );
};

AttributeGroup.propTypes = {
  changeLabelItemThunk: PropTypes.func,
  customColor: PropTypes.any,
  events: PropTypes.array,
  globalEvents: PropTypes.array,
  handleDeleteLabelFromPakeepFunc: PropTypes.func,
  labels: PropTypes.array,
  pakeepId: PropTypes.string,
  parentBackgrounColor: PropTypes.string,
  timeAndDateFromat: PropTypes.string,
  timeFormat: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  changeLabelItemThunk: (labelId, property) => dispatch(changeLabelItemThunk(labelId, property))
});

export default connect(null, mapDispatchToProps)(AttributeGroup);
