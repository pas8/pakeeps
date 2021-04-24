import { Grid, Paper, makeStyles, Typography, Chip, Box, Container, Zoom ,Grow} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, React } from 'react';
import clsx from 'clsx';
import IconsUtils from 'components/IconsUtils';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { iconsArr } from 'components/Icons';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { takeValueFromBreakpoints } from 'hooks/takeValueFromBreakpoints.hook';

const useStyles = makeStyles(theme => ({
  paper: { padding: theme.spacing(1.96), paddingTop: theme.spacing(1.4), cursor: 'pointer', position: 'relative', },
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
    right: 0,
    left: 0,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex
    })
  },
  label: { marginTop: theme.spacing(0) },
  labelsContainer:{marginTop: theme.spacing(0.8)}
}));

const PakeepElement = ({ title, text, bookmark, favorite, color, labels }) => {
  const classes = useStyles(color);
  const [hover, setHover] = useState(false);
  const [labelHover, setLabelHover] = useState(!false);
  const [currentLabels, setCurrentLabels] = useState([]);
  const setHoverIsTrue = () => setHover(true);
  const setHoverIsFalse = () => setHover(false);
  const setEditTitleIsTrue = () => {};
  const handleSetFavoritePakeep = () => {};
  const handleSetColorPakeep = () => {};
  const handleSetBookmarkPakeep = () => {};
  const handleDeleteLabel = () => {};

  const sliceArrayTo = takeValueFromBreakpoints([5, 5, 4, 4, 6, 4]);

  return (
    <Grid item sm={6} xs={12} md={4} lg={3} xl={2} onMouseEnter={setHoverIsTrue} onMouseLeave={setHoverIsFalse}>
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
        <Grid display={'flex'} spacing={1} container className={classes.labelsContainer}>
          {labels.map(({ title, icon: labelIcon, key, color }) => (
            <Grid className={classes.label} item>
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
            </Grid>
          ))}
        </Grid>
        <Grow in={hover}>
          <Grid className={classes.iconsUtils}>
            <IconsUtils
              isAllIconsIsShown={false}
              sliceArrayTo={sliceArrayTo}
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
          </Grow>
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
