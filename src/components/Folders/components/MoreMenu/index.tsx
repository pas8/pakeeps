import { Menu, makeStyles, MenuItem, Grid, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { findIndex } from 'lodash';
import { FC, MouseEventHandler } from 'react';
import { MoreMenuOfFoldersPropsType } from 'components/Folders/types';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useFindCorrectFolderFunc } from 'hooks/useFindCorrectFolderFunc.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
const useStyles = makeStyles(({ spacing, palette, shape: { borderRadius } }) => ({
  container: {
    border: '1px solid',
    borderColor: useAlpha(palette.text.primary),
    borderRadius,
    borderBottom: 0,
    '& legend':{
      padding: spacing(0.6, 1.4,0.2),
      borderBottom:`1px dashed ${useAlpha(palette.text.primary)}`


    },
    '& .groupContainer': {


    },
    '& .itemContainer': {
      padding: spacing(1.2, 1.8),
      borderBottom: '1px solid',
      borderBottomColor: useAlpha(palette.text.primary),

      justifyContent: 'flex-start'
    },
    '& p,svg': {
      color: palette.text.secondary
    },
    '& p': {
      textTransform: 'uppercase'
    },
    '& svg': {
      margin: spacing(0, 0.8, 0, -0.8)
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
    <Menu keepMounted open={true} anchorReference={'anchorPosition'} anchorPosition={{ top, left }} onClose={onClose}>
      <Grid className={classes.container}>
        {folderOrderNames.map((id, idx) => {
          const folder = foldersAfter[id];
          if (!folder) return null;
          const key = `MORE_MENU_OF_FOLDERS${id}_${idx}`;

          return (
            <Grid key={key} className={'groupContainer'}>
              <Typography component={'legend'}>{folder.label}</Typography>
              {folder.arr.map(({ iconName, id, title, ...defaultFolderItemProps }, idx) => {
                const [icon] = useTakeIcon(iconName);

                const onClick = useFindCorrectFolderFunc({
                  ...defaultUseFindCorrectFolderFuncProps,
                  ...defaultFolderItemProps,
                  id
                });

                return (
                  <MenuItem key={`${key}_item_${id}_${idx}`} onClick={onClick} className={'itemContainer'}>
                    {icon}
                    <Typography> {title}</Typography>
                  </MenuItem>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </Menu>
  );
};

export default MoreMenuOfFolders;
