import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import { useCookie, useKeyPressEvent, useMeasure, usePageLeave } from 'react-use';
import { nanoid } from 'nanoid';
import { Box, Grid, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { addNewPaKeepThunk } from 'store/modules/App/operations';
import { themeColors } from 'components/theme';
import NewPakeepUtils from './components/Utils';
import AttributesOfNewPakeep from './components/Attributes';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import EyeIconButton from './components/EyeIconButton';

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
    isInBookmark: false,
    isFavorite: false,
    id: nanoid(),
    color: 'transparent',
    labels: ['label3', 'label1', 'label0']
  };

  const [state, setState] = useState(nulittyState);
  const [value, updateCookie, deleteCookie] = useCookie(state);

  useEffect(() => _.isEqual(state, nulittyState) && setState(JSON.parse(value)), []);

  usePageLeave(() => updateCookie(state));

  const nullityStatusState = {
    isFocused: false,
    placeholder: 'Write a title or press ctrl + Alt + 8 to skip a title',
    isEnter: false,
    isWritingText: false,
    isChangingTitle: false,
    isUtilsHidden: true,
    isNewPakeepContainerHaveFullWidth: true,
    isLabelViewHidden: false
  };
  const [statusState, setStatusState] = useState(nullityStatusState);

  const handleState = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

  const setFocusIsTrue = () => setStatusState(state => ({ ...state, isFocused: true }));
  const setFocusIsFalse = () => setStatusState(state => ({ ...state, isFocused: false }));

  const handleChangeUtilsVisibility = () => {
    setStatusState(state => ({ ...state, isUtilsHidden: !state.isUtilsHidden }));
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
    if (statusState.isFocused && state.title !== '') {
      setStatusState(state => ({ ...state, placeholder: 'Press statusState.isEnter to end  writing the  title' }));
    }
    // if (statusState.isEnter === true && state.title !== '') {
    //   setWritingText(true);
    //   setShowUtils(true);
    // }
  }, [statusState.isFocused, statusState.isEnter]);

  const handleNewPakeepSave = () => {
    addNewPaKeepThunk({ ...state, wordsCoefficient: 1 });
    setWritingText(false);
    setState(nulittyState);
  };
  // document.onkeydown = evt => {

  // };
  // console.log({...state})
  // useKeyPressEvent('Enter', () => {
  //   if (statusState.isEnter === false) setEnter(true);
  //   if (changingTitle === true) setChangingTitle(false);
  // });

  const handleStatusOfHideLabelView = () =>
    setStatusState(state => ({ ...state, isLabelViewHidden: !state.isLabelViewHidden }));

  const handleSetWidthInNewPakeep = () => {
    setStatusState(state => ({
      ...state,
      isNewPakeepContainerHaveFullWidth: !state.isNewPakeepContainerHaveFullWidth
    }));
  };

  const handleDeleteLabelFromPakeepFunc = (placeholder, labelId) => handleDeleteNewLabel(labelId);

  const [ref, { width: widthOfContainer }] = useMeasure();

  const labelsListProps = {
    handleStatusOfHideLabelView,
    selectedLabels: state.labels,
    handleAddNewLabel,
    isLabelViewHidden: statusState.isLabelViewHidden,

    handleDeleteNewLabel
  };

  const labelBargeNumber = statusState.isLabelViewHidden ? state.labels.length : 0;
  const newPakeepUtils = {
    ...state,
    ...statusState,
    labelBargeNumber,
    handleSetFavoritePakeep,
    handleSetBookmarkPakeep,
    handleSetColorPakeep,
    handleNewPakeepSave,
    handleSetWidth: handleSetWidthInNewPakeep,
    widthOfContainer,
    labelsListProps
  };
  const attributesOfNewPakeepProps = {
    pakeepId: state.id,
    handleDeleteLabelFromPakeepFunc,
    labels: state.labels
  };

  const rowsNumber = statusState.isWritingText
    ? statusState.isLabelViewHidden
      ? 4 - 1
      : 4
    : !statusState.isUtilsHidden
    ? statusState.isLabelViewHidden
      ? 6 - 1
      : 6
    : 1;

  const textFieldProps = {
    className: classes.textField,
    label: statusState.isWritingText ? state.title : statusState.placeholder,
    variant: 'outlined',
    value: statusState.isWritingText ? state.text : state.title,
    onChange: handleState,
    name: statusState.isWritingText ? 'text' : 'title',
    rows: rowsNumber,
    multiline: statusState.isWritingText ? true : !statusState.isUtilsHidden ? true : false,
    fullWidth: true,
    autoFocus: true,
    autoComplete: false,
    rowsMax: 42,
    onFocus: setFocusIsTrue,
    onBlur: setFocusIsFalse
  };
  const fullWidthValue = statusState.isNewPakeepContainerHaveFullWidth && 12;

  const breakpoint = useCustomBreakpoint();
  const breakpointsValues = { xs: 12, sm: 10 + 1, md: 8 + 1, lg: 6 + 1, xl: 4 + 1 };

  const gridContainerProps = {
    className: clsx(classes.container, statusState.isNewPakeepContainerHaveFullWidth ? classes.full : classes.unFull),
    [breakpoint]: fullWidthValue || breakpointsValues[breakpoint],
    ref
  };
  return (
    <Grid {...gridContainerProps}>
      <Paper variant={'elevation'} className={classes.wrapper}>
        <Box>
          <TextField {...textFieldProps} />
        </Box>

        {!statusState.isUtilsHidden && !statusState.isLabelViewHidden && (
          <AttributesOfNewPakeep {...attributesOfNewPakeepProps} />
        )}

        {!statusState.isUtilsHidden && <NewPakeepUtils {...newPakeepUtils} />}

        <EyeIconButton onClickOfEyeIconButton={handleChangeUtilsVisibility} isUtilsHidden={statusState.isUtilsHidden} />
      </Paper>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({ addNewPaKeepThunk: data => dispatch(addNewPaKeepThunk(data)) });

export default connect(null, mapDispatchToProps)(NewPaKeep);
