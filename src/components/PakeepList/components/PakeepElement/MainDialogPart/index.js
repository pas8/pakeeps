import { Grid, makeStyles, DialogTitle, DialogContent, TextField, InputBase, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

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
    })
  };
});

const MainDialogPartOfPakeepElement = ({ title, text, children, backgroundColor, color,onChange }) => {
  const classes = useStyles({ backgroundColor, color });

  const titleInputProps = {
    placeholder: 'Title',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'title',
    value: title,
    autoFocus: true
  };

  const textInputProps = {
    placeholder: 'Text',
    autoComplete: 'off',
    onChange,
    fullWidth: true,
    name: 'text',
    value: text,
    multiline: true
  };

  return (
    <Grid className={classes.container}>
      <DialogTitle>
        <Grid container>
          <Grid style={{ flex: 1 }}>
            <InputBase {...titleInputProps} />
          </Grid>

          {/* <Button> Save</Button> */}
        </Grid>
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
