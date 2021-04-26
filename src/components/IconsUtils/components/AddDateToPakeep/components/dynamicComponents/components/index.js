import { KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';


const DynamicInputDateAndTimePickers = ({ value, onChange,onlyTime,KeyboardIcon ,name,ampm}) => {
  return (
    <>
      {!onlyTime ? (
        <KeyboardDateTimePicker
          value={value}
          onChange={onChange}
          ampm={ampm}
          name={name}
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
          fullWidth={false}
          value={value}
          name={name}

          onChange={onChange}
          ampm={ampm}
        />
      )}
    </>
  );
};

export default DynamicInputDateAndTimePickers;
