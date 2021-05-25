import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import { useCookie, useKeyPressEvent, useMeasure, usePageLeave } from 'react-use';
import { nanoid } from 'nanoid';
import { Box, Grid, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { addNewPaKeepThunk } from 'store/modules/App/operations';
import { themeColors } from 'components/theme';
import NewPakeepUtils from './components/Utils';
import AttributesOfNewPakeep from './components/Attributes';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),

    '& .MuiInputBase-root': {
      paddingRight: theme.spacing(4.8)
    },

    '& .MuiOutlinedInput-multiline': {
      padding: theme.spacing(2, 6, 6, 1.4)
    },
    '& input,textarea': {
      caretColor: themeColors.primaryMain
    }
  },
  wrapper: { padding: theme.spacing(0), backgroundColor: 'transparent', position: 'relative' },
  hidden: { display: 'none' },
  inputTitle: { padding: 0 },
  showUtils: { position: 'absolute', right: 4, top: 4, display: 'grid', placeItems: 'center' },
  textField: { paddingBottom: 0 },
  full: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    })
  },
  unFull: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex
    })
  }
}));

const NewPaKeep = ({ addNewPaKeepThunk }) => {
  const classes = useStyles();

  const nulittyState = {
    title: '',
    text: '',
    bookmark: false,
    favorite: false,
    id: nanoid(),
    color: 'transparent',
    labels: ['label3', 'label1', 'label0']
  };

  const [state, setState] = useState(nulittyState);
  const [value, updateCookie, deleteCookie] = useCookie(state);

  useEffect(() => _.isEqual(state, nulittyState) && setState(JSON.parse(value)), []);

  usePageLeave(() => updateCookie(state));

  const [focus, setFocus] = useState(false);
  const [enter, setEnter] = useState(false);
  const [writingText, setWritingText] = useState(false);
  const [changingTitle, setChangingTitle] = useState(false);
  const [showUtils, setShowUtils] = useState(false);
  const [fullWidthOfNewPakeepContainer, setFullWidthOfNewPakeepContainer] = useState(!false);

const [statusState, setStatusState] = useState({


isFocus:false,
placeholder:'Write a title or press ctrl + Alt + 8 to skip a title',
isEnter:false,
isWritingText:false,
isChangingTitle:false,
isUtilsShouldBe

})



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

  const handleAddNewLabel = idWhichShouldBeAdded => {
    setState(state => ({ ...state, labels: [...state.labels, idWhichShouldBeAdded] }));
  };
  const handleDeleteNewLabel = idWhichShouldBeDeleted => {
    setState(state => ({ ...state, labels: _.filter(state.labels, id => id !== idWhichShouldBeDeleted) }));
  };

  useEffect(() => {
    if (focus && state.title !== '') setPlaceholder('Press enter to end  writing the  title');
    if (enter === true && state.title !== '') {
      setWritingText(true);
      setShowUtils(true);
    }
  }, [focus, enter]);

  const handleNewPakeepSave = () => {
    addNewPaKeepThunk({ ...state, wordsCoefficient: 1 });
    setWritingText(false);
    setState(nulittyState);
  };
  // document.onkeydown = evt => {

  // };
  // console.log({...state})
  // useKeyPressEvent('Enter', () => {
  //   if (enter === false) setEnter(true);
  //   if (changingTitle === true) setChangingTitle(false);
  // });



  const handleSetWidthInNewPakeep = () => setFullWidthOfNewPakeepContainer(!fullWidthOfNewPakeepContainer);

  const handleDeleteLabelFromPakeepFunc = (placeholder, labelId) => handleDeleteNewLabel(labelId);

  const [ref, { width: widthOfContainer }] = useMeasure();

  const newPakeepUtils = {
    ...state,
    open: showUtils,
    setEditTitleIsTrue,
    changingTitle,
    handleSetFavoritePakeep,
    handleSetBookmarkPakeep,
    handleSetColorPakeep,
    handleNewPakeepSave,
    handleSetWidth: handleSetWidthInNewPakeep,
    fullWidthStatus: fullWidthOfNewPakeepContainer,
    widthOfContainer,
    handleAddNewLabel,
    handleDeleteNewLabel,
    selectedLabels: state.labels
  };
  const attributesOfNewPakeepProps = {
    pakeepId: state.id,
    handleDeleteLabelFromPakeepFunc,
    labels: state.labels
  };

  return (
    <Grid
      className={clsx(classes.container, fullWidthOfNewPakeepContainer ? classes.full : classes.unFull)}
      xs={fullWidthOfNewPakeepContainer ? 12 : 12}
      sm={fullWidthOfNewPakeepContainer ? 12 : 11}
      md={fullWidthOfNewPakeepContainer ? 12 : 9}
      lg={fullWidthOfNewPakeepContainer ? 12 : 7}
      xl={fullWidthOfNewPakeepContainer ? 12 : 5}
      ref={ref}
    >
      <Paper variant={'elevation'} className={classes.wrapper}>
        <Box>
          <TextField
            className={classes.textField}
            label={writingText ? state.title : placeholder}
            variant={'outlined'}
            value={writingText ? state.text : state.title}
            onChange={handleState}
            name={writingText ? 'text' : 'title'}
            rows={writingText ? 6 : showUtils ? 8 : 1}
            multiline={writingText ? true : showUtils ? true : false}
            fullWidth
            autoFocus={true}
            autoComplete={false}
            rowsMax={42}
            onFocus={setFocusIsTrue}
            onBlur={setFocusIsFalse}
          />
        </Box>

        {showUtils && <AttributesOfNewPakeep {...attributesOfNewPakeepProps} />}
        <NewPakeepUtils {...newPakeepUtils} />

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
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({ addNewPaKeepThunk: data => dispatch(addNewPaKeepThunk(data)) });

export default connect(null, mapDispatchToProps)(NewPaKeep);
