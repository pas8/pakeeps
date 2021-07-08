import { ChangeEventHandler, createContext, KeyboardEventHandler, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import _, { dropRight, startsWith } from 'lodash';
import clsx from 'clsx';
import {
  useCookie,
  useKeyPressEvent,
  useLockBodyScroll,
  useMeasure,
  usePageLeave,
  useStateWithHistory
} from 'react-use';
import { nanoid } from 'nanoid';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Button,
  makeStyles,
  Paper,
  TextField,
  withStyles
} from '@material-ui/core';
import { operateToAddNewPakeep } from 'store/modules/App/operations';
import NewPakeepUtils from './components/Utils';
import AttributesOfNewPakeep from './components/Attributes';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import EyeIconButton from './components/EyeIconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useKeyboardJs from 'react-use/lib/useKeyboardJs';
import { colord } from 'colord';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { ColorType, LabelIdType, PakeepElementType, TitleAndTextOfPakeepType } from 'store/modules/App/types';
import { useAlpha } from 'hooks/useAlpha.hook';
import firebase from 'firebase';
import AttributeGroup from 'components/PakeepList/components/PakeepElement/components/AttributeGroup';
import { useFilteredLabels } from 'hooks/useFilteredLabels.hook';
import { getLabels } from 'store/modules/App/selectors';
import compareFunc from 'compare-func';
import CheckBoxContainer from 'components/CheckBoxContainer';
import IconButtonByPas from 'components/IconButton';
import { HandleSaveEventsType } from 'components/IconsUtils/components/AddDateToPakeep/types';
const useStyles = makeStyles(
  ({ spacing, palette, transitions, typography: { subtitle1, h5 }, shape: { borderRadius } }) => ({
    container: ({ customColor, isLabelViewHidden, backgroundColor }: any) => ({
      borderRadius,
      border: '1px solid',
      borderColor: useAlpha(palette.text.primary, 0.2),
      // marginTop: spacing(8)
      // '& .MuiInputBase-root': {
      //   paddingRight: spacing(4.8)
      // },
      // '&  .MuiFormLabel-root.Mui-focused': {
      //   color: !customColor ? palette.primary.main : customColor.hover,
      //   padding: customColor && spacing(0.4, 1.8),
      //   border: !customColor ? 0 : `2px solid ${customColor.hover}`,
      //   // borderLeft: customColor && 0,
      //   borderRadius: customColor && '2px',
      //   borderTopLeftRadius: customColor && '6px',
      //   // background: `${backgroundColor} !important`,
      //   transform: !customColor ? 'translate(14px, -6px) scale(0.75)' : 'translate(-2px, -8px) scale(0.75)'
      // },
      // '& label': {
      //   color: !customColor ? palette?.mediumEmphasis?.main : customColor.hover,
      //   background: !customColor ? 'transparent !important' : `${backgroundColor} !important`
      // },
      // // '& legend': {
      // //   transform: !customColor ? 'translate(4px, -8px) scale(0.75)' : 'translate(0px, 0px) scale(0.75)'
      // // },
      // '& .MuiOutlinedInput-multiline': {
      //   padding: spacing(!customColor ? 2 : 2.8, 6, isLabelViewHidden ? 6 : 10, 1.4)
      // },
      '& input,textarea': {
        '&::selection': {
          background: customColor.isUseDefault ? '' : customColor.hover,
          color: customColor.isUseDefault ? '' : customColor.bgHover
        },
        color: customColor.isUseDefault ? '' : customColor.hover,
        caretColor: customColor.isUseDefault ? palette.primary.main : customColor.hover
        // caretColor: palette.primary.main
        // color: !customColor ? palette?.maxEmphasis?.main : customColor.hover
      }
      // '& .MuiFormLabel-root.Mui-focused': {
      //   color: !customColor ? palette.primary.main : customColor.hover
      // },
      // '& fieldset': {
      //   display: !customColor ? 'block' : 'none '
      // }
    }),

    titleContainer: {
      marginTop: spacing(-0.4),
      '& input': {
        ...h5
      }
    },
    inputsContainer: {
      padding: spacing(1, 0.4, 1, 1)
    },
    wrapper: ({ backgroundColor, customColor }: any) => ({
      padding: spacing(0),
      backgroundColor: colord(backgroundColor).isValid() ? backgroundColor : 'transparent',
      position: 'relative',
      borderRadius: '4px',
      borderWidth: !customColor ? 0 : 2,
      '&:hover': {
        boxShadow: customColor && `0px 0px 4px ${backgroundColor}`,
        border: customColor && customColor.unHover
      }
    }),
    full: {
      transition: transitions.create('all', {
        easing: transitions.easing.easeIn,
        duration: transitions.duration.complex
      })
    },
    unFull: {
      transition: transitions.create('all', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.complex
      })
    },
    attributeGroupContainer: {
      margin: spacing(0, 1.8)
    },
    checkBoxContainer: {}
  })
);

const NewPaKeep = () => {
  const [inputState, setInputState, { back: inputsBack, forward: inputsForward }] = useStateWithHistory(
    { title: '', text: '' },
    42
  );
  const [checkBoxes, setCheckBoxes, { back: checkBoxesBack, forward: checkBoxesForward }] = useStateWithHistory(
    [
      { color: 'default', value: 'Randomn0 ewjknv sdv wqdvjqw', isAccomplished: false, id: '0' },
      { color: 'default', value: 'Randomn1 ewjknv sdv wqdvjqw', isAccomplished: false, id: '1' },
      { color: 'default', value: 'Randomn2 ewjknv sdv wqdvjqw', isAccomplished: false, id: '2' },
      { color: 'default', value: 'Randomn3 ewjknv sdv wqdvjqw', isAccomplished: false, id: '3' },
      { color: 'default', value: 'Randomn4 ewjknv sdv wqdvjqw', isAccomplished: false, id: '4' }
    ],
    42
  );

  // console.log(checkBoxes);

  const nulittyState = {
    isCheckBoxes: !false,
    isInBookmark: false,
    isArchived: false,
    isFavorite: false,
    isPinned: false,
    id: nanoid(),
    events: [],
    color: 'default',
    backgroundColor: 'default',
    labels: ['label1']
  };

  const [state, setState] = useState(nulittyState);
  const [value, updateCookie, deleteCookie] = useCookie(JSON.stringify(state));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(JSON.parse(value!));
    // _.isEqual(state, nulittyState) && setState(JSON.parse(value!));
  }, []);

  usePageLeave(() => {
    updateCookie(JSON.stringify(state));
  });

  const nullityStatusState: { [key: string]: boolean } = {
    isTextHidden: true,
    isLabelViewHidden: false,
    isNewPakeepContainerHaveFullWidth: true,
    isAccomplishedCheckBoxesHidden: false
  };
  const [statusState, setStatusState] = useState(nullityStatusState);

  const handleAccomplishedCheckBoxesHiddenStatus = () => {
    setStatusState(state => ({
      ...state,
      isAccomplishedCheckBoxesHidden: !state.isAccomplishedCheckBoxesHidden
    }));
  };

  const handleSetFavoritePakeep = () => setState(state => ({ ...state, isFavorite: !state.isFavorite }));
  const handleSetBookmarkPakeep = () => setState(state => ({ ...state, isInBookmark: !state.isInBookmark }));
  const handleSetIsPinnedPakeep = () => setState(state => ({ ...state, isPinned: !state.isPinned }));
  const handleSetColorPakeep = (color: ColorType) => setState(state => ({ ...state, color }));
  const handleSetBackgroundColorPakeep = (backgroundColor: ColorType) =>
    setState(state => ({ ...state, backgroundColor }));
  const handleSetIsCheckBoxesPakeep = () => {
    const text = checkBoxes
      .map(({ value }) => {
        return `${value} \n`;
      })
      .join('');
    const checkBoxe = dropRight(
      inputState.text
        .toString()
        .split('\n')
        .map(value => ({
          value,
          id: nanoid(),
          color: 'default',
          isAccomplished: false
        }))
    );

    state.isCheckBoxes
      ? setInputState(state => ({
          ...state,
          text
        }))
      : setCheckBoxes(checkBoxe);
    setState(state => ({ ...state, isCheckBoxes: !state.isCheckBoxes }));
  };

  const handleAddNewLabel = (idWhichShouldBeAdded: LabelIdType) => {
    setState(state => ({ ...state, labels: [...state.labels, idWhichShouldBeAdded] }));
  };
  const handleDeleteNewLabel = (idWhichShouldBeDeleted: LabelIdType) => {
    setState(state => ({ ...state, labels: _.filter(state.labels, id => id !== idWhichShouldBeDeleted) }));
  };

  const handleAddNewPakeep = () => {
    setState(nulittyState);
    dispatch(operateToAddNewPakeep({ ...state, ...inputState }));
  };

  const hanldeChangeTextVisiblittyStatus = () =>
    setStatusState(state => ({ ...state, isTextHidden: !state.isTextHidden }));

  const handleSetWidthInNewPakeep = () => {
    setStatusState(state => ({
      ...state,
      isNewPakeepContainerHaveFullWidth: !state.isNewPakeepContainerHaveFullWidth
    }));
  };

  const handleDeleteLabelFromPakeepFunc = (placeholder: any, labelId: LabelIdType) => handleDeleteNewLabel(labelId);

  const [ref, { width: widthOfContainer }] = useMeasure<HTMLDivElement>();

  const onKeyDown: KeyboardEventHandler<HTMLElement> = e => {
    if (!e?.shiftKey && e?.code === 'Enter') {
      e?.preventDefault();
      // console.log(';');
      hanldeChangeTextVisiblittyStatus();
      // return setStatusState(state => ({ ...state, isWritingText: !state.isWritingText }));
    }
  };
  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(
    state.backgroundColor,
    state.color
  );

  // useLockBodyScroll(true);
  const handleStatusOfHideLabelView = () => {
    setStatusState(state => ({ ...state, isLabelViewHidden: !state.isLabelViewHidden }));
  };

  const classes = useStyles({
    isLabelViewHidden: statusState.isLabelViewHidden,
    color: state.color,
    customColor,
    backgroundColor: state.backgroundColor
  });

  const labelsListProps = {
    handleStatusOfHideLabelView,
    labels: state.labels,
    handleAddNewLabel,
    isLabelViewHidden: statusState.isLabelViewHidden,
    handleDeleteLabelFromPakeepFunc,
    handleDeleteNewLabel
  };
  const handleUndo = () => (!state.isCheckBoxes ? inputsBack(4) : checkBoxesBack(4));
  const handleRedo = () => (!state.isCheckBoxes ? inputsForward(4) : checkBoxesForward(4));
  const labelBargeNumber = statusState.isLabelViewHidden ? state.labels.length : 0;

  const handleSaveEvents: HandleSaveEventsType = (events:any) => {
    setState(state => ({ ...state, events }));
  };

  const eventsListProps = {
    events: state.events,
    handleSaveEvents
  };

const onClose = () => console.log('onClose')

  const newPakeepUtils = {
    ...state,
    ...statusState,
    eventsListProps,
    labelBargeNumber,
    handleSetFavoritePakeep,
    handleSetBookmarkPakeep,
    onClose,
    isBackgroundColorDefault,
    isColorDefault,
    handleSetColorPakeep,
    onSave: handleAddNewPakeep,
    handleSetWidth: handleSetWidthInNewPakeep,
    handleSetBackgroundColorPakeep,
    widthOfContainer,
    handleSetIsPinnedPakeep,
    handleUndo,
    isEditingUtilsHidden: false,
    handleRedo,
    labelsListProps,
    customColor,
    handleSetIsCheckBoxesPakeep
    // isBackgroundColorDefault,
    // isColorDefault
  };

  const globalLabels = useSelector(getLabels);
  const labels = useFilteredLabels(state.labels, globalLabels);

  const attributeGroupProps = {
    labels,
    handleDeleteLabelFromPakeepFunc,
    pakeepId: state.id,
    customColor: customColor,
    parentBackgrounColor: state.backgroundColor,
    events: state.events
  };

  const fullWidthValue = statusState.isNewPakeepContainerHaveFullWidth && 12;

  const breakpoint = useCustomBreakpoint();
  const breakpointsValues = { xs: 12, sm: 10 + 1, md: 8 + 1, lg: 6 + 1, xl: 4 + 1 };

  const gridContainerProps = {
    className: clsx(classes.container, statusState.isNewPakeepContainerHaveFullWidth ? classes.full : classes.unFull),
    //@ts-ignore
    [breakpoint]: fullWidthValue || breakpointsValues[breakpoint],
    ref
  };

  const handleChangeInputsValue: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    setInputState(state => ({ ...state, [name]: value }));
  };

  // console.log(
  //   firebase
  //     .firestore()
  //     .collection('users')
  //     .get()
  //     .then(r => console.log(r.exists))
  // );

  // console.log(  firebase?.auth()?.currentUser?.uid)
  return (
    <Grid {...gridContainerProps}>
      <Grid className={classes.wrapper}>
        <Grid className={classes.inputsContainer}>
          <Grid className={classes.titleContainer}>
            <InputBase
              onChange={handleChangeInputsValue}
              fullWidth
              autoFocus
              autoComplete={'off'}
              name={'title'}
              value={inputState.title}
              placeholder={'Title'}
              onKeyDown={onKeyDown}
              endAdornment={
                <InputAdornment position={'end'}>
                  <IconButtonByPas
                    aria-label={'toggle text visibility'}
                    size={'small'}
                    customColor={customColor}
                    icon={!statusState.isTextHidden ? Visibility : VisibilityOff}
                    onClick={hanldeChangeTextVisiblittyStatus}
                    // style={{ width: 48, marginRight: -8 }}
                    // onMouseDown={handleMouseDownPassword}
                    // edge={'end'}
                  />
                </InputAdornment>
              }
            />
          </Grid>
          {!statusState.isTextHidden && (
            // <Grid className={classes.textContainer}>
            <Grid>
              {state.isCheckBoxes ? (
                <CheckBoxContainer
                  checkBoxesArr={checkBoxes}
                  setCheckBoxes={setCheckBoxes}
                  customColor={customColor}
                  isAccomplishedCheckBoxesHidden={statusState.isAccomplishedCheckBoxesHidden}
                  handleAccomplishedCheckBoxesHiddenStatus={handleAccomplishedCheckBoxesHiddenStatus}
                />
              ) : (
                <InputBase
                  onChange={handleChangeInputsValue}
                  autoComplete={'off'}
                  fullWidth
                  name={'text'}
                  value={inputState.text}
                  autoFocus
                  placeholder={'Text'}
                  multiline
                  rowsMax={12}
                  rows={4}
                />
              )}
            </Grid>
          )}
        </Grid>
        {!statusState.isTextHidden && !statusState.isLabelViewHidden && (
          <Grid container className={classes.attributeGroupContainer}>
            <AttributeGroup {...attributeGroupProps} />
          </Grid>
        )}

        {!statusState.isTextHidden && <NewPakeepUtils {...newPakeepUtils} />}
      </Grid>
    </Grid>
  );
};

export default NewPaKeep;
