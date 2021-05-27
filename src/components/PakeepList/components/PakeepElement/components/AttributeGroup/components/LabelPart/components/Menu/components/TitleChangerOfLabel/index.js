import { TextField, makeStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1.4, 0.4, 0.8, 0.8),
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: ({ color }) => color,
      caretColor:({ color }) => color
    }
  }
}));
const TitleChangerOfLabel = ({ value, onChange, color }) => {
  console.log(color)
  const classes = useStyles({  color });

  const textFieldProps = {
    autoFocus: true,
    variant: 'outlined',
    color: 'primary',
    value,
    onChange
    // size:'small'
  };

  return (
    <Grid className={classes.container}>
      <TextField {...textFieldProps} />
    </Grid>
  );
};

TitleChangerOfLabel.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default TitleChangerOfLabel;
