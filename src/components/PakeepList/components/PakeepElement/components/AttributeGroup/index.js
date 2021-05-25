import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';

const useStyles = makeStyles(theme => ({
  labelsContainer: { marginTop: theme.spacing(0.8) }
}));
const AttributeGroup = ({
  events =[],
  labels,
  handleDeleteLabelFromPakeepFunc,
  pakeepId,
  changeLabelItemFunc
}) => {
  const classes = useStyles();

  return (
    <Grid spacing={1} container className={classes.labelsContainer}>
      <LabelPart
        labels={labels}
        handleDeleteLabelFromPakeepFunc={handleDeleteLabelFromPakeepFunc}
        pakeepId={pakeepId}
        changeLabelItemFunc={changeLabelItemFunc}
      />
      {/* <EventsPart events={events}/> */}
    </Grid>
  );
};

AttributeGroup.propTypes = {
  changeLabelItemFunc: PropTypes.func,
  events: PropTypes.array,
  handleDeleteLabelFromPakeepFunc: PropTypes.func,
  labels: PropTypes.array,
  pakeepId: PropTypes.string
}


export default AttributeGroup;


