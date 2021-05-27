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
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { colord } from 'colord';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { useIsReadableColor } from 'hooks/useIsReadableColor.hook';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),

    '& .MuiInputBase-root': {
      paddingRight: theme.spacing(4.8)
    },

    '& .MuiOutlinedInput-multiline': {
      padding: ({ isLabelViewHidden }) => theme.spacing(2, 6, isLabelViewHidden ? 6 : 10, 1.4)
    },
    '& input,textarea': {
      caretColor: ({ customColor }) => (!customColor ? themeColors.primaryMain : customColor.hover),
      color: ({ customColor }) => customColor.hover
    }
  },
  wrapper: {
    padding: theme.spacing(0),
    backgroundColor: ({ backgroundColor }) => (colord(backgroundColor).isValid() ? backgroundColor : 'transparent'),
    position: 'relative'
  },
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
  const nulittyState = {
    title: '',
    text: '',
    isInBookmark: false,
    isFavorite: false,
    isPinned: false,
    id: nanoid(),
    color: 'default',
    backgroundColor: 'default',
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
    isUtilsHidden: !true,
    isNewPakeepContainerHaveFullWidth: true,
    isLabelViewHidden: false
  };
  const [statusState, setStatusState] = useState(nullityStatusState);

  const handleState = ({ target: { name, value } }) => {
    setState(state => ({ ...state, [name]: value }));
  };

  const setFocusIsTrue = () => setStatusState(state => ({ ...state, isFocused: true }));
  const setFocusIsFalse = () => setStatusState(state => ({ ...state, isFocused: false }));

  const handleChangeUtilsVisibility = () => {
    setStatusState(state => ({ ...state, isUtilsHidden: !state.isUtilsHidden }));
  };

  const handleSetFavoritePakeep = () => setState(state => ({ ...state, isFavorite: !state.isFavorite }));
  const handleSetBookmarkPakeep = () => setState(state => ({ ...state, isInBookmark: !state.isInBookmark }));
  const handleSetIsPinnedPakeep = () => setState(state => ({ ...state, isPinned: !state.isPinned }));
  const handleSetColorPakeep = color => setState(state => ({ ...state, color }));
  const handleSetBackgroundColorPakeep = backgroundColor => setState(state => ({ ...state, backgroundColor }));

  const handleAddNewLabel = idWhichShouldBeAdded => {
    setState(state => ({ ...state, labels: [...state.labels, idWhichShouldBeAdded] }));
  };
  const handleDeleteNewLabel = idWhichShouldBeDeleted => {
    setState(state => ({ ...state, labels: _.filter(state.labels, id => id !== idWhichShouldBeDeleted) }));
  };

  const handleNewPakeepSave = () => {
    addNewPaKeepThunk(state);
    setState(nulittyState);
  };

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

  const onKeyDown = e => {
    if (!e?.shiftKey && e?.code === 'Enter') {
      e?.preventDefault();
      return setStatusState(state => ({ ...state, isWritingText: !state.isWritingText }));
    }
  };

  const [isUseDefault, isReadable] = useIsReadableColor(state.backgroundColor, state.color);
  const [customColor, setCustomColor] = useState(false);
  console.log(customColor);
  console.log(customColor);
  useEffect(() => setCustomColor(isUseDefault ? false : isReadable), [isUseDefault]);

  const classes = useStyles({
    isLabelViewHidden: statusState.isLabelViewHidden,
    color: state.color,
    customColor,
    backgroundColor: state.backgroundColor
  });
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
    handleSetBackgroundColorPakeep,
    widthOfContainer,
    handleSetIsPinnedPakeep,
    labelsListProps,
    customColor
  };
  const attributesOfNewPakeepProps = {
    pakeepId: state.id,
    handleDeleteLabelFromPakeepFunc,
    labels: state.labels
  };

  const rowsNumber = statusState.isWritingText ? 4 : !statusState.isUtilsHidden ? 6 : 1;

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
    onBlur: setFocusIsFalse,
    onKeyDown
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
