import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';
import PakeepElement from './components';
import shortid from 'shortid';
import { useMeasure } from 'react-use';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(8) },
  s: {
    border: '1px solid #fff8',
    cursor: 'move'
  }
}));


const PakeepList = ({ pakeeps, labels }) => {

  const theme = useTheme();
  const classes = useStyles();



  return (
    <>
      <Grid container display={'flex'} spacing={2} className={classes.container}>
        {pakeeps.map((el, idx) => (
            <PakeepElement {...el} />
        ))}


      </Grid>
    </>
  );
};

const mapStateToProps = ({ app: { pakeeps, labels } }) => ({ pakeeps, labels });
// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(PakeepList);
