import { Menu, makeStyles, MenuItem, Grid } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { findIndex } from 'lodash';
import { FC, MouseEventHandler } from 'react';
import { MoreMenuOfFoldersPropsType } from 'components/Folders/types';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useFindCorrectFolderFunc } from 'hooks/useFindCorrectFolderFunc.hook';
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
  globalFolderId,
  top,
  foldersAfter,
  left,
  folderOrderNames,
  onClose,
  ...defaultUseFindCorrectFolderFuncProps
}) => {
  const classes = useStyles();
  return (
    <Menu
      keepMounted
      open={true}
      anchorReference={'anchorPosition'}
      anchorPosition={{ top, left }}
      onClose={onClose}
      className={classes.container}
    >
      {folderOrderNames.map((id, idx) => {
        const folder = foldersAfter[id];
        if (!folder) return null;
        const key = `MORE_MENU_OF_FOLDERS${id}_${idx}`;

        return (
          <Grid key={key}>
            {folder.arr.map(({ iconName, id, title, ...defaultFolderItemProps }, idx) => {
              const [icon] = useTakeIcon(iconName);

              const onClick = useFindCorrectFolderFunc({
                ...defaultUseFindCorrectFolderFuncProps,
                ...defaultFolderItemProps,
                id
              });

              return <MenuItem key={`${key}_item_${id}_${idx}`} onClick={onClick}>

                {icon}{title}
              </MenuItem>;
            })}
          </Grid>
        );
      })}
    </Menu>
  );
};

export default MoreMenuOfFolders;
