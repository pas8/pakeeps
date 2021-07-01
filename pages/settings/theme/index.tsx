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
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import { random } from 'lodash';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import DefaultThemePreview from 'components/DefaultThemePreview';
import { colorColumnArr } from 'components/ColorChanger/components/CustomColor';
import ColumnElementOfPreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples/components/Column/components/ColumnElement';
import { useRandomColor } from 'hooks/useRandomColor.hook';
import PickerOfThemeColor from 'components/PickerOfThemeColor';
const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  colorContainer: {
    gap: spacing(0.4)
  },

  defaultThemeElementContainer: ({ background, isThemeSelected }: any) => ({
    background: background.default,
    height: spacing(32),
    width: '32.4%',

    [breakpoints.down('md')]: {
      width: '48%'
    },

    [breakpoints.down('sm')]: {
      width: '100%'
    },

    [breakpoints.down('xs')]: {
      width: '100%'
    },
    position: 'relative',
    borderRadius,
    margin: spacing(0, 0, 1, 0),
    border: `3px solid `,
    borderColor: background.paper,
    '&:hover': {
      cursor: 'pointer',
      borderColor: palette.secondary.main
    }

    // padding:spacing(1)
  }),

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

  colorPaletteContainer: {
    borderRadius,
    padding: spacing(0, 1, 0.8),
    borderColor: useAlpha(palette.mediumEmphasis?.main, 0.2),
    '& legend': {
      padding: spacing(0, 0.8)
    }
  }

  // border: `2px solid ${colord(background.default).invert().alpha(0.32).toHex()}`
}));

const Theme: FC<any> = () => {
  const dispatch = useDispatch();
  const [primaryColor, secondaryColor, maxEmph] = useThemeColors();

  const [customColor] = useGetReadableColor(primaryColor!);

  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const theme = useSelector(getColorTheme);

  const [br] = useCustomBreakpoint();
  console.log(br);

  const defaultThemesArr: { caption: string; background: { default: string; paper: string; type: string } }[] = [
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
  ];

  const [themeArr, setThemeArr] = useState(defaultThemesArr);

  const {
    palette: { background }
  } = useTheme();

  const classes = useStyles({ background });

  // const bgTextArr = Array(400).fill(' ');

  const handleGenegateRandomColor = () => {
    const randomColor = useRandomColor();

    const isColorLight = useIsColorLight(randomColor);

    const defaultColor = isColorLight
      ? colord(randomColor).lighten(0.28).toHex()
      : colord(randomColor).darken(0.28).toHex();

    const paperColor = isColorLight
      ? colord(randomColor).lighten(0.2).toHex()
      : colord(randomColor).darken(0.2).toHex();

    const randomTheme = {
      caption: randomColor,
      background: { default: defaultColor, paper: paperColor, type: isColorLight ? 'light' : 'dark' }
    };

    setThemeArr(state => [randomTheme, ...state]);
  };

  const handleSaveSecondaryColor = (secondaryMain: string, isColorRandom = false) => {
    dispatch(toChangeThemeColors({ newThemeColors: { secondaryMain, isColorRandom } }));
  };

  const handleSavePrimaryColor = (primaryMain: string, isColorRandom = false) => {
    dispatch(toChangeThemeColors({ newThemeColors: { primaryMain, isColorRandom } }));
  };

  const themePickersArr = [
    {
      title: 'Primary color',
      color: primaryColor!,
      handleChangeColor: handleSavePrimaryColor
    },
    {
      title: 'Secondary color',
      color: secondaryColor!,
      handleChangeColor: handleSaveSecondaryColor
    }
  ];

  const [randomThemeGenerator] = useHover(isHovering => (
    <Grid className={classes.defaultThemeElementContainer}>
      <BackgroundPlaceholderByPas
        color={useAlpha(isHovering ? secondaryColor : maxEmph, isHovering ? 0.8 : 0.42)}
        title={'Generate random theme & '}
        ButtonIcon={OfflineBoltOutlinedIcon}
        buttonText={'Generate random theme'}
        onClick={handleGenegateRandomColor}
      />
    </Grid>
  ));

  return (
    <Grid container justify={'center'}>
      <Grid container className={classes.colorContainer} justify={'center'} lg={9} xl={8} md={8} xs={11} sm={11}>
        {themePickersArr.map(props => {
          return (
            <PickerOfThemeColor key={`themePickersArr-${props.title}`} {...props} isColorRandom={theme.isColorRandom} />
          );
        })}
        <Grid className={classes.defaultThemesContainer} component={'fieldset'} xl={10} lg={11} md={12} xs={12} sm={8}>
          <legend>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              Default themes
            </Typography>
          </legend>

          <Grid container justify={'space-between'}>
            {randomThemeGenerator}

            {themeArr.map(({ caption, background }) => {
              const isThemeSelected = caption === theme.caption;

              const onClick = () => {
                dispatch(
                  toChangeThemeColors({
                    newThemeColors: { paperMain: background.paper, caption, defaultBackgroundMain: background.default }
                  })
                );
              };

              const defaultThemePreviewProps = {
                background,
                caption,
                isThemeSelected,
                onClick,
                isHeaderHavePaperColor
              };
              return <DefaultThemePreview {...defaultThemePreviewProps} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Theme;
