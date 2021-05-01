import {
  Badge,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Tooltip,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: theme.spacing(16),
    textTransform:'capitalize'
  }
}));
const SelectColorFormat = ({color}) => {
  const classes = useStyles();
  const [state, setState] = useState(true);
console.log(color)
  const colorFormatNamesArr = [
    { shortName: 'rgb', tooltipName: 'Red Green Blue' },
    { shortName: 'hsl', tooltipName: 'Hue Saturation Lightness' },
    { shortName: 'hsv', tooltipName: 'Hue Saturation Value' },
    { shortName: 'lch', tooltipName: 'Lightness Chroma Hue' }
  ];

  return (
    <Grid className={classes.container}>
      <RadioGroup column aria-label="position" name="position" defaultValue={colorFormatNamesArr[0]}>
        {colorFormatNamesArr.map(({ shortName, tooltipName }) => {
          return (
            <FormControlLabel
              value={shortName}
              control={<Radio color={'primary'} />}
              label={
                <Grid container>
                  {/* <Badge color="secondary" badgeContent={name}> */}
                  <Tooltip title={tooltipName} placement="right"  arrow enterDelay={160} leaveDelay={80}>
                    <Typography > {shortName} </Typography>

                    {/* </Badge> */}
                  </Tooltip>
                </Grid>
              }
            />
          );
        })}
      </RadioGroup>
    </Grid>
  );
};

SelectColorFormat.propTypes = {};

export default SelectColorFormat;
