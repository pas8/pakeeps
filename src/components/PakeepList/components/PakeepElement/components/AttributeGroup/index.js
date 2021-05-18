import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  label: { marginTop: theme.spacing(0) },
  labelsContainer: { marginTop: theme.spacing(0.8) }
}));
const AttributeGroup = ({ events, labels, globalLabels }) => {
  const classes = useStyles();

  const pakeepLabels = _.map(labels, id => {
    const findedLabel = _.find(globalLabels, ({ id: globalId }) => id === globalId);
    return findedLabel;
  });

  return (
    <Grid spacing={1} container className={classes.labelsContainer}>
      <LabelPart labels={pakeepLabels} />
      {/* <EventsPart events={events}/> */}
    </Grid>
  );
};

AttributeGroup.propTypes = {
  events: PropTypes.array,
  labels: PropTypes.array
};

export default AttributeGroup;
