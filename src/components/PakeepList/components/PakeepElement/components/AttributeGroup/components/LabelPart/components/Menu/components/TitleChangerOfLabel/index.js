import { TextField, makeStyles, Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1.4, 0.8, 0.8, 0.8)
  }
}));

const InputWithCustomColor = withStyles({
  root: ({ customColor }) => ({
    // '& label.Mui-focused': {
    //   color: customColor
    // },

    '& .MuiOutlinedInput-root': {
    
      color: customColor.bgHover,

      '& fieldset': {
        borderColor: customColor.bgHover
      },
      '&:hover fieldset': {
        borderColor: customColor.bgHover,

boxShadow:`0px 0px 4px 1px ${useAlpha(customColor.bgHover,0.42)  }`
      },
      '&.Mui-focused fieldset': {
        borderColor: customColor.bgUnHover,
        boxShadow:`0px 0px 4px 1px ${customColor.bgUnHover}`
      },
      '&.Mui-focused ': {
        color: customColor.bgUnHover

      }
      
    }
  })
})(TextField);

const TitleChangerOfLabel = ({ value, onChange, customColor }) => {
  const classes = useStyles();

  const textFieldProps = {
    autoFocus: true,
    variant: 'outlined',
    // color: 'primary',
    fullWidth:true,
    value,
    customColor,
    onChange
    // size:'small'
  };
  const InputTitleChangerOfLabel = !customColor?.isUseDefault ? InputWithCustomColor : TextField;
  return (
    <Grid className={classes.container}>
      <InputTitleChangerOfLabel {...textFieldProps} />
    </Grid>
  );
};

TitleChangerOfLabel.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default TitleChangerOfLabel;
