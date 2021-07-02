import {
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Tooltip,
  Typography
} from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { SelectColorFormatPropsType } from './types';

const useStyles = makeStyles(theme => ({
  container: ({ color }: { color: string }) => ({
    // minWidth: theme.spacing(16),
    
    textTransform: 'capitalize',
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color
    },
    '& label > span:first-child:hover': {
      background: useAlpha(color)
    }
  }),

  selectedElement: {
    padding: theme.spacing(0.4, 1.4)
  }
}));
const SelectColorFormat: FC<SelectColorFormatPropsType> = ({ color, customFormatName, setCustomFormatName }) => {
  const classes = useStyles({ color });

  const colorFormatNamesArr = [
    { shortName: 'rgb', tooltipName: 'Red Green Blue' },
    { shortName: 'hsl', tooltipName: 'Hue Saturation Lightness' },
    { shortName: 'hsv', tooltipName: 'Hue Saturation Value' },
    { shortName: 'lch', tooltipName: 'Lightness Chroma Hue' }
  ];

  const handleChangeRadioGroup = ({ target: { value } }: any) => {
    setCustomFormatName(value);
  };
  return (
    <FormControl className={classes.container}>
      <RadioGroup
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
              key={shortName}
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

export default SelectColorFormat;
