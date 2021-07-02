import { FC, MouseEventHandler, useState } from 'react';
import { DialogOfCreatingCustomThemePropsType } from './types';
import {
  Grid,
  Typography,
  makeStyles,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import ExtensionIcon from '@material-ui/icons/Extension';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import ExtensionOutlinedIcon from '@material-ui/icons/ExtensionOutlined';
import { useAlpha } from 'hooks/useAlpha.hook';
import InputsColorUtilsOfCustomColorPicker from 'components/ColorChanger/components/CustomColor/components/InputsColorUtils';
import { colord } from 'colord';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import { keys, map, mapValues, values } from 'lodash';

import PickerColorElement from './components/PickerColorElement';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import DefaultThemePreview from 'components/DefaultThemePreview';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import DraggablePaperComponent from 'components/DraggablePaperComponent';
import { useHover, useToggle } from 'react-use';
import { useContrastText } from 'hooks/useContrastText.hook';
import ColorPickerByPas from 'components/ColorChanger';
import SelectColorFormat from 'components/ColorChanger/components/CustomColor/components/SelectColorFormat';
import MenuByPas from 'components/Menu';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  contentContainer: {},

  wrapperOfElementOfContent: {
    borderRadius,
    // borderColor: useAlpha(palette.mediumEmphasis.main, 0),

    padding: spacing(0, 0.4, 0, 2.8)
  },
  container: {
    '& .MuiPaper-root': {
      position: 'relative'
    }
  },
  elementContainer: {
    margin: spacing(0, 0, 2, 0),
    '& legend': {
      padding: spacing(0, 0.4)
    }
  },
  wrapperOfColorPreview: {
    borderColor: useAlpha(palette.text.primary, 0.2)
  },
  wraperOfThemePreview: {
    width: spacing(36),

    '& > div': {
      width: '100% !important',
      height: spacing(34),

      position: 'relative',
      zIndex: 10000000
    }
  },

  containerOfButtonUtils: {
    margin: spacing(0.4, 0, 0, 0)
  },

  containerOfButtonUtilsElement: ({ color }: { color: string }) => ({
    // background: color,
    // width: 140,
    position: 'relative',
    // margin: spacing(0, 0.6, 0, 0),
    height: spacing(12 * 0.42),
    width: '48%',

    // [breakpoints.down('lg')]: {
    //   width: '31%'
    // },

    color: useContrastText(color),
    // '&:hover': {
    background: useAlpha(color, 0.42),
    // }

    border: `2px solid`,
    borderRadius,
    borderColor: useAlpha(color, 0.42),
    '&:hover': {
      cursor: 'pointer',
      // background: useAlpha(color, 0.6),
      background: useAlpha(color, 0.6),

      borderColor: color,
      '& button': {
        borderColor: color
      }
    }
  })
}));

export const dialogColorNames = {
  PAPER_COLOR: 'paperColor',
  BACKGROUND_COLOR: 'backgroundColor',
  TEXT_COLOR: 'textColor'
};

const DialogOfCreatingCustomTheme: FC<DialogOfCreatingCustomThemePropsType> = ({ isOpen, onClose, theme }) => {
  const [primaryColor, secondaryColor, , mediumEmph] = useThemeColors();
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const classes = useStyles({ color: secondaryColor! });

  const { isSizeSmall } = useBreakpointNames();

  const dispatch = useDispatch();

  const [colorState, setColorState] = useState({
    [dialogColorNames.PAPER_COLOR]: theme.paperMain,
    [dialogColorNames.BACKGROUND_COLOR]: theme.defaultBackgroundMain,
    [dialogColorNames.TEXT_COLOR]: theme.textColor
  });

  const onSave = () => {
    console.log(colorState);
  };

  const [selectedPreviewElementId, setSelectedPreviewElementId] = useState<string>('');

  const TITLE = 'Create custom theme';
  const CAPTION = 'Custom theme';

  const background = mapValues(
    {
      default: colorState[dialogColorNames.BACKGROUND_COLOR],
      paper: colorState[dialogColorNames.PAPER_COLOR],
      textColor: colorState[dialogColorNames.TEXT_COLOR]
    },
    color => colord(color).toHex()
  );

  const defaultThemePreviewProps = {
    background,
    caption: CAPTION,
    isThemeSelected: true,
    onClick: null,
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
        color={useAlpha(secondaryColor, isHovering ? 0.8 : 0.42)}
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
        color={useAlpha(secondaryColor, isHovering ? 0.8 : 0.42)}
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
      onClose={onClose}
      className={classes.container}
      PaperComponent={DraggablePaperComponent}
      maxWidth={'xl'}
    >
      <MenuByPas
        open={elStateOfButtonUtilMenu.anchorEl}
        anchorEl={elStateOfButtonUtilMenu.anchorEl}
        onClose={onMenuClose}
        customColor={customColorPlaceholder}
      >
        {!!elStateOfButtonUtilMenu?.props?.children && <MenuChildren {...elStateOfButtonUtilMenu.props} />}
      </MenuByPas>
      <BackgroundPlaceholderByPas isButtonHidden={true} title={TITLE} color={useAlpha(mediumEmph, 0.04)} />
      <DialogTitle>{TITLE}</DialogTitle>
      <DialogContent className={classes.contentContainer}>
        <Grid container>
          <Grid>
            <Grid container justify={'space-between'} direction={'column'} style={{ height: '100%' }}>
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
              {/* <Grid > */}
              {map(colorState, (el, name) => {
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
              {/* </Grid> */}
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
