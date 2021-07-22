import { Grid, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';
import { SaveButtonWithIconPropsType, UseStylesOfSaveButtonWithIconType } from 'components/ActionsButtonGroup/types';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  container: ({ colorOfSaveButton, isAplyAsDialogAction }: UseStylesOfSaveButtonWithIconType) => {
    const color = !colorOfSaveButton ? palette.primary.main : colorOfSaveButton;
    return {
      [breakpoints.down('xs')]: isAplyAsDialogAction
        ? {
            width: 'calc(100%)',
            '& button': {
              width: '100%',
              border: `1px solid ${useAlpha(color, 0.42)}`,
              '&:hover': {
                borderColor: color
              }
            }
          }
        : {},
      '& button': {
        color,
        '& svg,p': {
          color
        },

        '&:hover': {
          background: useAlpha(color, 0.1)
        }
      }
    };
  }
}));

const SaveButtonWithIcon: FC<SaveButtonWithIconPropsType> = ({ onSave, colorOfSaveButton, isAplyAsDialogAction }) => {
  const classes = useStyles({ colorOfSaveButton, isAplyAsDialogAction });

  return (
    <Grid className={classes.container}>
      <Button endIcon={<SaveRoundedIcon />} onClick={onSave}>
        Save
      </Button>
    </Grid>
  );
};

export default SaveButtonWithIcon;
