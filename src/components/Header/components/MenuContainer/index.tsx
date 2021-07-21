import { FC } from 'react';
import { Grid, MenuItem, makeStyles, Menu, Typography } from '@material-ui/core';
import { HeaderMenuContainerPropsType } from 'components/Header/types';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette, typography: { subtitle2, subtitle1 } }) => ({
  containerOfHeaderAvatarButton: {
    maxWidth: spacing(4.2),
    height: spacing(4.2),
    marginLeft: spacing(0.8),
    padding: 0,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  menuItemContainer: {
    '&:hover div': {
      color: palette.getContrastText(palette.secondary.main)
    },
    '& div': {
      color: palette.text.secondary,
      zIndex: 10000
    },
    '& p': {
      ...subtitle2,
      fontSize: subtitle1.fontSize
    },
    '&:hover .MuiTouchRipple-root': {
      color:palette.getContrastText(palette.secondary.main),
      background: useAlpha(palette.secondary.main, 1)
    },
    '& svg': {
      margin: spacing(0, 1.2, 0,-0.6)
    }
  },
  menuChildContainer: {
    borderRadius,
    overflow: 'hidden',
    background: palette.background.default,
    border: `1px solid ${palette.secondary.main}`
  }
}));

const HeaderMenuContainer: FC<HeaderMenuContainerPropsType> = ({
  coordinates,
  arr,
  onClose,
  componentWhenArrIsEmpty
}) => {
  const classes = useStyles();

  return (
    <Menu open={true} onClose={onClose} anchorReference={'anchorPosition'} anchorPosition={coordinates}>
      <Grid className={classes.menuChildContainer}>
        {!!componentWhenArrIsEmpty && !arr.length
          ? componentWhenArrIsEmpty
          : arr.map(({ text, onClick, iconName = '', id, customIconComponent: CustomIconComponent }, idx) => {
              const [icon] = useTakeIcon(iconName);
              return (
                <MenuItem onClick={onClick} className={classes.menuItemContainer} key={`${idx}_${id}_${text}`}>
                  <Grid container alignItems={'center'}>
                    {!!iconName ? (
                      icon
                    ) : !!CustomIconComponent ? (
                      <Grid>
                        <CustomIconComponent />
                      </Grid>
                    ) : null}
                    <Typography> {text} </Typography>
                  </Grid>
                </MenuItem>
              );
            })}
      </Grid>
    </Menu>
  );
};

export default HeaderMenuContainer;
