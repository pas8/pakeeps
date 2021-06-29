import { FC, MouseEventHandler, useState } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles, Grid, Button, Typography, MenuItem } from '@material-ui/core';
import { AccountAvatarPropsType } from './types';
import MenuByPas from 'components/Menu';
import { CustomColorType } from 'models/types';
import { useDispatch } from 'react-redux';
import { toChangeAvatarProperties } from 'store/modules/App/actions';
import { defaultAvatarProperties } from 'store/modules/App/reducers';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useAlpha } from 'hooks/useAlpha.hook';

export const customColorPlaceholder: CustomColorType = {
  bgHover: '',
  bgUnHover: '',
  unHover: '',
  secondaryColor: '',
  hover: '',
  isUseDefault: true
} as const;

const useStyles = makeStyles(
  ({ spacing, transitions, breakpoints, palette: { secondary, maxEmphasis, background, highEmphasis } }) => ({
    editButton: {
      position: 'absolute',
      bottom: 0,
      background: background.default,

      left: 0,
      '& svg': {
        marginRight: -4
      }
    },
    elementOfEditMenu: {
      padding:spacing(1.2,2),
      color: highEmphasis?.main,
      '& svg': {
        margin: spacing(0, 0.8, 0, -1)
      },
      '&:hover': {
        color: useAlpha(secondary.main, 0.8),
        background: useAlpha(secondary.main)
      }
    }
  })
);

const AccountAvatar: FC<AccountAvatarPropsType> = ({
  isAccountHaveAvatar,
  handleOpenDialog,
  imageUrl,
  getInputProps,
  handleDropZoneOpen
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const onClickOfEditButton: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const onClose = () => {
    setAnchorEl(false);
  };

  const handleDeleteAvatar = () => {
    dispatch(toChangeAvatarProperties({ avatarProperties: defaultAvatarProperties }));
    onClose();
  };

  const editMenuArr = [
    { title: 'Upload new avatar', onClick: handleDropZoneOpen, iconName: 'account' },
    { title: 'Edit current avatar', onClick: handleOpenDialog, iconName: 'edit' },
    { title: 'Delete avatar', onClick: handleDeleteAvatar, iconName: 'delete' }
  ];

  return (
    <>
      {isAccountHaveAvatar ? (
        <>
          <img style={{ width: '100%', height: '100%', marginTop: '-6%' }} src={imageUrl} onClick={handleOpenDialog} />
          <Grid className={classes.editButton}>
            <Button
              startIcon={<EditOutlinedIcon />}
              color={'secondary'}
              variant={'outlined'}
              size={'small'}
              onClick={onClickOfEditButton}
            >
              Edit
            </Button>
          </Grid>
        </>
      ) : (
        <Grid>
          <Typography variant={'body2'} color={'textSecondary'}>
            U can uplad avatar
          </Typography>
          <input {...getInputProps()} />
        </Grid>
      )}
      <MenuByPas open={!!anchorEl} customColor={customColorPlaceholder} anchorEl={anchorEl} onClose={onClose}>
        {editMenuArr.map(({ title, onClick, iconName }) => {
          const [icon] = useTakeIcon(iconName);



          return (
            <MenuItem onClick={onClick} className={classes.elementOfEditMenu}>
              {icon}
              <Typography variant={'body2'}>{title}</Typography>
            </MenuItem>
          );
        })}
      </MenuByPas>
    </>
  );
};

export default AccountAvatar;
