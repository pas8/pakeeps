import { Box, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(16), width: '80ch' },
  wrapper: { padding: theme.spacing(0), backgroundColor: 'transparent', position: 'relative' },
  hidden: { display: 'none' },
  inputTitle: { padding: 0 }
}));

const NewPaKeep = () => {
  const classes = useStyles();

  const [state, setState] = useState({ title: '', text: '' });
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState('Write a title or press ctrl + Alt + 8 to skip a title');
  const [enter, setEnter] = useState(false);
  const [writingText, setWritingText] = useState(false);

  // console.log(focus);
  const handleState = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

  const setFocusIsTrue = () => setFocus(true);
  const setFocusIsFalse = () => setFocus(false);

  useEffect(() => {
    if (focus && state.title !== '') setPlaceholder('Press enter to end  writing the  title');
    if (enter === true && state.title !== '') setWritingText(true);
    if (writingText === true && state.text === '' && focus === false) setWritingText(false);
    // if(focus && )
  }, [focus, enter]);

  document.onkeydown = evt => {
    if (evt.key === 'Enter' && enter === false) setEnter(true);
    else if (enter === true && evt.key !== 'Enter') setEnter(false);
  };

  console.log(enter);

  return (
    <Box className={classes.container}>
      <Paper variant={'elevation'} className={classes.wrapper}>
        {/* <form className={classes.root} noValidate autoComplete={'off'}> */}
        {/* <Box className={clsx({ [classes.hidden]: !focus })}>
          <TextField
            className={classes.inputTitle}
            // label={'Title'}
            placeholder={'title'}
            variant={'outlined'}
            value={state.title}
            onChange={handleState}
            name={'title'}
            fullWidth
          />
        </Box> */}
        <Box>
          <TextField
            label={writingText ? state.title : placeholder}
            variant={'outlined'}
            value={writingText ? state.text : state.title}
            onChange={handleState}
            name={writingText ? 'text' : 'title'}
            rows={writingText ? 4 : 1}
            multiline={writingText ? true : false}
            fullWidth
            rowsMax={42}
            onFocus={setFocusIsTrue}
            onBlur={setFocusIsFalse}
          />
        </Box>
        {/* </form> */}

        <IconButton>
          <CheckBoxOutlinedIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default NewPaKeep;
