import { Button, Grid, Grow, makeStyles, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import DynamicInputDateAndTimePickers from '../DynamicInputDateAndTimePickers';
import _ from 'lodash';
import compareFunc from 'compare-func';
import ColorPickerByPs from 'components/ColorPicker';
import TextRotationNoneOutlinedIcon from '@material-ui/icons/TextRotationNoneOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ButtonGroupUtilsOfDynamicAddMoreEvents from './components/ButtonGroup';
import { nanoid } from 'nanoid'
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  containerOfEventsElement: {
    minWidth: theme.spacing(42 - 4),
    position: 'relative',
    paddingRight: theme.spacing(0.8),
    marginBottom: theme.spacing(1.8),
    '& .MuiInputBase-formControl': {
      paddingBottom: theme.spacing(4.8),
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      })
    },
    '& input,button': {
      marginTop: theme.spacing(-0.4)
    },
    '& .MuiInputAdornment-positionEnd button': {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(-1.42)
    }
  },
  utils: {
    position: 'absolute',

    // bottom: theme.spacing(,
    bottom: 0,
    left: theme.spacing(0),
    paddingRight: theme.spacing(1)
  },
  containerUnFocused: {
    '& .MuiInputBase-formControl': {
      padding: theme.spacing(1, 0),
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    '& .MuiInputAdornment-positionEnd button': {
      marginRight: theme.spacing(0.4)
    }
  },
}));

const DynamicAddMoreEvents = ({ onChangeOfAddMoreEvents, itemState: { value }, ...inputProps }) => {
  const classes = useStyles();
  const nullifyElementOfDynamicMoreEvents = {
    title: '',
    iconName: '',
    value: Date.now(),
    color: 'primary',
    saved: false,
    isValid: true,
    key: nanoid(),
    isInPatternList: false,
    location: false
  };

  const [writingTitleStatus, setWritingTitleStatus] = useState(false);
  const [moreEventsState, setMoreEventsState] = useState(value);
  const [focus, setFocus] = useState({ key: '', status: false });

  const handleMoreEventState = (keyName, { valueName, value }) => {
    const setNullityStatus = keyName === 'addOneMoreEvent';
    const incomingElement = { ...nullifyElementOfDynamicMoreEvents, [valueName]: value };
    const correctEventElement = setNullityStatus ? nullifyElementOfDynamicMoreEvents : incomingElement;

    const filteredArr = _.filter(moreEventsState, ({ key }) => key !== keyName);
    const concatedArr = _.concat(filteredArr, correctEventElement);
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

  const addOneMoreEventFunc = () => handleMoreEventState('addOneMoreEvent');
  const handlerOfEventButtonGroupIcon = (keyName, valueName, value) =>
    handleMoreEventState(keyName, { valueName, value });

  const onChangeOfInputPicker = (keyName, value) => handlerOfEventButtonGroupIcon(keyName, 'value', value);
  const handlerOfTitleButton = () => setWritingTitleStatus(state => !state);
  // useEffect(() => onChangeOfAstatusddMoreEvents(moreEventsState), [moreEventsState]);
  return (
    <Grid>
      {_.map(moreEventsState, ({ value, color, saved, isValid, isInPatternList, location, key, iconName }, idx) => {
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
          handlerOfTitleButton,
          writingTitleStatus,
          handlePopoverAndMenuState,
          popoverAndMenuState,
          handlerOfEventButtonGroupIcon,
          addToPatternList,
          color,
          location,
          addOneMoreEventFunc,
          keyName: key,
          iconName,
          KeyboardIcon: inputProps.KeyboardIcon
        };

        const titleInputProps = {
          ...inputPickersProps,
          fullWidth: true,
          variant: 'outlined'
        };
        const dateInputProps = {
          ...inputPickersProps
        };
        const InputOfMoreEventElement = writingTitleStatus ? TextField : DynamicInputDateAndTimePickers;
        const inputOfMoreEventElementProps = writingTitleStatus ? titleInputProps : dateInputProps;

        const onFocusOfMoreEvents = () => setFocus({ key, status: true });
        const onBlurOfMoreEvents = () => setFocus({ key: '', status: false });

        return (
          <Grid
            className={clsx(
              classes.containerOfEventsElement,
              focus.status && focus.key === key ? null : classes.containerUnFocused
            )}
            key={key}
            onFocus={onFocusOfMoreEvents}
            // onBlur={onBlurOfMoreEvents}
          >
            {/* <Grow in={!writingTitleStatus}> */}
            <InputOfMoreEventElement {...inputOfMoreEventElementProps} />
            {/* </Grow> */}

            <Grid className={classes.utils} container>
              {/* <Grow in> */}
              {focus.status && focus.key === key && <ButtonGroupUtilsOfDynamicAddMoreEvents {...buttonGroupProps} />}
              {/* </Grow> */}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DynamicAddMoreEvents;
