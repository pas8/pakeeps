import clsx from 'clsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import PopupState, { bindHover, bindPopover, bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from 'material-ui-popup-state/HoverPopover';
import { IconButton, makeStyles, Typography, Grid } from '@material-ui/core';
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
import MoreOutlinedIcon from '@material-ui/icons/MoreOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import UnfoldLessOutlinedIcon from '@material-ui/icons/UnfoldLessOutlined';

const useStyles = makeStyles(theme => ({
  popover: { padding: theme.spacing(0.4, 0.8) },
  container: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 8 },
  moreIcon: { margin: theme.spacing(0.4, 1.4, 0, -0.8) },
}));

const IconsUtils = ({
  isAllIconsIsShown = true,
  sliceArrayTo = 4,
  setEditTitleIsTrue,
  favorite = true,
  handleSetFavoritePakeep,
  changingTitle,
  bookmark,
  labels,
  checkbox,
  handleSetBookmarkPakeep,
  handleSetColorPakeep,
  handleSetWidth,
  fullWidth = false
}) => {
  const classes = useStyles();

  const handleClick = () => console.log('placeholder');
  const buttonUtilsNewPakeepArray = [
    {
      icon: CheckBoxOutlinedIcon,
      popoverText: 'Show a checkboxes',
      name: 'checkbox',
      onClick: handleClick,
      activeIcon: checkbox 
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
      activeIcon: changingTitle 
    },

    {
      icon: LabelOutlinedIcon,
      popoverText: 'Add labels',
      name: 'labels',
      onClick: setEditTitleIsTrue,
      activeIcon: labels 
    },
    {
      icon: FavoriteBorderOutlinedIcon,
      popoverText: 'Add to favorites',
      name: 'favorite',
      onClick: handleSetFavoritePakeep,
      activeIcon: favorite 
    },
    {
      icon: BookmarksOutlinedIcon,
      popoverText: 'Add to bookmark',
      name: 'bookmark',
      onClick: handleSetBookmarkPakeep,
      activeIcon: bookmark
    },
    {
      icon:!fullWidth ? UnfoldMoreOutlinedIcon :  UnfoldLessOutlinedIcon,
      popoverText: 'To full width',
      name: 'width',
      onClick: handleSetWidth,
      activeIcon: fullWidth,
      rotateDeg:90
    },
    
    
  ];
  const [slicedArr, setSlicedArr] = useState([]);

  useEffect(() => {
    if (!isAllIconsIsShown) setSlicedArr(buttonUtilsNewPakeepArray.slice(sliceArrayTo));
  }, []);

  return (
    <Grid container display={'flex'} wrap={'nowrap'}  justify={isAllIconsIsShown ?'flex-start' : "space-between"} >
      {buttonUtilsNewPakeepArray.map(({ icon: Icon, popoverText, name, onClick, activeIcon,rotateDeg }, idx) => {
        const element = (
          <PopupState variant={'popover'} key={shortid()}>
            {popupState => (
              <>
                <IconButton
                  {...bindHover(popupState)}
                  name={name}
                  onClick={onClick}
                  aria-haspopup={'true'}
                >
                  <Icon
                  
                    style={{
                      // filter: name === 'favorite' && activeIcon ? `drop-shadow(0 0 0.4rem ${themeColors.primaryMain})` : '',
                      transform:`rotate(${rotateDeg ? rotateDeg : 0 }deg)`,
                      color: activeIcon ? themeColors.primaryMain : `rgba(255,255,255,${popupState.isOpen ? 0.8 : 0.4}`
                    }}
                  />
                </IconButton>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                >
                  <Typography variant={'subtitle2'} className={classes.popover}>
                    {popoverText}
                  </Typography>
                </Popover>
              </>
            )}
          </PopupState>
        );

        return (
          <>
            {isAllIconsIsShown ? (
              element
            ) : sliceArrayTo > idx ? (
              element
            ) : sliceArrayTo === idx ? (
              <PopupState variant={'popover'} key={shortid()}>
                {popupState => (
                  <>
                    <IconButton {...bindTrigger(popupState)} name={name} aria-haspopup={'true'}>
                      <MoreOutlinedIcon
                        style={{
                          transform: `rotate(${popupState.isOpen ? 180 : 0}deg)`,
                          color: `rgba(255,255,255,${popupState.isOpen ? 0.8 : 0.4}`
                        }}
                      />
                    </IconButton>

                    <Menu
                      {...bindMenu(popupState)}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                      }}
                    >
                      <MenuItem onClick={() => popupState.close()}>
                        <Grid className={classes.moreIcon}>
                          <CloseOutlinedIcon
                            style={{
                              filter: activeIcon ? `drop-shadow(0 0 0.4rem ${themeColors.primaryMain})` : '',
                              color: activeIcon
                                ? themeColors.primaryMain
                                : `rgba(255,255,255,${popupState.isOpen ? 0.8 : 0.4}`
                            }}
                          />
                        </Grid>
                        <Typography variant={'subtitle2'}>{'Close'}</Typography>
                      </MenuItem>

                      {slicedArr.map(({ icon: Icon, popoverText, name, onClick, activeIcon }) => (
                        <MenuItem onClick={onClick}>
                          <Grid className={classes.moreIcon}>
                            <Icon
                              style={{
                                filter: activeIcon ? `drop-shadow(0 0 0.4rem ${themeColors.primaryMain})` : '',
                                color: activeIcon
                                  ? themeColors.primaryMain
                                  : `rgba(255,255,255,${popupState.isOpen ? 0.8 : 0.4}`
                              }}
                            />
                          </Grid>
                          <Typography variant={'subtitle2'}>{popoverText}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </PopupState>
            ) : null}
          </>
        );
      })}
    </Grid>
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
  isAllIconsIsShown: PropTypes.bool,
  sliceArrayTo: PropTypes.number,
  labels: PropTypes.any,
  open: PropTypes.bool,
  setEditTitleIsTrue: PropTypes.func
};

export default IconsUtils;
