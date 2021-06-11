import PropTypes from 'prop-types';
import { useState, useEffect, FC } from 'react';
import { useMeasure } from 'react-use';
import {
  Grid,
  makeStyles,
  DialogTitle,
  DialogContent,
  TextField,
  InputBase,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Theme
} from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import { useAlpha } from 'hooks/useAlpha.hook';
import AttributeGroup from '../PakeepElement/components/AttributeGroup';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import {
  ActionsButtonGroupProps,
  AllAttributeGroupProps,
  EditingDialogOfPakeepElementProps,
  IconsUtilsProps,
  InputProps,
  OnChangeInterface,
  StateInteface,
  UseStylesInteface
} from './interface';

const useStyles = makeStyles(({ typography: { h4, h6 }, spacing }: Theme) => {
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

const EditingDialogOfPakeepElement: FC<EditingDialogOfPakeepElementProps> = ({
  title,
  text,
  correctColor,
  correctBackground,
  id,
  dialogIconsUtilsProps,
  customColor,
  dialogAttributeGroupProps,
  handleClosePakeepDialog
}) => {
  const classes = useStyles({ backgroundColor: correctBackground, color: correctColor });
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const [state, setState] = useState<StateInteface>({ title, text });

  useEffect(() => setState({ title, text }), [title, text]);

  const onChange = ({ target: { name, value } }: OnChangeInterface) => setState(state => ({ ...state, [name]: value }));

  const titleInputProps: InputProps = {
    placeholder: 'Title',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'title',
    value: state.title,
    autoFocus: true
  };

  const textInputProps: InputProps = {
    placeholder: 'Text',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'text',
    value: state.text,
    multiline: true
  };

  const JUST_PADDING_VALUE: number = 160;

  const widthOfContainer: number = width - JUST_PADDING_VALUE;

  const arrOfButtonNamesWhichSholudBeHidden: [string] = ['width'];

  const iconsUtilsProps: IconsUtilsProps = {
    widthOfContainer,
    arrOfButtonNamesWhichSholudBeHidden
  };
  const allIconsUtilsProps: AllAttributeGroupProps = { ...dialogIconsUtilsProps, ...iconsUtilsProps };

  const attributeGroupProps = {};
  const allAttributeGroupProps = { ...dialogAttributeGroupProps, ...attributeGroupProps };

  const handleSubmit = () => {
    console.log(state);
  };

  const isOpen: boolean = !!id;

  const actionsButtonGroupProps: ActionsButtonGroupProps = {
    onSave: handleSubmit,
    onClose: handleClosePakeepDialog,
    colorOfCloseButton: customColor && useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor?.hover
  };
  
  const onClose = () => {
    handleClosePakeepDialog();
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
        <DialogContent>
          <AttributeGroup {...allAttributeGroupProps} />
        </DialogContent>

        <DialogActions className={classes.dialogIconsUtilsClass}>
          <IconsUtils {...allIconsUtilsProps} />
          <ActionsButtonGroup {...actionsButtonGroupProps} />
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default EditingDialogOfPakeepElement;
