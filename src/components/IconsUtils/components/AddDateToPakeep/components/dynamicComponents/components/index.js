import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';

const DynamicInputDateAndTimePickers = ({ value, onChange, onlyTime, KeyboardIcon, name, ampm }) => {
  const handleChange = value => onChange(name, value);

  return (
    <>
      {!onlyTime ? (
        <KeyboardDateTimePicker
          value={value}
          onChange={handleChange}
          ampm={ampm}
          minDate={Date.now()}
          showTodayButton
          animateYearScrolling
          keyboardIcon={<KeyboardIcon />}
          autoOk={false}
          format={'yyyy  /  MM  /  dd  /  hh:mm'}
          onError={(error, value) => console.log(error, value)}
          name={name}
        />
      ) : (
        <KeyboardTimePicker
          keyboardIcon={<KeyboardIcon />}
          value={value}
          showTodayButton
          // orientation={'landscape'}
          views={['hours', 'minutes']}
          onChange={handleChange}
          ampm={ampm}
          openTo={'hours'}
        />
      )}
    </>
  );
};

DynamicInputDateAndTimePickers.propTypes = {
  KeyboardIcon: PropTypes.node,
  ampm: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onlyTime: PropTypes.bool,
  value: PropTypes.string
};

export default DynamicInputDateAndTimePickers;
