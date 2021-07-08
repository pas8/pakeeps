import { useState, FC, useEffect } from 'react';
import { useMeasure } from 'react-use';
import { useSelector } from 'react-redux';

import { Grid, makeStyles, DialogTitle, DialogContent, InputBase, Dialog, DialogActions } from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import { useAlpha } from 'hooks/useAlpha.hook';
import ActionsButtonGroup from 'components/ActionsButtonGroup';

import { getPakeeps } from 'store/modules/App/selectors';
import { useFindPakeepUsingId } from 'hooks/useFindPakeepUsingId.hook';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { usePakeepUtilsFunc } from 'hooks/usePakeepUtilsFunc.hook';
import { IconsUtilsArrDenotationNameType } from 'components/IconsUtils/types';
// import AttributeGroup from '../PakeepElement/components/AttributeGroup';

import { EditingDialogOfPakeepElementProps, onChangeType, UseStylesInteface } from './types';
import { useLabelListFunc } from 'hooks/useLabelListFunc.hook';
import { useNewPakeepUtility } from 'hooks/useNewPakeepUtility.hook';
import CheckBoxContainer from 'components/CheckBoxContainer';
import { useNewPakeepStatuses } from 'hooks/useNewPakeepStatuses.hook';
import AttributeGroup from '../PakeepElement/components/AttributeGroup';

const useStyles = makeStyles(({ typography: { h4, h6, body1, h5 }, spacing }) => {
  return {
    containerClass: ({ backgroundColor, color }: UseStylesInteface) => ({
      backgroundColor,
      color,
      '& button': {
        color
      },
      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        paddingRight: spacing(1.8),
        '& input': {
          ...h5
          // fontSize: spacing(2.8),
          // fontSize: h4.fontSize
        }
      },
      '& input, textarea': {
        color,
        caretColor: color,
        '&::selection ': {
          color: backgroundColor,
          backgroundColor: color
        }
      },
      '& textarea': {
        ...body1,
        // lineHeight: spacing(0.2),
        // fontWeight: 200,
        // fontSize: h6.fontSize,
        marginTop: spacing(0.4),
        // marginBottom: spacing(-2)
      }
    })
    // dialogIconsUtilsClass: { margin: spacing(-2, 0.4, 0), padding: spacing(0,4) }
  };
});

const EditingDialogOfPakeepElement: FC<EditingDialogOfPakeepElementProps> = ({
  id: pakeepId,
  handleClosePakeepDialog
}) => {
  if (!pakeepId) return null;

  const findedPakeep = useFindPakeepUsingId(pakeepId);
  if (!findedPakeep) return null;

  const { backgroundColor, color, title, text, checkBoxes, id, labels, events, ...properties } = findedPakeep;

  const defaultState = {
    ...properties,
    id,
    labels,
    events,
    checkBoxes,
    color,
    backgroundColor
  };

  const {
    setState,
    iconUtilsFuncs,
    state,
    defaultLabelListProps,
    handleChangeInputsValue,
    labelsOfAttributeGroup,
    eventsListProps: defaultEventsListProps,
    setCheckBoxes
  } = useNewPakeepUtility({
    defaultState,
    defaultCheckBoxesValue: [],
    defaultInputState: { title, text }
  });
  const {
    statusState,
    hanldeChangeTextVisiblittyStatus,
    handleSetWidth,
    handleStatusOfHideLabelView,
    handleAccomplishedCheckBoxesHiddenStatus
  } = useNewPakeepStatuses();

  // useEffect(() => {
  //   setState({ title, text, backgroundColor, color });
  // }, [findedPakeep]);

  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(
    state.backgroundColor,
    state.color
  );
  const correctBackgroundColor = state.backgroundColor;
  const correctColor = customColor.hover;

  const classes = useStyles({ backgroundColor: correctBackgroundColor, color: correctColor });

  const titleInputProps = {
    placeholder: 'Title',
    autoComplete: 'off',
    onChange: handleChangeInputsValue,
    fullWidth: true,
    name: 'title',
    value: state.title,
    autoFocus: true
  };

  const textInputProps = {
    placeholder: 'Text',
    autoComplete: 'off',
    onChange: handleChangeInputsValue,
    fullWidth: true,
    name: 'text',
    value: state.text,
    multiline: true
  };
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const JUST_PADDING_VALUE = 160;
  const widthOfContainer = width - JUST_PADDING_VALUE;

  const arrOfButtonNamesWhichSholudBeHidden: IconsUtilsArrDenotationNameType[] = [];
  // const arrOfButtonNamesWhichSholudBeHidden: IconsUtilsArrDenotationNameType[] = ['width'];
  const labelsListProps = {
    ...defaultLabelListProps,
    customColor,
    handleStatusOfHideLabelView
  };

  const eventsListProps = {
    ...defaultEventsListProps
  };

  const iconsUtilsProps = {
    ...iconUtilsFuncs,
    labelsListProps,
    widthOfContainer,
    id,
    handleSetWidth,
    eventsListProps,
    customColor,
    arrOfButtonNamesWhichSholudBeHidden,
    isEditingUtilsHidden: false
  };

  const attributeGroupProps = {
    labels: labelsOfAttributeGroup,
    pakeepId,
    customColor,
    parentBackgrounColor: state.backgroundColor,
    events: state.events
  };

  const handleSubmit = () => {
    console.log(state);
  };

  const isOpen = !!id;

  const onClose = () => {
    handleClosePakeepDialog();
  };

  const actionsButtonGroupProps = {
    onSave: handleSubmit,
    onClose,
    colorOfCloseButton: customColor && useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor?.hover
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={'md'} fullWidth={statusState.isNewPakeepContainerHaveFullWidth}>
      <Grid className={classes.containerClass} ref={ref}>
        <DialogTitle>
          <Grid container>
            <Grid style={{ flex: 1 }}>
              <InputBase {...titleInputProps} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {state.isCheckBoxes ? (
            <CheckBoxContainer
              checkBoxesArr={state.checkBoxes}
              setCheckBoxes={setCheckBoxes}
              customColor={customColor}
              isAccomplishedCheckBoxesHidden={statusState.isAccomplishedCheckBoxesHidden}
              handleAccomplishedCheckBoxesHiddenStatus={handleAccomplishedCheckBoxesHiddenStatus}
            />
          ) : (
            <InputBase {...textInputProps} />
          )}
        </DialogContent>

        {!statusState.isTextHidden && !statusState.isLabelViewHidden && (
          <Grid container>
            {/* <Grid container className={classes.attributeGroupContainer}> */}
            <AttributeGroup {...attributeGroupProps} />
          </Grid>
        )}

        <DialogActions>
          <Grid className={classes.dialogIconsUtilsClass} container alignItems={'center'} justify={'space-between'}>
            <Grid>
              <IconsUtils {...iconsUtilsProps} />
            </Grid>
            <Grid>
              <ActionsButtonGroup {...actionsButtonGroupProps} />
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default EditingDialogOfPakeepElement;
