import { FC, MouseEventHandler, useState } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles, Grid, Button, Typography, MenuItem } from '@material-ui/core';
import { AccountAvatarPropsType } from './types';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuByPas from 'components/Menu';
import { CustomColorType } from 'models/types';
import { useDispatch } from 'react-redux';
import { toChangeAvatarProperties } from 'store/modules/App/actions';
import { defaultAvatarProperties } from 'store/modules/App/reducers';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import doodle from '@jalba/react-css-doodle';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { colord } from 'colord';
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
    elementOfEditMenu: {
      padding: spacing(1.2, 2),
      color: highEmphasis?.main,
      '& svg': {
        margin: spacing(0, 0.8, 0, -1)
      },
      '&:hover': {
        color: useAlpha(secondary.main, 0.8),
        background: useAlpha(secondary.main)
      }
    },
    editButton: ({ backgroundColor, isHaveBgColor }: any) => {
      const color = isHaveBgColor ? backgroundColor : '';
      return {
        position: 'absolute',
        bottom: 8,
        background: background.default,

        left: 8,
        '& svg': {
          marginRight: -4
        },

        '& button': {
          color,
          borderColor: color
        }
      };
    }
  })
);

const AccountAvatar: FC<AccountAvatarPropsType> = ({
  isAccountHaveAvatar,
  handleOpenDialog,
  url,
  getInputProps,
  handleDropZoneOpen,
  backgroundColor,
  isHaveBgColor,
  borderRadius
}) => {
  const classes = useStyles({ backgroundColor, isHaveBgColor });
  const dispatch = useDispatch();

  const [primaryColor, secondaryColor] = useThemeColors();
  const color = colord(primaryColor!).mix(secondaryColor!).toHex();

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

  // const FancyDoodle = doodle`
  // :doodle {
  //   @grid: 2 / 4vmax;
  //   // background: ${primaryColor};
  // }
  // --hue: calc(180 + 1.5 * @row * @col);
  // background: hsl(var(--hue), 50%, 70%);
  // margin: -.2px;
  // transition: @r(.5s) ease;
  // clip-path: polygon(@pick(
  //   '0 0, 100% 0, 100% 100%',
  //   '0 0, 100% 0, 0 100%',
  //   '0 0, 100% 100%, 0 100%',
  //   '100% 0, 100% 100%, 0 100%'
  // ));
  // `;

  // const FancyDoodle = doodle`
  //   @grid: 8 / 16em;
  //   background: linear-gradient(
  //     @rand(360deg),
  //     @stripe(${primaryColor!}, ${secondaryColor!}, ${color!})
  //   );
  // `;

  const FancyDoodle = doodle`
  @grid: 1 / 100% 100%;
  background-size: 42% 80%;
  background-color: ${color!};
  background-image: @doodle(
    @grid: 2 / 100%;
    background: @pn(${primaryColor!}, ${secondaryColor!}, );
    transform-origin:
      @pn(100% 100%, 0 100%, 100% 0, 0 0);
    transform:
      rotateX(45deg)
      skewY(@pn(34deg, -34deg, -34deg));
  );
  `;

  return (
    <>
      {/* <FancyDoodle /> */}
      {isAccountHaveAvatar ? (
        <>
          <img style={{ width: '100%', height: '100%' }} src={url} onClick={handleOpenDialog} />
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
          <Button startIcon={<AccountCircleOutlinedIcon />} color={'secondary'} variant={'outlined'}>
            <Typography variant={'body2'}>upload avatar</Typography>

            <input {...getInputProps()} />
          </Button>
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
