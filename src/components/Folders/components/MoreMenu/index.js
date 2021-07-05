import { Menu, makeStyles, MenuItem } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    '& button': {
      justifyContent: 'flex-start'
    },
    '& svg': {
      margin: theme.spacing(0, 0.8, 0, 0)
    }
  }
}));

const MoreMenuOfFolders = ({
  arrToMap,
  isMoreMenuopen,
  handleCloseMenu,
  menuAnchorEl,
  onClick = null,
  handleChange,
  value,
  flattenAllFolders
}) => {
  const classes = useStyles();
  return (
    <Menu
      anchorEl={menuAnchorEl}
      keepMounted
      open={isMoreMenuopen}
      onClose={handleCloseMenu}
      className={classes.container}
    >
      <ToggleButtonGroup orientation={'vertical'} value={value} exclusive onChange={handleChange}>
        {arrToMap.map(({ title, iconName, property, id ,onClick}) => {
          const findedIdx = findIndex(flattenAllFolders, ({ id: folderId }) => folderId === id);
          const [icon] = useTakeIcon(iconName ? iconName : (property === 'label' && 'label') || 'infinity');

          const onClickOfToggleButton = e => {
            onClick && e.preventDefault();
            onClick && onClick(e);
            handleCloseMenu()

          };

          const menuItemProps = {
            onClick: onClickOfToggleButton,
            key: id,
            value: findedIdx
          };
          return (
            <ToggleButton {...menuItemProps}>
              {icon} {title}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Menu>
  );
};

MoreMenuOfFolders.propTypes = {
  arrToMap: PropTypes.shape({
    map: PropTypes.func
  }),
  flattenAllFolders: PropTypes.array,
  handleChange: PropTypes.func,
  handleCloseMenu: PropTypes.func,
  isMoreMenuopen: PropTypes.bool,
  menuAnchorEl: PropTypes.object,
  onClick: PropTypes.func,
  value: PropTypes.number
};

export default MoreMenuOfFolders;
