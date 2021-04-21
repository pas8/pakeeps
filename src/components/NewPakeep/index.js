import { Box, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import NewPakeepUtils from './components/Utils';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(16), width: '80ch' },
  wrapper: { padding: theme.spacing(0), backgroundColor: 'transparent', position: 'relative' },
  hidden: { display: 'none' },
  inputTitle: { padding: 0 },
  showUtils: { position: 'absolute', right: 4, top: 4, display: 'grid', placeItems: 'center' },
  textField: { paddingBottom: 0 }
}));

const NewPaKeep = () => {
  const classes = useStyles();

  const [state, setState] = useState({ title: '', text: '' });
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState('Write a title or press ctrl + Alt + 8 to skip a title');
  const [enter, setEnter] = useState(false);
  const [writingText, setWritingText] = useState(false);
  const [changingTitle, setChangingTitle] = useState(false);
  const [showUtils, setShowUtils] = useState(false);

  // console.log(focus);
  const handleState = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

  const setFocusIsTrue = () => setFocus(true);
  const setFocusIsFalse = () => setFocus(false);
  const setUtilsIsVisible = () => setShowUtils(!showUtils);

  useEffect(() => {
    if (focus && state.title !== '') setPlaceholder('Press enter to end  writing the  title');
    if (enter === true && state.title !== '') setWritingText(true);

    if (writingText === true && state.text === '' && focus === false) setWritingText(false);
    // if(focus && )
  }, [focus, enter]);

  // console.log(enter);
  document.onkeydown = evt => {
    if (evt.key === 'Enter' && enter === false) setEnter(true);
    else if (enter === true && evt.key !== 'Enter') setEnter(false);
  };

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
            className={classes.textField}
            label={writingText ? state.title : placeholder}
            variant={'outlined'}
            value={writingText ? state.text : state.title}
            onChange={handleState}
            name={writingText ? 'text' : 'title'}
            rows={writingText ? 8 : showUtils ? 4 : 1}
            multiline={writingText ? true : showUtils ? true : false}
            fullWidth
            rowsMax={42}
            onFocus={setFocusIsTrue}
            onBlur={setFocusIsFalse}
          />
        </Box>
        {/* </form> */}
        <NewPakeepUtils open={showUtils} />
        <Box className={classes.showUtils} onClick={setUtilsIsVisible}>
          <IconButton>
            {!showUtils ? (
              <VisibilityOutlinedIcon style={{ color: 'rgba(255,255,255,0.8)' }} />
            ) : (
              <VisibilityOffOutlinedIcon style={{ color: 'rgba(255,255,255,0.4)' }} />
            )}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewPaKeep;
