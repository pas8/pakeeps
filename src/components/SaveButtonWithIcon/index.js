import { Grid, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { themeColors } from 'components/theme';
import { colord } from 'colord';

const useStyles = makeStyles(theme => ({
  container: ({ color }) => ({
    '& button': {
      color,
      '& svg': {
        color
      },
      '&:hover': {
        background: colord(color).alpha(0.16).toHex()
      }
    }
  })
}));

const SaveButtonWithIcon = ({ onSave, customColor }) => {
  const color = !customColor ? themeColors.primaryMain : customColor.unHover;
  const classes = useStyles({ color });

  return (
    <Grid className={classes.container}>
      <Button startIcon={<SaveRoundedIcon />} onClick={onSave}>
        Save
      </Button>
    </Grid>
  );
};

SaveButtonWithIcon.propTypes = {};

export default SaveButtonWithIcon;
