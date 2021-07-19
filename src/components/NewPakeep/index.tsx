import { FC, KeyboardEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import { useCookie, useMeasure, usePageLeave } from 'react-use';
import { nanoid } from 'nanoid';
import { Grid, InputAdornment, InputBase, makeStyles } from '@material-ui/core';
import { colord } from 'colord';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
// import { operateToAddNewPakeep } from 'store/modules/App/operations';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import { useAlpha } from 'hooks/useAlpha.hook';
import AttributeGroup from 'components/PakeepList/components/PakeepElement/components/AttributeGroup';
import { useFilteredLabels } from 'hooks/useFilteredLabels.hook';
import { getLabels } from 'store/modules/App/selectors';
import CheckBoxContainer from 'components/CheckBoxContainer';
import IconButtonByPas from 'components/IconButton';
import { DEFAULT } from 'models/denotation';
import { useNewPakeepUtility } from 'hooks/useNewPakeepUtility.hook';
import { useNewPakeepStatuses } from 'hooks/useNewPakeepStatuses.hook';
import NewPakeepUtils from './components/Utils';
import { toAddNewPakeep } from 'store/modules/App/actions';

const useStyles = makeStyles(
  ({ spacing, palette, transitions, typography: { subtitle1, h5 }, shape: { borderRadius } }) => ({
    container: ({ customColor, isLabelViewHidden, backgroundColor }: any) => ({
      borderRadius,
      border: '1px solid',
      borderColor: useAlpha(palette.text.primary, 0.2),
      '& input,textarea': {
        '&::selection': {
          background: customColor.isUseDefault ? '' : customColor.hover,
          color: customColor.isUseDefault ? '' : customColor.bgHover
        },
        color: customColor.isUseDefault ? '' : customColor.hover,
        caretColor: customColor.isUseDefault ? palette.primary.main : customColor.hover
      }
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

const NewPaKeep: FC = () => {
  const dispatch = useDispatch();

  const defaultState = {
    isCheckBoxes: false,
    isInBookmark: false,
    isArchived: false,
    isFavorite: false,
    isPinned: false,
    events: [],
    id: nanoid(),
    color: DEFAULT,
    backgroundColor: DEFAULT,
    labels: []
  };

  const defaultInputState = { title: '', text: '' };

  const {
    setState,
    iconUtilsFuncs,
    state,
    defaultLabelListProps,
    handleChangeInputsValue,
    eventsListProps,
    setCheckBoxes,
    labelsOfAttributeGroup
  } = useNewPakeepUtility({
    defaultState,
    defaultCheckBoxesValue: [],
    defaultInputState
  });

  const {
    statusState,
    hanldeChangeTextVisiblittyStatus,
    handleSetWidth,
    handleStatusOfHideLabelView,
    handleAccomplishedCheckBoxesHiddenStatus
  } = useNewPakeepStatuses();

  // const [value, updateCookie, deleteCookie] = useCookie(JSON.stringify(state));

  // const handleDeleteLabelFromPakeepFunc = (placeholder: any, labelId: LabelIdType) => handleDeleteNewLabel(labelId);
  const [ref, { width: widthOfContainer }] = useMeasure<HTMLDivElement>();

  const onKeyDown: KeyboardEventHandler<HTMLElement> = e => {
    if (!e?.shiftKey && e?.code === 'Enter') {
      e?.preventDefault();
      hanldeChangeTextVisiblittyStatus();
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
    ...defaultLabelListProps,
    handleStatusOfHideLabelView,
    isLabelViewHidden: statusState.isLabelViewHidden
  };

  const labelBargeNumber = statusState.isLabelViewHidden ? state.labels.length : 0;

  const onClose = () => console.log('onClose');

  const attributeGroupProps = {
    labels: labelsOfAttributeGroup,
    pakeepId: state.id,
    customColor: customColor,
    parentBackgrounColor: state.backgroundColor,
    events: state.events
  };

  const fullWidthValue = statusState.isNewPakeepContainerHaveFullWidth && 12;

  const [breakpoint] = useCustomBreakpoint();
  const breakpointsValues = { xs: 12, sm: 10 + 1, md: 8 + 1, lg: 6 + 1, xl: 4 + 1 };

  const gridContainerProps = {
    className: clsx(classes.container, statusState.isNewPakeepContainerHaveFullWidth ? classes.full : classes.unFull),
    item: true,
    //@ts-ignore
    [breakpoint]: fullWidthValue || breakpointsValues[breakpoint],
    ref
  };
  // console.log(value)
  // useEffect(() => {
  //   // console.log(JSON.parse(value!));
  //   // _.isEqual(state, nulittyState) && setState(JSON.parse(value!));
  // }, []);

  // usePageLeave(() => {
  //   updateCookie(JSON.stringify(state));
  // });
  const handleAddNewPakeep = () => {
    setState({ ...defaultState, ...defaultInputState, checkBoxes: [] });
    dispatch(toAddNewPakeep({ newPakeep: state }));
  };

  const newPakeepUtils = {
    ...state,
    ...statusState,
    ...iconUtilsFuncs,
    eventsListProps,
    labelBargeNumber,
    onClose,
    isBackgroundColorDefault,
    isColorDefault,
    onSave: handleAddNewPakeep,
    handleSetWidth,
    widthOfContainer,
    isEditingUtilsHidden: false,
    labelsListProps,
    customColor
  };

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
              value={state.title}
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
                  />
                </InputAdornment>
              }
            />
          </Grid>
          {!statusState.isTextHidden && (
            <Grid>
              {state.isCheckBoxes ? (
                <CheckBoxContainer
                  checkBoxesArr={state.checkBoxes}
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
                  value={state.text}
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
