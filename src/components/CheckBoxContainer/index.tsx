import { makeStyles, Grid, InputBase, Checkbox, Typography, Button } from '@material-ui/core';
import { filter, findIndex } from 'lodash';
import { ChangeEventHandler, FC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { OnDragEndType } from 'components/PakeepList/components/WrapperOfContainer/types';
import { useAlpha } from 'hooks/useAlpha.hook';

import { CheckBoxItemPropsType } from './types';
import { nanoid } from 'nanoid';
const useStyles = makeStyles(
  ({ spacing, palette, transitions, typography: { subtitle1, h5 }, shape: { borderRadius } }) => ({
    checkBoxContainer: {
      '& svg': {
        color: palette.text.secondary
      }
    },
    notAccomplishedCheckBoxContainer: {
      background: palette.background.default,
      borderRadius,
      // '&:': {
      // border: '1px solid',
      //   borderBottomColor: useAlpha(palette.text.disabled, 0.2)
      // },

      '& .text': {
        width: '80%'
      }
    },
    accomplishedCheckBoxesContainer: {
      textDecoration: 'line-through',

      marginLeft: spacing(-0.6),
      color: palette.text.secondary,
      '& .text': {
        width: '80%'
      }
    }
  })
);

const CheckBoxContainer: FC<CheckBoxItemPropsType> = ({
  checkBoxesArr,
  setCheckBoxes,
  isAccomplishedCheckBoxesHidden,
  handleAccomplishedCheckBoxesHiddenStatus
}) => {
  const classes = useStyles();

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
    setCheckBoxes(state => [...state, { id: nanoid(), value: '', isAccomplished: false, color: 'default' }]);
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
                      {...provided.dragHandleProps}
                      className={classes.notAccomplishedCheckBoxContainer}
                      container
                      // style={{borderColor:snapshot.isDragging ? 'red' : ''}}
                      ref={provided.innerRef}
                    >
                      <Grid>
                        <Grid container justify={'center'} alignItems={'center'}>
                          <DragIndicatorIcon />
                          <Checkbox checked={false} onChange={onChangeOfCheckBox} name={item.id} />
                        </Grid>
                      </Grid>
                      <Grid className={'text'} item container justify={'center'} alignItems={'center'}>
                        <InputBase name={item.id} value={item.value} onChange={onChangeOfInput} multiline fullWidth placeholder={'Write something...'}/>
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

      {!isAccomplishedCheckBoxesHidden && accomplishedCheckBoxes.map(({ value, id }) => {
        return (
          <Grid container className={classes.accomplishedCheckBoxesContainer}>
            <Grid>
              <Grid container justify={'center'} alignItems={'center'}>
                <Checkbox checked={true} onChange={onChangeOfCheckBox} name={id} />
              </Grid>
            </Grid>

            <Grid className={'text'} item container alignItems={'center'}>
              <Typography color={'textSecondary'}>{value}</Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CheckBoxContainer;
