import {
  Badge,
  colors,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Tooltip,
  Typography
} from '@material-ui/core';
import { colord } from 'colord';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    // minWidth: theme.spacing(16),
    textTransform: 'capitalize',
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: ({ color }) => color
    },
    '& label > span:first-child:hover': {
      background: ({ hoverColor }) => hoverColor
    }
  },

  selectedElement: {
    padding: theme.spacing(0.4, 1.4)
  }
}));
const SelectColorFormat = ({ color, customFormatName, setCustomFormatName }) => {
  const hoverColor = colord(color).alpha(0.16).toHex();
  const classes = useStyles({ color, hoverColor });

  const colorFormatNamesArr = [
    { shortName: 'rgb', tooltipName: 'Red Green Blue' },
    { shortName: 'hsl', tooltipName: 'Hue Saturation Lightness' },
    { shortName: 'hsv', tooltipName: 'Hue Saturation Value' },
    { shortName: 'lch', tooltipName: 'Lightness Chroma Hue' }
  ];

  const handleChangeRadioGroup = ({ target: { value } }) =>   setCustomFormatName(value);
  
  return (
    <FormControl className={classes.container}>
      <RadioGroup
        column
        aria-label={'SelectColorFormat'}
        name={'SelectColorFormat'}
        value={customFormatName}
        onChange={handleChangeRadioGroup}

      >
        {colorFormatNamesArr.map(({ shortName, tooltipName }) => {
          return (
            <FormControlLabel
              className={classes.selectedElement}
              value={shortName}
              control={<Radio />}
              label={
                <Grid container>
                  <Tooltip title={tooltipName} placement="right" arrow enterDelay={160} leaveDelay={80}>
                    <Typography> {shortName} </Typography>
                  </Tooltip>
                </Grid>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

SelectColorFormat.propTypes = {};

export default SelectColorFormat;
