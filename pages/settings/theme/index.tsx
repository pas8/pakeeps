import { Grid, Typography, makeStyles, useTheme, Button } from '@material-ui/core';
import { colord } from 'colord';
import { customColorPlaceholder } from 'components/AccountAvatar';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import ColorPickerByPas from 'components/ColorChanger';
import ThemeColorPicker from 'components/ThemeColorPicker';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHover } from 'react-use';
import { toChangeThemeColors } from 'store/modules/Color/actions';
import { getColorTheme } from 'store/modules/Color/selectors';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
const useStyles = makeStyles(({ spacing, palette }) => ({
  colorContainer: {
    // gap: 12
  },

  defaultThemesContainer: {
    padding: spacing(1),
    borderRadius: 4,
    border: '2px solid',
    borderColor: useAlpha(palette.mediumEmphasis?.main, 0.2),
    '& legend': {
      padding: spacing(0, 0.8)
    }
    // width: spacing(160)
  },

  defaultThemeElementContainer: ({ background, isThemeSelected }: any) => ({
    background: background.default,
    height: spacing(32),
    width: spacing(32),
    position: 'relative',
    borderRadius: 4,
    marginRight: spacing(1),
    border: `3px solid `,
    borderColor: isThemeSelected ? palette.primary.main : background.paper,
    '&:hover': {
      cursor: 'pointer',
      borderColor: palette.secondary.main
    }

    // padding:spacing(1)
  }),

  headerOfThemePrewier: ({ background, isHeaderHavePaperColor }: any) => ({
    height: spacing(4.4),
    width: '100%',
    margin: spacing(-0.2, 0, 0),
    padding: spacing(0, 2),
    background: isHeaderHavePaperColor ? palette.primary.main : background.paper,
    '& > div': {
      height: spacing(2.4),
      background: colord(background.default).invert().alpha(0.32).toHex(),
      borderRadius: 4
    }
  }),

  leftPartPreviewOfHeaderOfThemePrewier: ({ background: { type } }: any) => ({
    width: '32%',
    color: type === 'light' ? '#000' : '#fff',
    padding: spacing(0, 1)
  }),

  rightPartPreviewOfHeaderOfThemePrewier: {
    width: '24%',
    background: `${palette.secondary.main} !important`
  },
  bodyOfThemePrevier: {
    height: '80%',
    margin: spacing(2, 0, 0, 0)
    // width: '100%'
  },
  navOfThemePrevier: ({ background }: any) => ({
    borderRadius: 4,
    margin: spacing(0, 0, 0, 2),

    width: '20%',
    height: spacing(14),
    // border: `1px solid ${colord(background.default).invert().alpha(0.32).toHex()}`,
    '& > div': {
      height: '20%',
      width: '100%',
      marginBottom: '12%',
      '&:nth-child(2)': {
        height: '42%',
        width: '100%'
      },

      '& > div': {
        borderRadius: 2,
        width: '90%',
        height: '100%',
        background: colord(background.default).invert().alpha(0.32).toHex()
      }
    }

    // background:background.pa
  }),

  activeFolderPrevier: ({ background }: any) => ({
    // background: background.paper
    '& > div': {
      background: `${palette.primary.main} !important`
    }
  }),

  pakeepPrevier: ({ background }: any) => ({
    height: spacing(18 + 0.8),
    margin: spacing(0, 0, 0, 2),
    padding: spacing(1),
    borderRadius: 4,
    width: spacing(16.8),
    background: background.paper,

    '& .titleOfPakeepPrevier': {
      height: spacing(2.8)
    },
    '& .textOfPakeepPrevier': {
      borderRadius: 2,

      background: colord(background.default).invert().alpha(0.32).toHex(),
      width: '100%',
      margin: spacing(1, 0, 0, 0),

      height: spacing(6.8)
    }
  }),
  eventsContainerOfPakeepPrevier: ({ background }: any) => ({
    height: spacing(2.4),

    background: 'transparent !important',

    margin: spacing(0.8, 0, 0, 0),
    width: '80%',

    '& > div:nth-child(2)': {
      background: `${palette.mixed.main} !important`
    },

    '& > div': {
      borderRadius: 2,
      width: '46.8%',
      height: '100%',
      background: colord(background.default).invert().alpha(0.32).toHex()
    }
  }),

  labelContainerOfPakeepPrevier: ({ background }: any) => ({
    height: spacing(2),

    background: 'transparent !important',

    margin: spacing(0.8, 0, 0, 0),
    width: '92%',

    '& > div:nth-child(1)': {
      background: `${palette.primary.main} !important`
    },

    '& > div:nth-child(2)': {
      background: `${palette.secondary.main} !important`
    },

    '& > div': {
      borderRadius: 2,

      width: '30%',
      height: '100%',

      // margin: spacing(0, 0.6, 0, 0),

      background: colord(background.default).invert().alpha(0.32).toHex()
    }
  }),
  caption: ({ background }: any) => ({
    // position:'absolute',
    // bottom:0,
    // left:0,

    padding: spacing(0.4, 0.8),
    borderRadius: 2,
    background: colord(background.default).invert().alpha(0.32).toHex(),
    color: colord(background.default).invert().alpha(0.8).toHex()
  }),
  randomBgContainer: () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderRadius: 16,
    right: 0,
    zIndex: 0,
    bottom: 0,

    '& p': {
      userSelect: 'none',
      color: useAlpha(palette.mediumEmphasis?.main, 0.42),
      width: '200%',
      height: '300%',
      lineHeight: '32px',
      transform: 'rotate(42deg) translateX(-42%) translateY(-8%)'
    }
  })
  // border: `2px solid ${colord(background.default).invert().alpha(0.32).toHex()}`
}));

const Theme: FC<any> = () => {
  const dispatch = useDispatch();
  const [primaryColor, secondaryColor, maxEmph] = useThemeColors();

  const [customColor] = useGetReadableColor(primaryColor!);

  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const theme = useSelector(getColorTheme);
  const handleSaveSecondaryColor = (secondaryMain: string) => {
    dispatch(toChangeThemeColors({ newThemeColors: { secondaryMain } }));
  };

  const handleSavePrimaryColor = (primaryMain: string) => {
    dispatch(toChangeThemeColors({ newThemeColors: { primaryMain } }));
  };

  const themePickersArr = [
    {
      title: 'Primary color',
      color: primaryColor!,
      handleSave: handleSavePrimaryColor
    },
    {
      title: 'Secondary color',
      color: secondaryColor!,
      handleSave: handleSaveSecondaryColor
    }
  ];

  const defaultThemesArr = [
    {
      caption: 'Classic',
      background: { default: '#303030', paper: '#424242', type: 'dark' }
    },
    {
      caption: 'Full dark',
      background: { default: '#080808', paper: '#202020', type: 'dark' }
    },

    {
      caption: 'Dark blue',
      background: { default: '#000016', paper: '#000042', type: 'dark' }
    },

    {
      caption: 'Dark red',
      background: { default: '#160000', paper: '#420000', type: 'dark' }
    },

    {
      caption: 'Full White',
      background: { default: 'rgb(242, 242, 242)', paper: 'rgb(220, 220, 220)', type: 'light' }
    }
    // {
    //   caption: '',
    //   background: { default: 'rgb(242, 242, 242)', paper: 'rgb(220, 220, 220)', type: 'light' }
    // }
  ] as const;
  const {
    palette: { background }
  } = useTheme();
  const classes = useStyles({ background });

  // const bgTextArr = Array(400).fill(' ');

  const [randomColorGenerator] = useHover(isHovering => (
    <Grid className={classes.defaultThemeElementContainer}>
      <BackgroundPlaceholderByPas
        color={useAlpha(isHovering ? secondaryColor : maxEmph,isHovering ?  0.8 :  0.42)}
        title={'Generate random theme & '}
        ButtonIcon={OfflineBoltOutlinedIcon}
        buttonText={'Generate random theme'}
      />
    </Grid>
  ));

  return (
    <Grid container className={classes.colorContainer}>
      {/* {themePickersArr.map(props => (
        <ThemeColorPicker {...props} key={props.title} />
      ))} */}

      <fieldset className={classes.defaultThemesContainer}>
        <legend>
          <Typography variant={'subtitle1'} color={'textSecondary'}>
            Default themes
          </Typography>
        </legend>

        <Grid container>
          {randomColorGenerator}

          {defaultThemesArr.map(({ caption, background }) => {
            const isThemeSelected = caption === theme.caption;

            const onClick = () => {
              dispatch(
                toChangeThemeColors({
                  newThemeColors: {
                    defaultBackgroundMain: background.default,
                    type: background.type,
                    caption,
                    paperMain: background.paper
                  }
                })
              );
            };

            const classes = useStyles({ background, isHeaderHavePaperColor, isThemeSelected });

            return (
              <Grid className={classes.defaultThemeElementContainer} onClick={onClick}>
                <Grid>
                  <Grid
                    className={classes.headerOfThemePrewier}
                    justify={'space-between'}
                    alignItems={'center'}
                    container
                  >
                    <Grid className={classes.leftPartPreviewOfHeaderOfThemePrewier}>
                      {/* <Typography variant={'body2'}>{caption}</Typography> */}
                    </Grid>
                    <Grid className={classes.rightPartPreviewOfHeaderOfThemePrewier}></Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.bodyOfThemePrevier} container>
                  <Grid className={classes.navOfThemePrevier} container>
                    <Grid className={classes.activeFolderPrevier}>
                      <Grid />
                    </Grid>

                    {Array(2).fill(
                      <Grid>
                        <Grid />
                      </Grid>
                    )}
                  </Grid>
                  <Grid className={classes.pakeepPrevier}>
                    <Grid className={'titleOfPakeepPrevier'}>
                      <Typography variant={'button'} className={classes.caption}>
                        {' '}
                        {caption}{' '}
                      </Typography>
                    </Grid>
                    <Grid className={'textOfPakeepPrevier'}></Grid>

                    <Grid className={classes.eventsContainerOfPakeepPrevier} container justify={'space-between'}>
                      {Array(2).fill(
                        <Grid>
                          <Grid />
                        </Grid>
                      )}
                    </Grid>

                    <Grid className={classes.labelContainerOfPakeepPrevier} container justify={'space-between'}>
                      {Array(2 + 1).fill(<Grid></Grid>)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </fieldset>
    </Grid>
  );
};

export default Theme;
