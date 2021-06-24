import { useState, FC, useEffect } from 'react';
import { useMeasure } from 'react-use';
import { useSelector } from 'react-redux';

import { Grid, makeStyles, DialogTitle, DialogContent, InputBase, Dialog, DialogActions } from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import { useAlpha } from 'hooks/useAlpha.hook';
import ActionsButtonGroup from 'components/ActionsButtonGroup';

import { getPakeeps } from 'store/modules/App/selectors';
import { useFindPakeepUsingId } from 'hooks/useFindPakeepUsingId.hook';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { usePakeepUtilsFunc } from 'hooks/usePakeepUtilsFunc.hook';
import { IconsUtilsArrDenotationNameType } from 'components/IconsUtils/types';
// import AttributeGroup from '../PakeepElement/components/AttributeGroup';

import { EditingDialogOfPakeepElementProps, onChangeType, UseStylesInteface } from './types';

const useStyles = makeStyles(({ typography: { h4, h6 }, spacing }) => {
  return {
    containerClass: ({ backgroundColor, color }: UseStylesInteface) => ({
      backgroundColor,
      color,
      '& button': {
        color
      },
      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        paddingRight: spacing(1.8),
        '& input': {
          // fontSize: spacing(2.8),
          fontSize: h4.fontSize
        }
      },
      '& input,textarea': {
        color,
        caretColor: color,
        '&::selection ': {
          color: backgroundColor,
          backgroundColor: color
        }
      },
      '& textarea': {
        lineHeight: spacing(0.2),
        fontWeight: 200,
        fontSize: h6.fontSize,
        marginTop: spacing(-0.8),
        marginBottom: spacing(-2)
      }
    }),
    dialogIconsUtilsClass: { margin: spacing(-2, 0.4, 0), paddingBottom: spacing(0.4) }
  };
});

const EditingDialogOfPakeepElement: FC<EditingDialogOfPakeepElementProps> = ({ id, handleClosePakeepDialog }) => {
  const findedPakeep = useFindPakeepUsingId(id);
  // if (!findedPakeep) return null;

  const { backgroundColor, color, title, text } = findedPakeep;

  const [state, setState] = useState({ title, text, backgroundColor, color });

  useEffect(() => {
    setState({ title, text, backgroundColor, color });
  }, [findedPakeep]);

  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(backgroundColor, color);

  const correctBackgroundColor = state.backgroundColor;
  const correctColor = customColor.hover;

  const classes = useStyles({ backgroundColor: correctBackgroundColor, color: correctColor });

  const onChange: onChangeType = ({ target: { name, value } }) => {
    setState(state => ({ ...state, [name]: value }));
  };

  const titleInputProps = {
    placeholder: 'Title',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'title',
    value: state.title,
    autoFocus: true
  };

  const textInputProps = {
    placeholder: 'Text',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'text',
    value: state.text,
    multiline: true
  };
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const JUST_PADDING_VALUE = 160;
  const widthOfContainer = width - JUST_PADDING_VALUE;

  const arrOfButtonNamesWhichSholudBeHidden: IconsUtilsArrDenotationNameType[] = ['width'];

  const iconsUtilsFunc = usePakeepUtilsFunc(id);

  const handleSetBackgroundColorPakeep = (backgroundColor:string) => {
    setState(state => ({ ...state, backgroundColor }));
  };
  const handleSetColorPakeep = (color:string) => {
    setState(state => ({ ...state, color }));
  };
  

  const iconsUtilsProps = {
    widthOfContainer,
    id,
    customColor,
    handleSetBackgroundColorPakeep,
    handleSetColorPakeep,
    iconsUtilsFunc,
    arrOfButtonNamesWhichSholudBeHidden
  };

  const attributeGroupProps = {};

  const handleSubmit = () => {
    console.log(state);
  };

  const isOpen = !!id;

  const onClose = () => {
    handleClosePakeepDialog();
  };

  const actionsButtonGroupProps = {
    onSave: handleSubmit,
    onClose,
    colorOfCloseButton: customColor && useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor?.hover
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Grid className={classes.containerClass} ref={ref}>
        <DialogTitle>
          <Grid container>
            <Grid style={{ flex: 1 }}>
              <InputBase {...titleInputProps} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <InputBase {...textInputProps} />
        </DialogContent>
        <DialogContent>{/* <AttributeGroup {...allAttributeGroupProps} /> */}</DialogContent>

        <DialogActions className={classes.dialogIconsUtilsClass}>
          <IconsUtils {...iconsUtilsProps} />
          <ActionsButtonGroup {...actionsButtonGroupProps} />
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default EditingDialogOfPakeepElement;
