import { createContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import { useCookie, useKeyPressEvent, useMeasure, usePageLeave } from 'react-use';
import { nanoid } from 'nanoid';
import { Box, Grid, IconButton, makeStyles, Paper, TextField, withStyles } from '@material-ui/core';
import { addNewPaKeepThunk } from 'store/modules/App/operations';
import { themeColors } from 'components/theme';
import NewPakeepUtils from './components/Utils';
import AttributesOfNewPakeep from './components/Attributes';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import EyeIconButton from './components/EyeIconButton';
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { colord } from 'colord';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';

const useStyles = makeStyles(theme => ({
  container: ({ customColor, isLabelViewHidden, backgroundColor }) => ({
    marginTop: theme.spacing(8),

    '& .MuiInputBase-root': {
      paddingRight: theme.spacing(4.8)
    },

    '&  .MuiFormLabel-root.Mui-focused': {
      color: !customColor ? themeColors.primaryMain : customColor.hover,
      padding: customColor && theme.spacing(0.4, 1.8),
      border: !customColor ? 0 : `2px solid ${customColor.hover}`,
      // borderLeft: customColor && 0,
      borderRadius: customColor && '2px',
      borderTopLeftRadius: customColor && '6px',
      // background: `${backgroundColor} !important`,

      transform: !customColor ? 'translate(14px, -6px) scale(0.75)' : 'translate(-2px, -8px) scale(0.75)'
    },

    '& label': {
      color: !customColor ? themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal : customColor.hover,

      background: !customColor ? 'transparent !important' : `${backgroundColor} !important`
    },
    // '& legend': {
    //   transform: !customColor ? 'translate(4px, -8px) scale(0.75)' : 'translate(0px, 0px) scale(0.75)'
    // },
    '& .MuiOutlinedInput-multiline': {
      padding: theme.spacing(!customColor ? 2 : 2.8, 6, isLabelViewHidden ? 6 : 10, 1.4)
    },
    '& input,textarea': {
      caretColor: !customColor ? themeColors.primaryMain : customColor.hover,
      color: !customColor ? themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal : customColor.hover
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: !customColor ? themeColors.primaryMain : customColor.hover
    },

    '& fieldset': {
      display: !customColor ? 'block' : 'none '
    }
  }),
  wrapper: ({ backgroundColor, customColor }) => ({
    padding: theme.spacing(0),
    backgroundColor: colord(backgroundColor).isValid() ? backgroundColor : 'transparent',
    position: 'relative',
    borderRadius: '4px',
    borderWidth: !customColor ? 0 : 2,
    '&:hover': {
      boxShadow: customColor && `0px 0px 4px ${backgroundColor}`,
      border: customColor && customColor.unHover
    }
  }),
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

export   const LocaleContext = createContext();

const NewPaKeep = ({ addNewPaKeepThunk }) => {
  const nulittyState = {
    title: '',
    text: '',
    isCheckBoxes: '',
    isInBookmark: false,
    isFavorite: false,
    isPinned: false,
    id: nanoid(),
    color: 'default',
    backgroundColor: 'default',
    labels: ['label1']
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
  const handleSetIsCheckBoxesPakeep = () => setState(state => ({ ...state, isCheckBoxes: !state.isCheckBoxes }));

  const handleAddNewLabel = idWhichShouldBeAdded => {
    setState(state => ({ ...state, labels: [...state.labels, idWhichShouldBeAdded] }));
  };
  const handleDeleteNewLabel = idWhichShouldBeDeleted => {
    setState(state => ({ ...state, labels: _.filter(state.labels, id => id !== idWhichShouldBeDeleted) }));
  };

  const handleNewPakeepSave = () => {
    setState(nulittyState);
    addNewPaKeepThunk(state);
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
  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(
    state.backgroundColor,
    state.color
  );


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
    handleDeleteLabelFromPakeepFunc,
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
    customColor,
    handleSetIsCheckBoxesPakeep,
    isBackgroundColorDefault,
    isColorDefault
  };
  const attributesOfNewPakeepProps = {
    pakeepId: state.id,
    handleDeleteLabelFromPakeepFunc,
    labels: state.labels,
    customColor
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

  const eyeIconButtonProps = {
    onClickOfEyeIconButton: handleChangeUtilsVisibility,
    isUtilsHidden: statusState.isUtilsHidden,
    customColor
  };

  return (
    <Grid {...gridContainerProps}>
      <Grid className={classes.wrapper}>
        <Box>
          <TextField {...textFieldProps} />
        </Box>

        {!statusState.isUtilsHidden && !statusState.isLabelViewHidden && (
          <AttributesOfNewPakeep {...attributesOfNewPakeepProps} />
        )}

        {!statusState.isUtilsHidden && (
          <LocaleContext.Provider value={{selectedLabels:state.labels}}>
            <NewPakeepUtils {...newPakeepUtils} />
          </LocaleContext.Provider>
        )}

        <EyeIconButton {...eyeIconButtonProps} />
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({ addNewPaKeepThunk: data => dispatch(addNewPaKeepThunk(data)) });

export default connect(null, mapDispatchToProps)(NewPaKeep);
