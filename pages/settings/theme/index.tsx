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
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useHover } from 'react-use';
import { toChangeDefaultThemesArr, toChangeThemeColors } from 'store/modules/Color/actions';
import { getColorTheme, getDefaultThemesArr } from 'store/modules/Color/selectors';
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
import clsx from 'clsx';
import MenuByPas from 'components/Menu';
import DialogOfCreatingCustomTheme from 'components/DialogOfCreatingCustomTheme';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  colorContainer: {
    gap: spacing(1)
  },

  defaultThemeElementContainer: ({ background, isThemeSelected }: any) => ({
    background: background.default,
    height: spacing(32),
    width: '32.4%',

    [breakpoints.down('md')]: {
      width: '48%'
    },

    [breakpoints.down('sm')]: {
      width: '48%'
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
  },
  containerOfRandomThemeGenerator: {
    background: `${useAlpha(palette.maxEmphasis?.main, 0.04)} !important`,

    '&:hover': {
      background: `${useAlpha(palette.secondary.main, 0.2)}!important`
    }
  }
  // border: `2px solid ${colord(background.default).invert().alpha(0.32).toHex()}`
}));

const Theme: FC<any> = () => {
  const dispatch = useDispatch();
  const [primaryColor, secondaryColor, maxEmph] = useThemeColors();
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const theme = useSelector(getColorTheme);

  const defaultThemesToChoseArr = useSelector(getDefaultThemesArr);

  const {
    palette: { background }
  } = useTheme();

  const classes = useStyles({ background });

  const handleGenegateRandomColor = () => {
    const randomColor = useRandomColor();

    const isColorLight = useIsColorLight(randomColor);

    const defaultColor = isColorLight
      ? colord(randomColor).lighten(0.18).toHex()
      : colord(randomColor).darken(0.18).toHex();

    const paperColor = isColorLight
      ? colord(randomColor).lighten(0.1).toHex()
      : colord(randomColor).darken(0.1).toHex();

    const color = isColorLight
      ? colord(randomColor).invert().lighten(0.4).toHex()
      : colord(randomColor).invert().darken(0.1).toHex();

    const newThemeElement = {
      caption: randomColor,
      background: { default: defaultColor, paper: paperColor, type: isColorLight ? 'light' : 'dark', color }
    };

    dispatch(toChangeDefaultThemesArr({ newThemeElement }));
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

  const [isCustomThemeDialogOpen, setIsCustomThemeDialogOpen] = useState(false);

  const handleOpenCustomThemeDialogOpen = () => {
    setIsCustomThemeDialogOpen(true);
  };

  const handleCloseCustomThemeDialogOpen = () => {
    setIsCustomThemeDialogOpen(false);
  };

  const [randomThemeGenerator] = useHover(isHovering => (
    <Grid
      className={clsx(classes.defaultThemeElementContainer, classes.containerOfRandomThemeGenerator)}
      onClick={handleGenegateRandomColor}
    >
      <BackgroundPlaceholderByPas
        color={useAlpha(isHovering ? secondaryColor : maxEmph, isHovering ? 0.8 : 0.42)}
        title={'Generate random theme & '}
        ButtonIcon={OfflineBoltOutlinedIcon}
        buttonText={'Generate random theme'}
        onClick={handleGenegateRandomColor}
      />
    </Grid>
  ));

  const [customThemeButton] = useHover(isHovering => (
    <Grid
      className={clsx(classes.defaultThemeElementContainer, classes.containerOfRandomThemeGenerator)}
      onClick={handleOpenCustomThemeDialogOpen}
    >
      <BackgroundPlaceholderByPas
        color={useAlpha(isHovering ? secondaryColor : maxEmph, isHovering ? 0.8 : 0.42)}
        title={'Create custom theme & '}
        ButtonIcon={AddCircleOutlineOutlinedIcon}
        buttonText={'Create custom theme'}
        onClick={handleOpenCustomThemeDialogOpen}
      />
    </Grid>
  ));

  const [elStateOfThemePicker, setElStateOfThemePicker] = useState<any>({
    anchorEl: null,
    handleSave: null,
    color: ''
  });

  const handleCloseMenuOfThemePicker = () => {
    setElStateOfThemePicker(false);
  };
  const [customColorOfElOfThemePicker] = useGetReadableColor(elStateOfThemePicker.color);
  return (
    <Grid container justify={'center'}>
      <Grid container className={classes.colorContainer} justify={'center'} lg={9} xl={8} md={8} xs={11} sm={12}>
        <Grid xl={10} lg={11} md={12} xs={12} container sm={11} justify={'space-between'}>
          {themePickersArr.map(props => {
            return (
              <PickerOfThemeColor
                key={`themePickersArr-${props.title}`}
                {...props}
                isColorRandom={theme.isColorRandom}
                setElStateOfThemePicker={setElStateOfThemePicker}
              />
            );
          })}
        </Grid>
        <Grid className={classes.defaultThemesContainer} component={'fieldset'} xl={10} lg={11} md={12} xs={12} sm={11}>
          <legend>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              Default themes
            </Typography>
          </legend>

          <Grid container justify={'space-between'}>
            {randomThemeGenerator}
            {customThemeButton}
            {defaultThemesToChoseArr?.map(({ caption, background }) => {
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

          <MenuByPas
            anchorEl={elStateOfThemePicker.anchorEl}
            keepMounted
            customColor={customColorPlaceholder}
            onClose={handleCloseMenuOfThemePicker}
            open={!!elStateOfThemePicker.anchorEl}
            // className={classes.menuContainer}
          >
            <ColorPickerByPas handleSave={elStateOfThemePicker.handleSave} customColor={customColorOfElOfThemePicker} />
          </MenuByPas>

          {isCustomThemeDialogOpen && (
            <DialogOfCreatingCustomTheme
              onClose={handleCloseCustomThemeDialogOpen}
              isOpen={isCustomThemeDialogOpen}
              theme={theme}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Theme;
