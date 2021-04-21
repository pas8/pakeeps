import PropTypes from 'prop-types';
import { IconButton, Container, makeStyles, Popover, Box, Typography, Button, ButtonGroup } from '@material-ui/core';
import { useState } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined'; //! to change icon
import clsx from 'clsx';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import SaveIcon from '@material-ui/icons/Save';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles(theme => ({
  popover: { pointerEvents: 'none' },
  paper: {
    padding: theme.spacing(1)
  },
  container: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 8 },
  buttonWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
  buttonGroupWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  button: { justifyContent: 'flex-end' },
  hidden: {
    display: 'none'
  }
}));

const NewPakeepUtils = ({ open = !true }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState({
    checkbox: null,
    palette: null,
    archive: null,
    date: null,
    picture: null,
    share: null,
    edit: null
  });

  const handlePopoverOpen = ({ currentTarget, target: { name } }) =>
    setAnchorEl(state => ({ ...state, [name]: currentTarget }));

  const handlePopoverClose = () => setAnchorEl(false);

  const buttonUtilsNewPakeepArray = [
    { icon: CheckBoxOutlinedIcon, popoverText: 'Show a checkboxes', name: 'checkbox' },
    { icon: PaletteOutlinedIcon, popoverText: 'Change backgroundColor', name: 'palette' },
    { icon: ArchiveOutlinedIcon, popoverText: 'Archive pakeep', name: 'archive' },
    { icon: EventAvailableOutlinedIcon, popoverText: 'Add date to pakeep', name: 'date' },
    { icon: WallpaperOutlinedIcon, popoverText: 'Add picture', name: 'picture' },
    { icon: ShareOutlinedIcon, popoverText: 'Share', name: 'share' },
    { icon: EditOutlinedIcon, popoverText: 'Edit title', name: 'edit' }
  ];

  return (
    <Box className={clsx(classes.container, !open ? classes.hidden : null)}>
      {buttonUtilsNewPakeepArray.map(({ icon: Icon, popoverText, name }) => (
        <Box>
          <IconButton
            name={name}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-owns={Boolean(anchorEl[name]) ? 'mouse-over-popover' : undefined}
            aria-haspopup={'true'}
          >
            <Icon style={{ color: `rgba(255,255,255,${Boolean(anchorEl[name]) ? 0.8 : 0.4}` }} />
          </IconButton>
          <Popover
            className={classes.popover}
            classes={{
              paper: classes.paper
            }}
            open={Boolean(anchorEl[name])}
            anchorEl={anchorEl[name]}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography variant={'subtitle2'}>{popoverText}</Typography>
          </Popover>
        </Box>
      ))}
      <Box className={classes.buttonGroupWrapper}>
        <Box className={classes.buttonWrapper}>
          <Button color={'success'} style={{ color: 'rgba(255,255,255,0.4)' }}>
            Close
          </Button>
        </Box>
        <Box className={clsx(classes.buttonWrapper, classes.button)}>
          <Button color={'primary'} startIcon={<SaveIcon />}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

NewPakeepUtils.propTypes = {
  open: PropTypes.bool
};

export default NewPakeepUtils;
