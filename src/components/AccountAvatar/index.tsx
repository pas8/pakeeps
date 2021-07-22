import { useDispatch } from 'react-redux';
import { FC } from 'react';
import { makeStyles, Grid, Button, Typography, MenuItem } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { CustomColorType } from 'models/types';
import { toChangeAvatarProperties } from 'store/modules/App/actions';
import { defaultAvatarProperties } from 'store/modules/App/reducers';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import MenuByPas from 'components/Menu';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { AccountAvatarPropsType } from './types';

export const customColorPlaceholder: CustomColorType = {
  bgHover: '',
  bgUnHover: '',
  unHover: '',
  secondaryColor: '',
  hover: '',
  isUseDefault: true
} as const;

const useStyles = makeStyles(
  ({
    spacing,
    transitions,
    shape: { borderRadius },
    breakpoints,
    palette: { secondary,  background, text }
  }) => ({
    elementOfEditMenu: ({ isHaveBgColor, backgroundColor, isBgColorDark }: any) => {
      const color = isBgColorDark ? text.primary : isHaveBgColor ? backgroundColor : secondary.main;
      return {
        padding: spacing(1.2, 2),
        color:  text.secondary,
        '& svg': {
          margin: spacing(0, 0.8, 0, -1)
        },
        '&:hover': {
          color: useAlpha(color, 0.8),
          background: useAlpha(color)
        }
      };
    },
    containerOfUploadButton: {
      // marginTop: '6%',

      '& button': {
        background: background.default,
        zIndex: 10,
        '&:hover': {
          background: background.default
        }
      }
    },

    bg: ({ isDragActive }: any) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
      borderRadius,
      right: 0,
      zIndex: 0,
      bottom: 0,

      '& p': {
        userSelect: 'none',
        color: isDragActive ? secondary.main : useAlpha(text.secondary, 0.42),
        width: '200%',
        height: '300%',
        lineHeight: '32px',
        transform: 'rotate(42deg) translateX(-42%) translateY(-8%)'
      }
    })
  })
);

const AccountAvatar: FC<AccountAvatarPropsType> = ({
  isAccountHaveAvatar,
  handleOpenDialog,
  url,
  isDragActive,
  getInputProps,
  backgroundColor,
  isHaveBgColor,
  borderRadius,
  onClose,
  anchorEl
}) => {
  const isBgColorDark = !useIsColorLight(backgroundColor);

  const classes = useStyles({ backgroundColor, isHaveBgColor, isDragActive, isBgColorDark });
  const dispatch = useDispatch();

  const [primaryColor, secondaryColor] = useThemeColors();

  const handleDeleteAvatar = () => {
    dispatch(toChangeAvatarProperties({ avatarProperties: defaultAvatarProperties }));
    onClose();
  };

  const editMenuArr = [
    // { title: 'Upload new avatar', onClick: onClose, iconName: 'account', isInput: true },
    { title: 'Edit current avatar', onClick: handleOpenDialog, iconName: 'edit' },
    { title: 'Delete avatar', onClick: handleDeleteAvatar, iconName: 'delete' }
  ];

  const bgTextArr = Array(400).fill('Drag & Drop & ');

  return (
    <>
      {/* <FancyDoodle /> */}
      {isAccountHaveAvatar ? (
        <>
          {!anchorEl && <input {...getInputProps()} />}
          <img style={{ width: '106%', height: '106%', margin: '-6%' }} src={url} />
        </>
      ) : (
        <>
          <Grid className={classes.containerOfUploadButton}>
            <Button startIcon={<AccountCircleOutlinedIcon />} color={'secondary'} variant={'outlined'} size={'small'}>
              <Typography variant={'body2'}>upload avatar</Typography>

              <input {...getInputProps()} />
            </Button>
          </Grid>
          <Grid className={classes.bg}>
            <Typography variant={'body2'}>{bgTextArr}</Typography>
          </Grid>
        </>
      )}
      <MenuByPas
        open={!!anchorEl}
        customColor={{
          ...customColorPlaceholder,
          bgHover: backgroundColor,
          isUseDefault: !isBgColorDark || !isHaveBgColor
        }}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        {editMenuArr.map(({ title, onClick, iconName }) => {
          const [icon] = useTakeIcon(iconName);
          return (
            <MenuItem onClick={onClick} className={classes.elementOfEditMenu} key={`editMenuArr-${title}`}>
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

// const FancyDoodle = doodle`
// :doodle {
//   @grid: 2 / 4vmax;
//   // background: ${primaryColor};
// }
// --hue: calc(180 + 1.5 * @row * @col);
// background: hsl(const(--hue), 50%, 70%);
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

// const FancyDoodle = doodle`
// @grid: 1 / 100% 100%;
// background-size: 42% 80%;
// background-color: ${color!};
// background-image: @doodle(
//   @grid: 2 / 100%;
//   background: @pn(${primaryColor!}, ${secondaryColor!}, );
//   transform-origin:
//     @pn(100% 100%, 0 100%, 100% 0, 0 0);
//   transform:
//     rotateX(45deg)
//     skewY(@pn(34deg, -34deg, -34deg));
// );
// `;
