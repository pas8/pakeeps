import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connectToDatabase } from '../../utils/mongodb';

const useStyles = makeStyles(theme => ({}));

const Testing = () => {
  const classes = useStyles();

  return <Grid></Grid>;
};

Testing.propTypes = {};

export default Testing;

export const getServerSideProps = async context => {
  const re = await connectToDatabase();
  console.log(re);
  return {props:{}};
};
