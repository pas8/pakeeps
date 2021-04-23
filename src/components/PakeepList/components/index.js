import { Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import clsx from 'clsx';
import IconsUtils from 'components/IconsUtils';

const useStyles = makeStyles(theme => ({
  paper: { padding: theme.spacing(1.96), paddingTop: theme.spacing(1.4), cursor: 'pointer' },
  title: { marginBottom: theme.spacing(1) },
  hover: {
    paddingBottom: theme.spacing(8),
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  unHover: {
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}));

const PakeepElement = ({ title, text, bookmark, favorite, color, labels }) => {
  const classes = useStyles(color);
  const [hover, setHover] = useState(false);

  const setHoverIsTrue = () => setHover(true);
  const setHoverIsFalse = () => setHover(false);

  return (
    <Grid item sm={4} xs={6} md={3} lg={2} onMouseEnter={setHoverIsTrue} onMouseLeave={setHoverIsFalse}>
      <Paper
        variant={'outlined'}
        style={{ backgroundColor: color }}
        className={clsx(hover ? classes.hover : classes.unHover, classes.paper)}
        elevation={3}
      >
        <Grid item className={classes.title}>
          <Typography variant={'h5'}>{title}</Typography>
        </Grid>
        <Grid item>{text}</Grid>
        <IconsUtils
          isAllIconsIsShown={false}
          sliceArrayTo={4}
          setEditTitleIsTrue
          favorite={favorite}
          handleSetFavoritePakeep={handleSetFavoritePakeep}
          changingTitle={changingTitle}
          bookmark={bookmark}
          labels={labels}
          checkbox={checkbox}
          handleSetBookmarkPakeep={handleSetBookmarkPakeep}
          handleSetColorPakeep={handleSetColorPakeep}
        />
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
