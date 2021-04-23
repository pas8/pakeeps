import { Box, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import NewPakeepUtils from './components/Utils';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { connect } from 'react-redux';
import { addNewPaKeepThunk } from 'store/AppReducer';

const useStyles = makeStyles(theme => ({
  container: { marginTop: theme.spacing(8), width: '92ch' },
  wrapper: { padding: theme.spacing(0), backgroundColor: 'transparent', position: 'relative' },
  hidden: { display: 'none' },
  inputTitle: { padding: 0 },
  showUtils: { position: 'absolute', right: 4, top: 4, display: 'grid', placeItems: 'center' },
  textField: { paddingBottom: 0 }
}));

const NewPaKeep = ({ pakeeps, addNewPaKeepThunk }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    title: '',
    text: '',
    bookmark: false,
    favorite: false,
    color: 'transparent',
    labels: false
  });
  const [focus, setFocus] = useState(false);
  const [placeholder, setPlaceholder] = useState('Write a title or press ctrl + Alt + 8 to skip a title');
  const [enter, setEnter] = useState(false);
  const [writingText, setWritingText] = useState(false);
  const [changingTitle, setChangingTitle] = useState(false);
  const [showUtils, setShowUtils] = useState(false);

  const handleState = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

  const setFocusIsTrue = () => setFocus(true);
  const setFocusIsFalse = () => setFocus(false);
  const setUtilsIsVisible = () => setShowUtils(!showUtils);

  const setEditTitleIsTrue = () => {
    setWritingText(false);
    setChangingTitle(true);
  };
  const handleSetFavoritePakeep = () => setState(state => ({ ...state, favorite: !state.favorite }));
  const handleSetBookmarkPakeep = () => setState(state => ({ ...state, bookmark: !state.bookmark }));
  const handleSetColorPakeep = () => setState(state => ({ ...state, color: !state.color }));

  useEffect(() => {
    if (focus && state.title !== '') setPlaceholder('Press enter to end  writing the  title');
    if (enter === true && state.title !== '') {
      setWritingText(true);
      setShowUtils(true);
    }
  }, [focus, enter]);

  const handleNewPakeepSave = () => {
    addNewPaKeepThunk(state);
    setWritingText(false);
    setState({ title: '', text: '', bookmark: false, favorite: false, color: 'transparent', labels: false });
  };
  document.onkeydown = evt => {
    if (evt.key === 'Enter' && enter === false) setEnter(true);
    else if (enter === true && evt.key !== 'Enter') setEnter(false);

    if (evt.key === 'Enter' && changingTitle === true) setChangingTitle(false);
  };

  return (
    <Box className={classes.container}>
      <Paper variant={'elevation'} className={classes.wrapper}>
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
            autoFocus={true}
            rowsMax={42}
            onFocus={setFocusIsTrue}
            onBlur={setFocusIsFalse}
          />
        </Box>
        {/* </form> */}
        <NewPakeepUtils
          open={showUtils}
          setEditTitleIsTrue={setEditTitleIsTrue}
          changingTitle={changingTitle}
          handleSetFavoritePakeep={handleSetFavoritePakeep}
          handleSetBookmarkPakeep={handleSetBookmarkPakeep}
          handleSetColorPakeep={handleSetColorPakeep}
          handleNewPakeepSave={handleNewPakeepSave}
          {...state}
        />
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

const mapStateToProps = ({ app: { pakeeps } }) => ({ pakeeps });
const mapDispatchToProps = dispatch => ({ addNewPaKeepThunk: data => dispatch(addNewPaKeepThunk(data)) });

export default connect(mapStateToProps, mapDispatchToProps)(NewPaKeep);
