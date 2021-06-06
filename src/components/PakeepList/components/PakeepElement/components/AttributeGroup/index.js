import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';
import { changeLabelItemThunk } from 'store/modules/App/operations';
import { connect } from 'react-redux';
import { reverse } from 'lodash';
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

  const isAttributeGroupOrderIsReverse = false;

  const partsArr = [
    { Component: EventsPart, props: eventsPartProps },
    { Component: LabelPart, props: labelPartProps }
  ];

  const validatedPartsArr = isAttributeGroupOrderIsReverse ? reverse(partsArr) : partsArr;

  return (
    <Grid spacing={1} container className={classes.labelsContainer}>
      {validatedPartsArr.map(({ Component, props },idx) => (
        <Component {...props} key={idx} />
      ))}
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
