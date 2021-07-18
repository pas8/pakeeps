import { FC, MouseEventHandler, useState } from 'react';
import { difference, flatten, uniq } from 'lodash';
import { DragDropContext, Draggable, Droppable, DropResult, OnDragEndResponder } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Paper, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { getHeaderProperties } from 'store/modules/App/selectors';
import { useTakeAllHeaderUtils } from 'hooks/useTakeAllHeaderUtils.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import ButtonOfUdatingSetting from 'components/ButtonOfUdatingSetting';
import { toChangeHeaderOrder } from 'store/modules/App/actions';
import { headerProfileUtilsDenotationIds } from 'models/denotation';
import { NamesArrOFOrderOfHeaderUtilsType } from 'store/modules/App/types';
import { TransferListOfHeaderUtilsPropsType } from './types';
import ButtonUtils from './components/ButtonUtils';

const useStyles = makeStyles(({ palette, spacing, shape: { borderRadius }, typography: { subtitle1, subtitle2 } }) => ({
  root: {
    '& .lastItemContainer': {
      borderBottom: 0
    },
    '& .alwaysInSameColumnItemContainer': {
      color: palette.text.disabled,
      '&:hover': {
        color: palette.text.disabled,
        cursor: 'default'
      }
    },
    '& .draggingOverColumnContainer': {
      borderColor: palette.secondary.main
    },

    '& .draggingItemContainer': {
      borderRadius,
      color: palette.background.default,
      border: `1px solid ${palette.secondary.main}`,
      background: palette.secondary.main,
      '& p': {
        ...subtitle2,
        fontSize: subtitle1.fontSize
      }
    },

    '& .selectedItemContainer': {
      color: palette.secondary.main,
      // borderRight:`1px solid ${palette.secondary.main}`,
      // borderLeft:`1px solid ${palette.secondary.main}`,
      '& p': {
        ...subtitle2,
        fontSize: subtitle1.fontSize
      }
    }
  },

  button: {
    margin: spacing(0.5, 0)
  },
  columnContainer: {
    border: '1px solid',
    borderRadius,
    // padding:spacing(0,0.8),
    borderColor: useAlpha(palette.text.secondary),
    minWidth: 200
    // color: palette.secondary.main
  },
  itemContainer: {
    height: 48,
    padding: spacing(0, 0.4, 0, 1.4),

    // padding: spacing(0.8, 0),
    borderBottom: '1px solid',
    borderBottomColor: useAlpha(palette.text.primary),

    color: palette.text.secondary,
    '& svg': {
      marginTop: 4
    },
    '& p': {
      ...subtitle1
    },
    '& .iconContainer': {
      padding: spacing(0, 1.2, 0, 0)
    },

    '&:hover': {
      background: palette.background.paper,
      color: palette.secondary.main,

      '& p': {
        // ...subtitle2,
        fontSize: subtitle1.fontSize
      }
    }
  },

  footer: {
    margin: spacing(1.8, 0, 0)
  }
}));

export const arrOfProfileUtilsIdOfAlwaysInSameColumn = [
  [headerProfileUtilsDenotationIds.AVATAR_BUTTON] as NamesArrOFOrderOfHeaderUtilsType,
  [headerProfileUtilsDenotationIds.SIGN_IN_AS] as NamesArrOFOrderOfHeaderUtilsType
];


const TransferListOfHeaderUtils: FC<TransferListOfHeaderUtilsPropsType> = () => {
  const classes = useStyles();
  const { order } = useSelector(getHeaderProperties);

  const dispatch = useDispatch();

  const allHeaderButtonUtils = useTakeAllHeaderUtils();
  const [selected, setSelected] = useState<NamesArrOFOrderOfHeaderUtilsType>([]);


  const [state, setState] = useState([
    difference(order.names, order.exclusionNames).filter(
      id => !arrOfProfileUtilsIdOfAlwaysInSameColumn[0].includes(id)
    ),
    order.exclusionNames.filter(id => !arrOfProfileUtilsIdOfAlwaysInSameColumn[1].includes(id))
  ]);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleMove = (
    source: any[],
    destination: any[],
    { source: droppableSource, destination: droppableDestination }: DropResult
  ) => {
    if (!droppableDestination) return {};

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {} as { [key: string]: any };
    result[droppableSource.droppableId] = sourceClone.filter(id => !selected.includes(id));
    result[droppableDestination.droppableId] = uniq([...selected, ...destClone]);

    return result;
  };

  const onDragEnd: OnDragEndResponder = param => {
    const { source, destination } = param;
    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      console.log(items);

      const newState = [...state];
      newState[sInd] = items;
      return setState(newState);
    }

    const result = handleMove(state[sInd], state[dInd], param);
    const newState = [...state];
    newState[sInd] = result[sInd];
    newState[dInd] = result[dInd];
    setSelected([]);

    return setState(newState);
  };

  const onSave = () => {
    dispatch(
      toChangeHeaderOrder({
        newOrder: { exclusionNames: [...arrOfProfileUtilsIdOfAlwaysInSameColumn[1], ...state[1]] }
      })
    );
  };

  const columnsArr = [
    [...arrOfProfileUtilsIdOfAlwaysInSameColumn[0], ...state[0]],
    [...arrOfProfileUtilsIdOfAlwaysInSameColumn[1], ...state[1]]
  ];

  return (
    <Grid className={classes.root} container>
      <DragDropContext onDragEnd={onDragEnd}>
        {columnsArr.map((el, idx) => (
          <>
            <Droppable key={idx} droppableId={`${idx}`}>
              {(provided, { isDraggingOver }) => (
                <Grid ref={provided.innerRef} {...provided.droppableProps}>
                  <Grid
                    container
                    className={clsx(classes.columnContainer, isDraggingOver ? 'draggingOverColumnContainer' : '')}
                    direction={'column'}
                  >
                    {el.map((id, index) => (
                      <Draggable
                        key={id}
                        draggableId={id}
                        index={index - arrOfProfileUtilsIdOfAlwaysInSameColumn[idx].length}
                      >
                        {(provided, snapshot) => {
                          const { isDragging } = snapshot;
                          const findedEl = allHeaderButtonUtils[id];
                          if (!findedEl) return <></>;

                          const { toolTipText, component: Component, iconName } = findedEl;
                          const [icon] = useTakeIcon(iconName!);

                          const isAlwaysInSameColumn = flatten(arrOfProfileUtilsIdOfAlwaysInSameColumn).includes(id);
                          const draggableProps = isAlwaysInSameColumn
                            ? {
                                ref: provided.innerRef,
                                ...provided.draggableProps
                              }
                            : {
                                ...provided.draggableProps,
                                ...provided.dragHandleProps,
                                ref: provided.innerRef
                              };
                          const isSelected = selected.includes(id);

                          const handleSelectItem: MouseEventHandler<HTMLElement> = ({ ctrlKey }) => {
                            !isAlwaysInSameColumn &&
                              ctrlKey &&
                              setSelected(state => (state.includes(id) ? state : [...state, id]));
                          };

                          return (
                            <Grid {...draggableProps}>
                              <Grid
                                onClick={handleSelectItem}
                                className={clsx(
                                  classes.itemContainer,
                                  isSelected && !isDragging ? 'selectedItemContainer' : '',
                                  isAlwaysInSameColumn ? 'alwaysInSameColumnItemContainer' : '',
                                  isDragging ? 'draggingItemContainer' : '',
                                  el.length === index + 1 ? 'lastItemContainer' : ''
                                )}
                                container
                                alignItems={'center'}
                              >
                                <Grid component={'p'} className={'iconContainer'}>
                                  {!!iconName ? icon : <Component />}
                                </Grid>
                                <Typography>{toolTipText}</Typography>
                              </Grid>
                            </Grid>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Grid>
                </Grid>
              )}
            </Droppable>
            {idx === 0 && (
              <Box mx={2}>
                <ButtonUtils
                  selected={selected}
                  setSelected={setSelected}
                  setState={setState}
                  state={state}
                  // state={state.map(arr => }
                  exclusionNamesArr={arrOfProfileUtilsIdOfAlwaysInSameColumn}
                />
              </Box>
            )}
          </>
        ))}
      </DragDropContext>
      <Grid container className={classes.footer}>
        <Typography color={'textSecondary'}>{'Use ctrl + click to select item '} </Typography>
        <Grid container>
          <Box mt={1.8}>
            <ButtonOfUdatingSetting onClick={onSave} title={'Save changes'} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TransferListOfHeaderUtils;
