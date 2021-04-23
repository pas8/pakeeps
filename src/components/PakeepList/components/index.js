import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  paper: { padding: theme.spacing(1.96), paddingTop: theme.spacing(1.4) },
  title: { marginBottom: theme.spacing(1) }
}));

const PakeepElement = ({ title, text, bookmark, favorite, color, labels }) => {
  const classes = useStyles(color);
  const [hover, setHover] = useState(false);

  const handleHoverStatus = () => setHover(true);

  return (
    <Grid item sm={4} xs={6} md={3} lg={2} onHover={handleHoverStatus}>
      <Paper variant={'outlined'} style={{ backgroundColor: color }} className={classes.paper} elevation={3}>
        <Grid item className={classes.title}>
          <Typography variant={'h5'}>{title}</Typography>
        </Grid>
        <Grid item>{text}</Grid>
      </Paper>
    </Grid>
  );
};

PakeepElement.propTypes = {
  bookmark: PropTypes.any,
  color: PropTypes.any,
  favorite: PropTypes.any,
  labels: PropTypes.any,
  text: PropTypes.any,
  title: PropTypes.any
};

export default PakeepElement;
