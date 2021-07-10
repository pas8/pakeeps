import { Menu, makeStyles, MenuItem } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { findIndex } from 'lodash';
import { FC, MouseEventHandler } from 'react';
import { MoreMenuOfFoldersPropsType } from 'components/Folders/types';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
const useStyles = makeStyles(({ spacing }) => ({
  container: {
    '& button': {
      justifyContent: 'flex-start'
    },
    '& svg': {
      margin: spacing(0, 0.8, 0, 0)
    }
  }
}));

const MoreMenuOfFolders: FC<MoreMenuOfFoldersPropsType> = ({
  arrToMap,
  isMoreMenuopen,
  handleCloseMenu,
  menuAnchorEl,
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
        {arrToMap.map(({ title, iconName, property, id, onClick }) => {
          const findedIdx = findIndex(flattenAllFolders, ({ id: folderId }) => folderId === id);
          const [icon] = useTakeIcon(iconName ? iconName : (property === 'label' && 'label') || 'infinity');

          const onClickOfToggleButton:MouseEventHandler<HTMLButtonElement> = e => {
            onClick && e.preventDefault();
            onClick && onClick(e);
            handleCloseMenu();
          };

          const menuItemProps = {
            onClick: onClickOfToggleButton,
            key: `MoreMenuOfFolders-${id}`,
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

export default MoreMenuOfFolders;
