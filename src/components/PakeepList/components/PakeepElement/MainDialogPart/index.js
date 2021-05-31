import { Grid, makeStyles, DialogTitle, DialogContent, TextField, InputBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(({ typography: { h5 }, spacing }) => {
  return {
    container: ({ backgroundColor, color }) => ({
      backgroundColor,
      color,
      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        marginBottom:spacing(-0.8),
        '& input': {
          fontSize: spacing(2.8),
          fontSize: h5.fontSize
        }
      },
      '& input,textarea': {
        color,
        caretColor: color
      },
      '& textarea': {
        fontWeight: 200
      }
    })
  };
});

const MainDialogPartOfPakeepElement = ({ title, text, children, backgroundColor, color }) => {
  const classes = useStyles({ backgroundColor, color });

  const [state, setState] = useState({ title, text });
  const onChange = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

  const titleInputProps = {
    placeholder: 'Title',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'title',
    value: state.title,
    autoFocus:true
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

  return (
    <Grid className={classes.container}>
      <DialogTitle>
        <InputBase {...titleInputProps} />
      </DialogTitle>
      <DialogContent>
        <InputBase {...textInputProps} />
      </DialogContent>

      {children}
    </Grid>
  );
};

MainDialogPartOfPakeepElement.propTypes = {};

export default MainDialogPartOfPakeepElement;
