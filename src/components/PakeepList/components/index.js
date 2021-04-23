import { Grid, Paper, makeStyles, Typography, Chip, Box, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, React } from 'react';
import clsx from 'clsx';
import IconsUtils from 'components/IconsUtils';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { iconsArr } from 'components/Icons';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
const useStyles = makeStyles(theme => ({
  paper: { padding: theme.spacing(1.96), paddingTop: theme.spacing(1.4), cursor: 'pointer', position: 'relative' },
  title: { marginBottom: theme.spacing(1) },
  hover: {
    paddingBottom: theme.spacing(8 * 0.8),
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
  },
  iconsUtils: {
    position: 'absolute',
    bottom: 0,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex
    })
  }
}));

const PakeepElement = ({ title, text, bookmark, favorite, color, labels }) => {
  const classes = useStyles(color);
  const [hover, setHover] = useState(!false);
  const [labelHover, setLabelHover] = useState(!false);
  const [currentLabels, setCurrentLabels] = useState([]);
  const setHoverIsTrue = () => setHover(true);
  const setHoverIsFalse = () => setHover(false);
  const setEditTitleIsTrue = () => {};
  const handleSetFavoritePakeep = () => {};
  const handleSetColorPakeep = () => {};
  const handleSetBookmarkPakeep = () => {};
  const handleDeleteLabel = () => {};
  console.log(labelHover);
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

        {labels.map(({ title, icon: labelIcon, key, color }) => (
          <span className={clsx(classes.label)}>
            <Chip
              onMouseEnter={() => setLabelHover({ title, isHovering: true })}
              onMouseLeave={() => setLabelHover(false)}
              icon={
                !(labelHover?.isHovering && labelHover?.title === title)
                  ? iconsArr.find(({ iconName }) => iconName === labelIcon)?.icon
                  : null
              }
              label={title}
              onDelete={
                (labelHover?.isHovering && labelHover?.title === title) || !labelIcon
                  ? () => handleDeleteLabel(key)
                  : null
              }
              className={classes.chip}
              variant={'outlined'}
              color={color}
              size={'small'}
              deleteIcon={<DeleteForeverOutlinedIcon />}
            />
            //{' '}
          </span>
        ))}

        {hover ? (
          <Grid className={classes.iconsUtils}>
            <IconsUtils
              isAllIconsIsShown={false}
              sliceArrayTo={4}
              setEditTitleIsTrue={setEditTitleIsTrue}
              favorite={favorite}
              handleSetFavoritePakeep={handleSetFavoritePakeep}
              changingTitle={false}
              bookmark={bookmark}
              labels={labels}
              checkbox={false}
              handleSetBookmarkPakeep={handleSetBookmarkPakeep}
              handleSetColorPakeep={handleSetColorPakeep}
              iconsCloser
            />
          </Grid>
        ) : null}
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
