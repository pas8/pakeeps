import { Grid, makeStyles, Paper, Slider } from '@material-ui/core';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

const useStyles = makeStyles(theme => ({
  previewer: {
    margin: theme.spacing(2, 0.4, 2, 4),
    position: 'relative',
    // background: ({ gradientColor }) => gradientColor,linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)
    background: 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    width: theme.spacing(32 + 8),
    height: theme.spacing(8 * 0.8),
    // boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)'
  }
}));

const GradientPreviewer = ({ gradientColor }) => {
  const classes = useStyles({ gradientColor });

  const i = document.querySelector('#GradientPreviewer');

  return (
    <Paper className={classes.previewer} id="GradientPreviewer" elevation={16}>
      <Draggable
        // bounds="parent"
        axis="x"
        handle=".handle"
        position={{ x: 0, y: 0 }}
        grid={[25, i?.clientWidth / 100]}
        scale={1}
        // onStart={(e)=>console.log(e)}
        onDrag={(e, y) => console.log(y)}
        onStop={(e, y) => console.log(y)}
      >
        <Grid className={'handle'}>
          <Paper>f</Paper>
        </Grid>
      </Draggable>
    </Paper>
  );
};

GradientPreviewer.propTypes = {};

export default GradientPreviewer;
