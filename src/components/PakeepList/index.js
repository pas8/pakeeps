import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import PakeepElement from './components';
import shortid from 'shortid';
const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(8) }
}));

const PakeepList = ({ pakeeps,labels }) => {
  const classes = useStyles();

  return (
    <Grid container display={'flex'} spacing={2} className={classes.container}>
      {pakeeps.map(el => (
        <PakeepElement {...el} key={shortid()} />
      ))}
    </Grid>
  );
};

const mapStateToProps = ({ app: { pakeeps,labels } }) => ({ pakeeps ,labels});
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(PakeepList);
