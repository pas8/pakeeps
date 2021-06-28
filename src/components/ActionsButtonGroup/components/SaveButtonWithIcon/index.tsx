import { Grid, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';
import { SaveButtonWithIconPropsType, UseStylesOfSaveButtonWithIconType } from 'components/ActionsButtonGroup/types';

const useStyles = makeStyles(({ palette,spacing }) => ({
  container: ({ colorOfSaveButton }:UseStylesOfSaveButtonWithIconType) => {
    const color = !colorOfSaveButton ? palette.primary.main : colorOfSaveButton;
    return {
      '& button': {
        color,
        '& svg,p': {
          color
        },
  

        '&:hover': {
          background: useAlpha(color)
        }
      }
    };
  }
}));

const SaveButtonWithIcon:FC<SaveButtonWithIconPropsType> = ({ onSave, colorOfSaveButton }) => {
  const classes = useStyles({ colorOfSaveButton });

  return (
    <Grid className={classes.container}>
      <Button endIcon={<SaveRoundedIcon />} onClick={onSave}>
        Save
      </Button>
    </Grid>
  );
};

export default SaveButtonWithIcon;
