import { Grid, makeStyles } from '@material-ui/core';
import AttributeGroup from 'components/PakeepList/components/PakeepElement/components/AttributeGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFilteredLabels } from 'store/modules/App/selectors';

const useStyles = makeStyles(theme => ({
  attributeContainer: {
    position: 'absolute',
    left: theme.spacing(1.4),
    bottom: theme.spacing(6)
  }
}));

const AttributesOfNewPakeep = ({ filteredLabels, ...attributesOfNewPakeepProps }) => {
  const classes = useStyles();

  const attributeGroupProps = {
    ...attributesOfNewPakeepProps,
    labels:filteredLabels

  }
  return (
    <Grid className={classes.attributeContainer}>
      <AttributeGroup  {...attributeGroupProps}/>
    </Grid>
  );
};

AttributesOfNewPakeep.propTypes = {
  filteredLabels: PropTypes.array
}

const mapStateToProps = ({ app: { labels: globalLabels } }, { labels }) => ({
  filteredLabels: getFilteredLabels(labels, globalLabels)
});

export default connect(mapStateToProps, null)(AttributesOfNewPakeep);
