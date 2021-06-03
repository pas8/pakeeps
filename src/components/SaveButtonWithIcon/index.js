import { Grid, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(({ palette }) => ({
  container: ({ customColor }) => {
    const color = !customColor ? palette.primary.main : customColor.unHover;
    return {
      '& button': {
        color,
        '& svg': {
          color
        },
        '&:hover': {
          background: useAlpha(color)
        }
      }
    };
  }
}));

const SaveButtonWithIcon = ({ onSave, customColor }) => {
  const classes = useStyles({ customColor });

  return (
    <Grid className={classes.container}>
      <Button startIcon={<SaveRoundedIcon />} onClick={onSave}>
        Save
      </Button>
    </Grid>
  );
};

SaveButtonWithIcon.propTypes = {
  customColor: PropTypes.any,
  onSave: PropTypes.func
}

export default SaveButtonWithIcon;
