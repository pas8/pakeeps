import { FC } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useAlpha } from 'hooks/useAlpha.hook';
import { CloseButtonWithIconPropsType, UseStylesOfCloseButtonWithIconType } from '../../types';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
  container: ({ colorOfCloseButton }: UseStylesOfCloseButtonWithIconType) => {
    const color = !colorOfCloseButton ? palette.text.hint : colorOfCloseButton;

    return {

      '& button': {
        color,
        '& svg,span': {
          color
        },

        '&:hover': {
          background: useAlpha(color!)
        }
      }
    };
  }
}));

const CloseButtonWithIcon: FC<CloseButtonWithIconPropsType> = ({ onClose, colorOfCloseButton }) => {
  const classes = useStyles({ colorOfCloseButton });

  return (
    <Grid className={classes.container}>
      <Button endIcon={<CloseIcon />} onClick={onClose}>
        Close
      </Button>
    </Grid>
  );
};

export default CloseButtonWithIcon;
