import { Button, Grid, Grow, makeStyles, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import DynamicInputDateAndTimePickers from '../DynamicInputDateAndTimePickers';
import _ from 'lodash';
import compareFunc from 'compare-func';
import ColorPickerByPs from 'components/ColorPicker';
import TextRotationNoneOutlinedIcon from '@material-ui/icons/TextRotationNoneOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ButtonGroupUtilsOfDynamicAddMoreEvents from './components/ButtonGroup';
import shortid from 'shortid';

const useStyles = makeStyles(theme => ({
  containerOfEventsElement: {
    position: 'relative',
    marginBottom: theme.spacing(1.8),
    '& .MuiInputBase-formControl': {
      paddingBottom: theme.spacing(4)
    },
    '& input,button': {
      marginTop: theme.spacing(-0.4)
    }
  },
  utils: {
    position: 'absolute',

    bottom: theme.spacing(0),
    left: theme.spacing(0),
    paddingRight: theme.spacing(1)
  }
}));

const DynamicAddMoreEvents = ({ onChangeOfAddMoreEvents, itemState: { value }, ...inputProps }) => {
  const [moreEventsState, setMoreEventsState] = useState(value);
  console.log(moreEventsState);

  const classes = useStyles();
  const [writingTitleStatus, setWritingTitleStatus] = useState(false);

  const handleMoreEventState = (keyName, value) => {
    const filteredArr = _.filter(moreEventsState, ({ key }) => key !== keyName);
    const concatedArr = _.concat(filteredArr, value);
    const resultArr = concatedArr.sort(compareFunc('value'));
    setMoreEventsState(resultArr);
  };
  const [popoverAndMenuState, setPopoverAndMenuState] = useState({
    name: 'null',
    menuIsOpen: false,
    popoverIsOpen: true,
    onMenuClose: null
  });
  const handlePopoverAndMenuState = value => setPopoverAndMenuState(value);
  const addToPatternList = () => console.log(addToPatternList);

  const nullifyElementOfDynamicMoreEvents = {
    title: '',
    iconName: '',
    value: Date.now(),
    color: 'primary',
    saved: false,
    isValid: true,
    key: shortid(),
    isInPatternList: false,
    location: false
  };

  const addOneMoreEventFunc = () => handleMoreEventState(null, nullifyElementOfDynamicMoreEvents);
  const onChangeOfInputPicker = (keyName, value) => handleMoreEventState(keyName, value);

  // useEffect(() => onChangeOfAddMoreEvents(moreEventsState), [moreEventsState]);

  return (
    <Grid>
      {_.map(moreEventsState, ({ value, color, saved, isValid, isInPatternList, location, key }, idx) => {
        const inputPickersProps = {
          ...inputProps,
          onChange: onChangeOfInputPicker,
          itemState: {
            isValid,
            saved,
            value
          },
          name: key
        };

        const buttonGroupProps = {
          isInPatternList,
          writingTitleStatus,
          handlePopoverAndMenuState,
          popoverAndMenuState,
          addToPatternList,
          color,
          location,
          addOneMoreEventFunc,
          keyName:key
        };

        return (
          <Grid className={classes.containerOfEventsElement} key={key} >
            <DynamicInputDateAndTimePickers {...inputPickersProps} />

            <Grid className={classes.utils} container >
              <ButtonGroupUtilsOfDynamicAddMoreEvents {...buttonGroupProps} />

              {/* <Button onClick={onClick}>
                <Typography variant={'s2'}>+ title</Typography>
              </Button> */}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DynamicAddMoreEvents;
