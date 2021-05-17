import PropTypes from 'prop-types';
import { Grid ,makeStyles} from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';

const useStyles = makeStyles(theme => ({
  label: { marginTop: theme.spacing(0) },
  labelsContainer: { marginTop: theme.spacing(0.8) }
}));
const AttributeGroup = ({ events, labels }) => {
const classes = useStyles();
  
  return (
    <Grid spacing={1} container className={classes.labelsContainer}>
      <LabelPart labels={labels} />
      {/* <EventsPart events={events}/> */}
    </Grid>
  );
};

AttributeGroup.propTypes = {
  events: PropTypes.array,
  labels: PropTypes.array
};

export default AttributeGroup;
