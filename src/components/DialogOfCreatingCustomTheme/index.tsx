import { FC, useState } from 'react';
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
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import { useAlpha } from 'hooks/useAlpha.hook';
import InputsColorUtilsOfCustomColorPicker from 'components/ColorChanger/components/CustomColor/components/InputsColorUtils';
import { colord } from 'colord';
import { keys, map, values } from 'lodash';

import PickerColorElement from './components/PickerColorElement';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import DefaultThemePreview from 'components/DefaultThemePreview';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  contentContainer: {},

  wrapperOfElementOfContent: {
    borderRadius,
    borderColor: useAlpha(palette.mediumEmphasis.main, 0),

    padding: spacing(2, 1)
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
    borderColor: useAlpha(palette.mediumEmphasis.main, 0.2)
  }
}));

export const dialogColorNames = {
  PAPER_COLOR: 'paperColor',
  BACKGROUND_COLOR: 'backgroundColor'
};

const DialogOfCreatingCustomTheme: FC<DialogOfCreatingCustomThemePropsType> = ({ isOpen, onClose, theme }) => {
  const classes = useStyles();
  const [primaryColor, , , mediumEmph] = useThemeColors();
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const dispatch = useDispatch();

  const [colorState, setColorState] = useState({
    [dialogColorNames.PAPER_COLOR]: theme.paperMain,
    [dialogColorNames.BACKGROUND_COLOR]: theme.defaultBackgroundMain
  });

  const onSave = () => {
    console.log(colorState);
  };
  console.log(colorState);

  const TITLE = 'Create custom theme';

  const defaultThemePreviewProps = {
    background:{},
    caption:TITLE,
    isThemeSelected:true,
    // onClick:null,
    isHeaderHavePaperColor
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className={classes.container}>
      <BackgroundPlaceholderByPas isButtonHidden={true} title={TITLE} color={useAlpha(mediumEmph, 0.04)} />
      <DialogTitle>{TITLE}</DialogTitle>
      <DialogContent className={classes.contentContainer}>
        <Grid className={classes.wrapperOfElementOfContent} container>
          {/* <legend>
              <Typography variant={'subtitle2'} color={'textSecondary'}>
                {title}
              </Typography>
            </legend> */}
          <Grid>
            {map(colorState, (el, name) => {
              const color = colord(colorState[name]).toRgb();

              const setColor = (color: string) => {
                setColorState(state => ({ ...state, [name]: color }));
              };

              return <PickerColorElement color={color} setColor={setColor} name={name} key={name} />;
            })}
          </Grid>
          <Grid>
             <DefaultThemePreview {...defaultThemePreviewProps} />;
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
