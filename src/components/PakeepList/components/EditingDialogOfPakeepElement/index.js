import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
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
  IconButton
} from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import { useAlpha } from 'hooks/useAlpha.hook';
import AttributeGroup from '../PakeepElement/components/AttributeGroup';
import ActionsButtonGroup from 'components/ActionsButtonGroup';

const useStyles = makeStyles(({ typography: { h4, h6 }, spacing }) => {
  return {
    container: ({ backgroundColor, color }) => ({
      backgroundColor,
      color,
      '& button': {
        color
      },
      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        paddingRight: spacing(1.8),
        '& input': {
          fontSize: spacing(2.8),
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
    dialogIconsUtils: { margin: spacing(-2, 0.4, 0), paddingBottom: spacing(0.4) }
  };
});

const EditingDialogOfPakeepElement = ({
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
  const [ref, { width }] = useMeasure();

  const [state, setState] = useState({ title, text });

  useEffect(() => setState({ title, text }), [title, text]);

  const onChange = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

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
  const JUST_PADDING_VALUE = 160;

  const widthOfContainer = width - JUST_PADDING_VALUE;

  const arrOfButtonNamesWhichSholudBeHidden = ['width'];

  const iconsUtilsProps = {
    widthOfContainer,
    arrOfButtonNamesWhichSholudBeHidden
  };
  const allIconsUtilsProps = { ...dialogIconsUtilsProps, ...iconsUtilsProps };

  const attributeGroupProps = {};
  const allAttributeGroupProps = { ...dialogAttributeGroupProps, ...attributeGroupProps };
  const handleSubmit = () => console.log(state);

  const isOpen = !!id;

  const actionsButtonGroupProps = {
    onSave: handleSubmit,
    onClose: handleClosePakeepDialog,
    colorOfCloseButton:customColor &&  useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor?.hover
  };

  return (
    <Dialog open={isOpen} onClose={handleClosePakeepDialog}>
      <Grid className={classes.container} ref={ref}>
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

        <DialogActions className={classes.dialogIconsUtils}>
          <IconsUtils {...allIconsUtilsProps} />
          <ActionsButtonGroup {...actionsButtonGroupProps} />
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

EditingDialogOfPakeepElement.propTypes = {
  correctBackground: PropTypes.any,
  correctColor: PropTypes.any,
  customColor: PropTypes.any,
  dialogIconsUtilsProps: PropTypes.object,
  id: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
};

export default EditingDialogOfPakeepElement;
