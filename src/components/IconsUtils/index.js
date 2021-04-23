import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { IconButton, makeStyles, Popover, Box, Typography } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined'; //! to change icon
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import { themeColors } from 'components/theme';

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(theme => ({
  popover: { pointerEvents: 'none' },
  paper: {
    padding: theme.spacing(1)
  },
  container: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 8 }
}));

const IconsUtils = ({
  open = !true,
  setEditTitleIsTrue,
  favorite = true,
  handleSetFavoritePakeep,
  changingTitle,
  bookmark,
  labels,
  checkbox,
  handleSetBookmarkPakeep,
  handleSetColorPakeep
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = ({ currentTarget, target: { name } }) => setAnchorEl(currentTarget);

  const handlePopoverClose = () => setAnchorEl(false);

  const handleClick = () => console.log('placeholder');
  const buttonUtilsNewPakeepArray = [
    {
      icon: CheckBoxOutlinedIcon,
      popoverText: 'Show a checkboxes',
      name: 'checkbox',
      onClick: handleClick,
      activeIcon: checkbox ? true : false
    },
    {
      icon: PaletteOutlinedIcon,
      popoverText: 'Change backgroundColor',
      name: 'palette',
      onClick: handleSetColorPakeep
    },
    { icon: ArchiveOutlinedIcon, popoverText: 'Archive pakeep', name: 'archive', onClick: handleClick },
    { icon: EventAvailableOutlinedIcon, popoverText: 'Add date to pakeep', name: 'date', onClick: handleClick },
    { icon: WallpaperOutlinedIcon, popoverText: 'Add picture', name: 'picture', onClick: handleClick },
    { icon: ShareOutlinedIcon, popoverText: 'Share', name: 'share', onClick: handleClick },
    {
      icon: EditOutlinedIcon,
      popoverText: 'Edit title',
      name: 'edit',
      onClick: setEditTitleIsTrue,
      activeIcon: changingTitle ? true : false
    },

    {
      icon: LabelOutlinedIcon,
      popoverText: 'Add labels',
      name: 'labels',
      onClick: setEditTitleIsTrue,
      activeIcon: labels ? true : false
    },
    {
      icon: FavoriteBorderOutlinedIcon,
      popoverText: 'Add to favorites',
      name: 'favorite',
      onClick: handleSetFavoritePakeep,
      activeIcon: favorite ? true : false
    },
    {
      icon: BookmarksOutlinedIcon,
      popoverText: 'Add to bookmark',
      name: 'bookmark',
      onClick: handleSetBookmarkPakeep,
      activeIcon: bookmark ? true : false
    }
  ];

  return (
    <>
      {buttonUtilsNewPakeepArray.map(({ icon: Icon, popoverText, name, onClick, activeIcon }) => (
        <Box key={shortid()}>
          <IconButton
            name={name}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={onClick}
            aria-owns={Boolean(anchorEl[name]) ? 'mouse-over-popover' : undefined}
            aria-haspopup={'true'}
          >
            <Icon
              style={{
                filter: activeIcon ? `drop-shadow(0 0 0.4rem ${themeColors.primaryMain})` : '',
                color: activeIcon ? themeColors.primaryMain : `rgba(255,255,255,${Boolean(anchorEl[name]) ? 0.8 : 0.4}`
              }}
            />
          </IconButton>
          <Popover
            className={classes.popover}
            classes={{
              paper: classes.paper
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
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
    </>
  );
};

IconsUtils.propTypes = {
  bookmark: PropTypes.any,
  changingTitle: PropTypes.any,
  checkbox: PropTypes.any,
  favorite: PropTypes.bool,
  handleNewPakeepSave: PropTypes.func,
  handleSetBookmarkPakeep: PropTypes.any,
  handleSetColorPakeep: PropTypes.any,
  handleSetFavoritePakeep: PropTypes.func,
  labels: PropTypes.any,
  open: PropTypes.bool,
  setEditTitleIsTrue: PropTypes.func
};

export default IconsUtils;
