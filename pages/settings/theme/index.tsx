import { Grid, Typography, makeStyles, useTheme } from '@material-ui/core';
import { colord } from 'colord';
import { customColorPlaceholder } from 'components/AccountAvatar';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import ColorPickerByPas from 'components/ColorChanger';
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
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import DefaultThemePreview from 'components/DefaultThemePreview';
import { useRandomColor } from 'hooks/useRandomColor.hook';
import PickerOfThemeColor from 'components/PickerOfThemeColor';
import clsx from 'clsx';
import MenuByPas from 'components/Menu';
import DialogOfCreatingCustomTheme from 'components/DialogOfCreatingCustomTheme';
import { nanoid } from 'nanoid';
import SliderByPas from 'components/Slider';
import SettingContainer from 'components/SettingContainer';
import { settingUrls } from 'layouts/RouterLayout/denotation';

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
    borderRadius,
    border: '2px solid',
    borderColor: useAlpha(palette.mediumEmphasis?.main!, 0.2),
    '& legend': {
      padding: spacing(0, 0.8)
    }
    // width: spacing(160)
  },

  fieldsetContainer: {
    borderRadius,
    borderColor: useAlpha(palette.mediumEmphasis?.main!, 0.2),
    '& legend': {
      padding: spacing(0, 0.8)
    }
  },
  containerOfRandomThemeGenerator: {
    background: `${useAlpha(palette.maxEmphasis?.main!, 0.04)} !important`,

    '&:hover': {
      background: `${useAlpha(palette.secondary.main, 0.2)}!important`
    }
  },
  borderRadiusContainer: {
    padding: spacing(0.4, 0.8, 0.8, 0.8)
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

    const textColor = isColorLight
      ? colord(randomColor).invert().lighten(0.4).toHex()
      : colord(randomColor).invert().darken(0.4).toHex();

    const newThemeElement = {
      caption: randomColor,
      id: nanoid(),
      background: { default: defaultColor, paper: paperColor, type: isColorLight ? 'light' : 'dark', textColor }
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
        color={useAlpha(isHovering ? secondaryColor! : maxEmph!, isHovering ? 0.8 : 0.42)}
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
        color={useAlpha(isHovering ? secondaryColor! : maxEmph!, isHovering ? 0.8 : 0.42)}
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

  const handleChangeBorderRadius = (__: any, borderRadius: number) => {
    dispatch(toChangeThemeColors({ newThemeColors: { borderRadius } }));
  };
  const [customColorOfElOfThemePicker] = useGetReadableColor(elStateOfThemePicker.color);
  return (
    <Grid container justify={'center'}>
      <SettingContainer container className={classes.colorContainer} justify={'center'}>
        <Grid container justify={'space-between'} id={settingUrls.THEME.COLORS_ID} item>
          {themePickersArr.map(props => {
            return (
              <PickerOfThemeColor
                {...props}
                key={`themePickersArr-${props.title}`}
                isColorRandom={theme.isColorRandom}
                setElStateOfThemePicker={setElStateOfThemePicker}
              />
            );
          })}
        </Grid>
        <Grid
          className={classes.defaultThemesContainer}
          component={'fieldset'}
          id={settingUrls.THEME.DEFAULT_THEMES_ID}
          container
        >
          <legend>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              Default themes
            </Typography>
          </legend>

          <Grid container justify={'space-between'}>
            {randomThemeGenerator}
            {customThemeButton}
            {defaultThemesToChoseArr?.map(({ caption, background, id }) => {
              const isThemeSelected = caption === theme.caption;

              const onClick = () => {
                dispatch(
                  toChangeThemeColors({
                    newThemeColors: {
                      paperMain: background.paper,
                      caption,
                      defaultBackgroundMain: background.default,
                      textColor: background.textColor
                    }
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
              return <DefaultThemePreview {...defaultThemePreviewProps} key={`defaultThemesToChoseArr-${id}`} />;
            })}
          </Grid>
        </Grid>
        <Grid
          container
          item
          id={settingUrls.THEME.BORDER_RADIUS}
          component={'fieldset'}
          className={clsx(classes.fieldsetContainer, classes.borderRadiusContainer)}
        >
          <legend>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
              Border_Radius
            </Typography>
          </legend>

          <SliderByPas
            step={1}
            value={theme.borderRadius}
            // valueLabelDisplay={'on'}
            //@ts-ignore
            onChange={handleChangeBorderRadius}
            max={16}
            defaultValue={4}
            min={0}
            // track={'inverted'}
          />
        </Grid>
      </SettingContainer>
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
  );
};

export default Theme;
