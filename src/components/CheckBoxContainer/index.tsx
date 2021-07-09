import { makeStyles, Grid, InputBase, Checkbox, Typography, Button, IconButton } from '@material-ui/core';
import { filter, findIndex } from 'lodash';
import clsx from 'clsx';
import { ChangeEventHandler, FC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { OnDragEndType } from 'components/PakeepList/components/WrapperOfContainer/types';
import { useAlpha } from 'hooks/useAlpha.hook';

import { CheckBoxItemPropsType } from './types';
import { nanoid } from 'nanoid';
import IconButtonByPas from 'components/IconButton';
import { CustomColorType, UseStylesCustomColorType } from 'models/types';
const useStyles = makeStyles(
  ({ spacing, palette, transitions, typography: { subtitle1, h5 }, shape: { borderRadius } }) => ({
    checkBoxContainer: ({ customColor }: UseStylesCustomColorType) => ({
      marginRight: spacing(-0.6),
      '& .dragging': {
        background: customColor.isUseDefault ? palette.background.paper : customColor.bgUnHover
      },
      '& button,.MuiCheckbox-root,p': {
        color: customColor.isUseDefault ? '' : customColor.hover,
        '&:hover .MuiTouchRipple-root': {
          background: customColor.isUseDefault ? '' : useAlpha(customColor.hover, 0.2)
        }
      },
      '& svg': {
        color: customColor.isUseDefault ? palette.text.secondary : customColor.hover
      }
    }),
    notAccomplishedCheckBoxContainer: ({ customColor }: UseStylesCustomColorType) => ({
      borderRadius,
      // '&:': {
      // border: '1px solid',
      //   borderBottomColor: useAlpha(palette.text.disabled, 0.2)
      // },

      '& .text': {
        width: 'calc(100% - 106px)'
      }
    }),
    accomplishedCheckBoxesContainer: {
      textDecoration: 'line-through',

      marginLeft: spacing(-0.6),
      color: palette.text.secondary,
      '& .text': {
        width: 'calc(100% - 80px)'
      }
    }
  })
);

const CheckBoxContainer: FC<CheckBoxItemPropsType> = ({
  checkBoxesArr,
  setCheckBoxes,
  customColor,
  isAccomplishedCheckBoxesHidden,
  handleAccomplishedCheckBoxesHiddenStatus
}) => {
  const classes = useStyles({ customColor });

  const accomplishedCheckBoxes = filter(checkBoxesArr, ({ isAccomplished }) => !!isAccomplished);
  const notAccomplishedCheckBoxes = filter(checkBoxesArr, ({ isAccomplished }) => !isAccomplished);
  // console.log(accomplishedCheckBoxes,notAccomplishedCheckBoxes)

  const onChangeOfInput: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    const idx = findIndex(checkBoxesArr, ({ id }) => id === name);
    const result = Array.from(checkBoxesArr);
    const [removed] = result.splice(idx, 1);
    result.splice(idx, 0, { ...removed, value });

    setCheckBoxes(result);
  };

  const onChangeOfCheckBox: ChangeEventHandler<HTMLInputElement> = ({ target: { name, checked: isAccomplished } }) => {
    const idx = findIndex(checkBoxesArr, ({ id }) => id === name);
    const result = Array.from(checkBoxesArr);
    const [removed] = result.splice(idx, 1);
    result.splice(idx, 0, { ...removed, isAccomplished });

    setCheckBoxes(result);

    // console.log(name, checked);
    // setCheckBoxes(state => ({ ...state.filter(), [name]: checked }));
  };

  const handleReorderList = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd: OnDragEndType = ({ source, destination }) => {
    // dropped outside the list
    if (!destination) return;
    const items = handleReorderList(notAccomplishedCheckBoxes, source.index, destination.index);
    setCheckBoxes([...items, ...accomplishedCheckBoxes]);
  };

  const handleAddCheckBoxItem = () => {
    setCheckBoxes((state: any) => [...state, { id: nanoid(), value: '', isAccomplished: false, color: 'default' }]);
  };
  const handleDeleteCheckBoxItem = (id: string) => {
    setCheckBoxes(state => state.filter(el => el.id !== id));
  };
  return (
    <Grid className={classes.checkBoxContainer} container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Grid {...provided.droppableProps} ref={provided.innerRef} container>
              {notAccomplishedCheckBoxes.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Grid
                      {...provided.draggableProps}
                      className={clsx(classes.notAccomplishedCheckBoxContainer, snapshot.isDragging && 'dragging')}
                      container
                      // style={{borderColor:snapshot.isDragging ? 'red' : ''}}
                      ref={provided.innerRef}
                    >
                      <Grid>
                        <Grid container justify={'center'} alignItems={'center'}>
                          <Grid {...provided.dragHandleProps}>
                            <Grid container justify={'center'} alignItems={'center'}>
                              <DragIndicatorIcon />
                            </Grid>
                          </Grid>
                          <Checkbox checked={false} onChange={onChangeOfCheckBox} name={item.id} />
                        </Grid>
                      </Grid>
                      <Grid className={'text'} item container>
                        <InputBase
                          name={item.id}
                          value={item.value}
                          autoFocus
                          onChange={onChangeOfInput}
                          multiline
                          fullWidth
                          placeholder={'Write something...'}
                        />
                      </Grid>
                      <Grid>
                        <IconButtonByPas
                          onClick={() => handleDeleteCheckBoxItem(item.id)}
                          icon={CloseOutlinedIcon}
                          customColor={customColor}
                          size={'small'}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <Grid container>
        <Button startIcon={<AddOutlinedIcon />} onClick={handleAddCheckBoxItem}>
          Add
        </Button>

        <Button
          startIcon={isAccomplishedCheckBoxesHidden ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          onClick={handleAccomplishedCheckBoxesHiddenStatus}
        >
          Expand{' '}
        </Button>
      </Grid>

      {!isAccomplishedCheckBoxesHidden &&
        accomplishedCheckBoxes.map(({ value, id }) => {
          return (
            <Grid container className={classes.accomplishedCheckBoxesContainer} key={`accomplishedCheckBoxes-${id}`}>
              <Grid>
                <Grid container justify={'center'} alignItems={'center'}>
                  <Checkbox checked={true} onChange={onChangeOfCheckBox} name={id} />
                </Grid>
              </Grid>

              <Grid className={'text'} item container alignItems={'center'}>
                <Typography >{!!value ? value : 'Empty element'}</Typography>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default CheckBoxContainer;
