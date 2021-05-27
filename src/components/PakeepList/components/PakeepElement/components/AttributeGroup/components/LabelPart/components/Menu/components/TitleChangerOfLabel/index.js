import { TextField, makeStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1.4, 0.4,0.8,0.8),
    
  }
}));
const TitleChangerOfLabel = ({ value, onChange }) => {
  const classes = useStyles();

  const textFieldProps = {
    autoFocus: true,
    variant: 'outlined',
    color: 'primary',
    value,
    onChange,
    // size:'small'
  };

  return (
    <Grid className={classes.container}>
      <TextField {...textFieldProps} />
    </Grid>
  );
};

TitleChangerOfLabel.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default TitleChangerOfLabel;
