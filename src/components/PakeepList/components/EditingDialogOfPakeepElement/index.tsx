import { FC } from 'react';
import { usePrevious, useToggle } from 'react-use';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { useMeasure } from 'react-use';
import { useSnackbar } from 'notistack';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, makeStyles, DialogTitle, DialogContent, InputBase, Dialog, DialogActions } from '@material-ui/core';

import IconsUtils from 'components/IconsUtils';
import { useAlpha } from 'hooks/useAlpha.hook';
import CheckBoxContainer from 'components/CheckBoxContainer';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { getIsUseEditingDialogAsNewPakeep } from 'store/modules/App/selectors';
import { DEFAULT } from 'models/denotation';
import { DialogLayoutName } from 'models/unums';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { toAddNewPakeep, toChangeTemporaryData, toEditPakeep } from 'store/modules/App/actions';
import { useFindPakeepUsingId } from 'hooks/useFindPakeepUsingId.hook';
import { DefaultMenuLayoutElementPropsType } from 'layouts/DialogsLayout/types';
import { useNewPakeepUtility } from 'hooks/useNewPakeepUtility.hook';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { IconsUtilsArrDenotationNameType } from 'components/IconsUtils/types';
import { useNewPakeepStatuses } from 'hooks/useNewPakeepStatuses.hook';

import { UseStylesOfEditingDialogOfPakeepElementtype } from './types';
import AttributeGroup from '../PakeepElement/components/AttributeGroup';

const useStyles = makeStyles(({ typography: { h4, h6, body1, h5 }, spacing }) => {
  return {
    containerClass: ({ backgroundColor, color, isSizeSmall }: UseStylesOfEditingDialogOfPakeepElementtype) => ({
      backgroundColor,
      height: isSizeSmall ? '100vh' : '',
      color,
      '& button': {
        color
      },
      '& .MuiDialogContent-root': {
        padding: isSizeSmall ? '4px 12px' : ''
      },
      '& .MuiDialogTitle-root': {
        paddingBottom: 0,
        marginLeft: isSizeSmall ? -10 : '',
        paddingRight: spacing(1.8),
        '& input': {
          ...h4
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
      '& > textarea ': {
        marginLeft: isSizeSmall ? -10 : ''
      },
      '& textarea ': {
        ...body1
      },
      '& .footer': {
        position: isSizeSmall ? 'fixed' : 'static',
        bottom: 0
      }
    }),
    attributeGroupContainer: () => ({
      padding: spacing(0, 1.8, 0.8),
      marginTop: spacing(-2)
    })
  };
});

const EditingDialogOfPakeepElement: FC<DefaultMenuLayoutElementPropsType> = ({
  id: pakeepId,
  onClose: handleClosePakeepDialog
}) => {
  if (!pakeepId) return null;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const findedPakeep = useFindPakeepUsingId(pakeepId);
  const isUseEditingDialogAsNewPakeep = useSelector(getIsUseEditingDialogAsNewPakeep);
  if (!findedPakeep && !isUseEditingDialogAsNewPakeep) return null;

  const dispatch = useDispatch();

  const nullityPakeep = {
    isCheckBoxes: false,
    isInBookmark: false,
    id: pakeepId,
    checkBoxes: [],
    isArchived: false,
    isFavorite: false,
    isPinned: false,
    events: [],
    title: '',
    text: '',
    color: DEFAULT,
    backgroundColor: DEFAULT,
    labels: []
  };

  const { backgroundColor, color, title, text, checkBoxes, id, labels, events, ...properties } =
    isUseEditingDialogAsNewPakeep ? nullityPakeep : findedPakeep!;

  const defaultState = {
    ...properties,
    id,
    labels,
    events,

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
    defaultCheckBoxesValue: checkBoxes,
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

  const TITLE = 'Title';

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
    isBackgroundColorDefault,
    isColorDefault,
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

  const previuosState = usePrevious(state);

  const handleRestoreLastGlobalLabel = () => {
    if (!previuosState) return;

    !isEqual(findedPakeep, previuosState) && setState(previuosState);
    setIsDialogOpen(true);
    closeSnackbar();
  };

  const [isDialogOpen, setIsDialogOpen] = useToggle(true);

  const handleSubmit = () => {
    dispatch(
      isUseEditingDialogAsNewPakeep ? toAddNewPakeep({ newPakeep: state }) : toEditPakeep({ editedPakeep: state })
    );

    enqueueSnackbar({
      message: isUseEditingDialogAsNewPakeep ? 'Pakeep  was successfully added' : 'Pakeep  was successfully changed'
    });
    handleClosePakeepDialog();
  };

  const onClose = () => {
    setIsDialogOpen(false);
    !isEqual(findedPakeep, previuosState) &&
      enqueueSnackbar({
        message: 'Dialog of creating label was closed',
        severity: 'warning',
        buttonText: 'Restore',
        onClick: handleRestoreLastGlobalLabel,
        icon: RestoreOutlinedIcon
      });

    dispatch(
      toChangeTemporaryData({
        newTemporaryData: {
          defaultDialogProps: { dialogName: DialogLayoutName.NONE, id: '', customColor: customColorPlaceholder },
          isUseEditingDialogAsNewPakeep: false
        }
      })
    );
    setIsDialogOpen(true);
  };

  const actionsButtonGroupProps = {
    onSave: handleSubmit,
    onClose,
    colorOfCloseButton: customColor && useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor?.hover
  };
  const { isSizeSmall } = useBreakpointNames();

  const classes = useStyles({
    backgroundColor: correctBackgroundColor,
    color: correctColor,
    isSizeSmall
  });

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      fullScreen={isSizeSmall}
      maxWidth={statusState.isNewPakeepContainerHaveFullWidth ? 'xl' : 'sm'}
      fullWidth={statusState.isNewPakeepContainerHaveFullWidth}
    >
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
        <DialogActions className={'footer'}>
          <Grid container>
            <Grid container className={classes.attributeGroupContainer}>
              <AttributeGroup {...attributeGroupProps} />
            </Grid>
            <Grid container alignItems={'center'} justify={'space-between'} wrap={'nowrap'}>
              <Grid>
                <IconsUtils {...iconsUtilsProps} />
              </Grid>
              <Grid>
                <ActionsButtonGroup {...actionsButtonGroupProps} />
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default EditingDialogOfPakeepElement;
