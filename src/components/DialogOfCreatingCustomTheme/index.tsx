import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputBase,
  FormHelperText
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { useCopyToClipboard, useHover } from 'react-use';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import { useSnackbar } from 'notistack';
import { colord } from 'colord';
import { includes, map, mapValues } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import ExtensionIcon from '@material-ui/icons/Extension';

import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import { useAlpha } from 'hooks/useAlpha.hook';
import DefaultThemePreview from 'components/DefaultThemePreview';
import DraggablePaperComponent from 'components/DraggablePaperComponent';
import { useContrastText } from 'hooks/useContrastText.hook';
import ColorPickerByPas from 'components/ColorChanger';
import SelectColorFormat from 'components/ColorChanger/components/CustomColor/components/SelectColorFormat';
import MenuByPas from 'components/Menu';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { getCapionsOfDefaultThemesArr } from 'store/modules/Color/selectors';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { toChangeDefaultThemesArr } from 'store/modules/Color/actions';
import { useToHex } from 'hooks/useToHex.hook';

import { ColorStateType } from './components/PickerColorElement/types';
import PickerColorElement from './components/PickerColorElement';
import { DialogOfCreatingCustomThemePropsType } from './types';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius }, typography }) => ({
  contentContainer: {},

  wrapperOfElementOfContent: {
    borderRadius,
    [breakpoints.down('sm')]: {
      padding: spacing(1, 0, 0, 0)
    },
    padding: spacing(0, 0.4, 0, 2.8)
  },
  container: {
    '& .MuiPaper-root': {
      position: 'relative'
    },
    '& .MuiDialogTitle-root': {
      position: 'relative',
      '& input': {
        ...typography.h6
      },
      '& p': {
        position: 'absolute',
        bottom: spacing(0.4),
        left: spacing(3.2)
      }
    }
  },
  elementContainer: {
    margin: spacing(0, 0, 2, 0),
    '& legend': {
      padding: spacing(0, 0.8)
    }
  },
  wrapperOfColorPreview: {
    borderColor: useAlpha(palette.text.primary, 0.2)
  },
  wraperOfThemePreview: {
    width: spacing(38),
    [breakpoints.down('xs')]: {
      width: '100%'
    },
    '& > div': {
      width: '100% !important',
      height: spacing(34),

      [breakpoints.down('xs')]: {
        height: spacing(36),
        width: '100%'
      },

      position: 'relative',
      zIndex: 10000000
    }
  },

  containerOfButtonUtils: {
    margin: spacing(0.4, 0, 0, 0)
  },

  containerOfButtonUtilsElement: ({ color }: { color: string }) => ({
    position: 'relative',
    height: spacing(12 * 0.42),
    width: '48%',
    color: useContrastText(color),
    background: useAlpha(color, 0.42),
    border: `2px solid`,
    borderRadius,
    borderColor: useAlpha(color, 0.42),
    '&:hover': {
      cursor: 'pointer',
      background: useAlpha(color, 0.6),
      borderColor: color,
      '& button': {
        borderColor: color
      }
    }
  }),
  containerWithButtonUtilsAndThemePreview: {
    height: '100%',
    [breakpoints.down('sm')]: {
      width: '50%'
    },
    [breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

export enum dialogColorNames {
  PAPER_COLOR = 'paperColor',
  BACKGROUND_COLOR = 'backgroundColor',
  TEXT_COLOR = 'textColor'
}

const DialogOfCreatingCustomTheme: FC<DialogOfCreatingCustomThemePropsType> = ({ isOpen, onClose, theme }) => {
  const [primaryColor, secondaryColor, , mediumEmph] = useThemeColors();
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const [state, copyToClipboard] = useCopyToClipboard();

  const capionsOfDefaultThemesArr = useSelector(getCapionsOfDefaultThemesArr);

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles({ color: secondaryColor! });

  const { isSizeSmall, isSiveIsXs} = useBreakpointNames();

  const dispatch = useDispatch();
  const [colorState, setColorState] = useState<ColorStateType>({
    [dialogColorNames.PAPER_COLOR]: theme.paperMain,
    [dialogColorNames.BACKGROUND_COLOR]: theme.defaultBackgroundMain,
    [dialogColorNames.TEXT_COLOR]: theme.textColor
  });

  const [caption, setCaption] = useState({ isValid: false, value: theme.caption });

  const onSave = () => {
    if (!caption.isValid)
      return enqueueSnackbar({
        message: 'Caption Of theme is not uniq',
        severity: 'error'
      });

    try {
      dispatch(
        toChangeDefaultThemesArr({
          newThemeElement: {
            id: nanoid(),
            caption: caption.value,
            background: {
              default: useToHex(colorState[dialogColorNames.BACKGROUND_COLOR]),
              paper: useToHex(colorState[dialogColorNames.PAPER_COLOR]),
              textColor: useToHex(colorState[dialogColorNames.TEXT_COLOR]),
              type: 'any'
            }
          }
        })
      );
      onClose();
      return enqueueSnackbar({
        message: 'Theme was succsesfully added'
      });
    } catch (err) {
      return enqueueSnackbar({
        message: err + 'Something went wrong',
        severity: 'error'
      });
    }
  };

  const [selectedPreviewElementId, setSelectedPreviewElementId] = useState<string>('');

  const TITLE = 'Create custom theme';

  const background = mapValues(
    {
      default: colorState[dialogColorNames.BACKGROUND_COLOR],
      paper: colorState[dialogColorNames.PAPER_COLOR],
      textColor: colorState[dialogColorNames.TEXT_COLOR]
    },
    color => colord(color).toHex()
  );

  const handleCopyToClipboardColorState = () => {
    copyToClipboard(JSON.stringify(colorState));
    enqueueSnackbar({
      message: 'Theme was copied'
    });
  };

  const handleChangeCaption: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setCaption(state => ({ ...state, value, isValid: !includes(capionsOfDefaultThemesArr, value) }));
  };

  const [isPressed] = useKeyboardJs('ctrl + v');

  useEffect(() => {
    isPressed &&
      navigator.clipboard
        .readText()
        .then(json => {
          setColorState(JSON.parse(json));
          enqueueSnackbar({
            message: 'Theme was pasted'
          });
        })
        .catch(err => {
          enqueueSnackbar({
            message: err + 'Something went wrong',
            severity: 'error'
          });
        });
  }, [isPressed]);

  const defaultThemePreviewProps = {
    background,
    caption: caption.value,
    isThemeSelected: true,
    onClick: handleCopyToClipboardColorState,
    isHeaderHavePaperColor
  };

  const nullityElStateOfButtonUtilMenu = {
    anchorEl: null,
    props: {}
  };

  const [elStateOfButtonUtilMenu, setElStateOfButtonUtilMenu] = useState<any>(nullityElStateOfButtonUtilMenu);

  const [colorFormat, setColorFormat] = useState<string>('rgb');
  const [customColor] = useGetReadableColor(secondaryColor!, theme.paperMain);

  const handleSaveAdvancedColor = (color: string) => {
    setColorState(state => ({ ...state, [selectedPreviewElementId]: color }));
  };

  const handleOpenMenuOfAdvancedColor: MouseEventHandler = ({ currentTarget }) => {
    setElStateOfButtonUtilMenu({
      anchorEl: currentTarget,
      props: { handleSave: handleSaveAdvancedColor, children: ColorPickerByPas, customColor }
    });
  };

  const handleOpenMenuOfCustomColorFormat: MouseEventHandler = ({ currentTarget }) => {
    setElStateOfButtonUtilMenu({
      anchorEl: currentTarget,
      props: {
        children: SelectColorFormat,
        color: secondaryColor,
        customFormatName: colorFormat,
        setCustomFormatName: setColorFormat
      }
    });
  };

  const onMenuClose = () => {
    setElStateOfButtonUtilMenu(nullityElStateOfButtonUtilMenu);
  };

  const [colorFormatButton] = useHover(isHovering => (
    <Grid className={classes.containerOfButtonUtilsElement} onClick={handleOpenMenuOfCustomColorFormat}>
      <BackgroundPlaceholderByPas
        color={useAlpha(secondaryColor!, isHovering ? 0.8 : 0.42)}
        title={'Format '}
        ButtonIcon={ExtensionIcon}
        buttonText={'Format '}
        onClick={handleOpenMenuOfCustomColorFormat}
      />
    </Grid>
  ));

  const [advancedColorButton] = useHover(isHovering => (
    <Grid className={classes.containerOfButtonUtilsElement} onClick={handleOpenMenuOfAdvancedColor}>
      <BackgroundPlaceholderByPas
        color={useAlpha(secondaryColor!, isHovering ? 0.8 : 0.42)}
        title={'Advanced &'}
        ButtonIcon={ArrowDropDownCircleOutlinedIcon}
        buttonText={'Advanced'}
        onClick={handleOpenMenuOfAdvancedColor}
      />
    </Grid>
  ));
  const MenuChildren = elStateOfButtonUtilMenu.props.children;
  return (
    <Dialog
      open={isOpen}
      fullScreen={isSiveIsXs}
      onClose={onClose}
      className={classes.container}
      PaperComponent={DraggablePaperComponent}
      // maxWidth={'xl'}
    >
      <MenuByPas
        open={elStateOfButtonUtilMenu.anchorEl}
        anchorEl={elStateOfButtonUtilMenu.anchorEl}
        onClose={onMenuClose}
        customColor={customColorPlaceholder}
      >
        {!!elStateOfButtonUtilMenu?.props?.children && <MenuChildren {...elStateOfButtonUtilMenu.props} />}
      </MenuByPas>
      {!isSizeSmall && (
        <BackgroundPlaceholderByPas
          isButtonHidden={true}
          title={TITLE}
          color={useAlpha(mediumEmph!, 0.04)}
          size={1000}
        />
      )}

      <DialogTitle>
        <InputBase value={caption.value} onChange={handleChangeCaption} fullWidth />
        {!caption.isValid && <FormHelperText error={!caption.isValid}>Theme caption is not uniq</FormHelperText>}
      </DialogTitle>
      <DialogContent className={classes.contentContainer}>
        <Grid container={!isSizeSmall}>
          <Grid>
            <Grid
              container
              justify={'space-between'}
              direction={'column'}
              className={classes.containerWithButtonUtilsAndThemePreview}
            >
              <Grid>
                <Grid className={classes.wraperOfThemePreview} container>
                  <DefaultThemePreview {...defaultThemePreviewProps} />
                </Grid>
              </Grid>

              <Grid className={classes.containerOfButtonUtils}>
                <Grid container justify={'space-between'}>
                  {colorFormatButton}
                  {advancedColorButton}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <Grid
              className={classes.wrapperOfElementOfContent}
              container
              direction={'column'}
              justify={'space-between'}
              style={{ height: '100%' }}
            >
              {map(colorState, (el, name) => {
                //@ts-ignore
                const color = colord(colorState[name]).toRgb();
                const isSelected = name === selectedPreviewElementId;

                const onClick = () => {
                  !isSelected && setSelectedPreviewElementId(name);
                };
                const setColor = (color: string) => {
                  setColorState(state => ({ ...state, [name]: color }));
                };

                return (
                  <PickerColorElement
                    color={color}
                    colorFormat={colorFormat}
                    setColor={setColor}
                    name={name}
                    key={name}
                    isSelected={isSelected}
                    onClick={onClick}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ActionsButtonGroup
          onClose={onClose}
          onSave={onSave}
          colorOfSaveButton={primaryColor!}
          colorOfCloseButton={mediumEmph!}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfCreatingCustomTheme;
