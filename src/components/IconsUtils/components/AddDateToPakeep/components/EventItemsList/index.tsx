import { filter, includes } from 'lodash';
import { FC, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { MenusLayoutName } from 'models/unums';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { getAmpmStatus } from 'store/modules/Settings/selectors';

import DynamicInputDateAndTimePickers from '../DynamicComponents/components/DynamicInputDateAndTimePickers';
import DynamicMenuItem from '../DynamicMenuItem';
import { EventItemsListPropsType } from './types';
import { Box, Typography } from '@material-ui/core';

const EventItemsList: FC<EventItemsListPropsType> = ({
  eventListArr,
  setChosenItemArr,
  dateAndTimeInputsState,
  chosenItemArr,
  handleDateAndTimeInputsState,
  focusedEventId,
  customColor,
  pakeepId,
  currentEventsObject
}) => {
  const dispatch = useDispatch();
  const ampm = useSelector(getAmpmStatus);
  const reversedCustomColor = useGetReversedCustomColor(customColor);

  return (
    <>
      {eventListArr.map(({ title, iconName, onClick: onMenuItemClick, onlyTime, dynamicComponent, id }) => {
        const [icon] = useTakeIcon(iconName);
        const DynamicComponent = onMenuItemClick ?? dynamicComponent?.component ?? DynamicInputDateAndTimePickers;

        const name = id;

        const isChosen = includes(chosenItemArr, name);
        const isActiveIcon = isChosen;

        const isDynamicComponentShouldBeShown = !!(isChosen && DynamicComponent);

        const onClick = () => {
          const onDefaultClick = () => {
            setChosenItemArr(state => [...state, name]);
            // setButtonSaveState(true);
          };

          isChosen ? null : onMenuItemClick ? onMenuItemClick() : onDefaultClick();
        };
        const onClickOfCloseIcon = () => {
          setChosenItemArr(state => filter(state, elId => elId !== name));
        };
        const onClickOfEditIcon: MouseEventHandler<HTMLButtonElement> = ({ clientX: mouseX, clientY: mouseY }) => {
          dispatch(
            toChangeTemporaryData({
              newTemporaryData: {
                defaultMenuProps: {
                  mouseX,
                  mouseY,
                  menuName: MenusLayoutName.EVENTS,
                  customColor: reversedCustomColor,
                  id
                }
              }
            })
          );
        };

        const dynamicItemProps = { onClick };

        const dynamicComponentProps = {
          ...dynamicComponent?.props,
          icon,
          correctName: isChosen,
          name,
          value: dateAndTimeInputsState[name]?.value,
          inputValue: dateAndTimeInputsState[name]?.inputValue,
          format: currentEventsObject[name]?.format,
          onlyTime,
          onClickOfCloseIcon,
          title,
          ampm,
          handleDateAndTimeInputsState,
          customColor,
          focusedEventId,
          onClickOfEditIcon
        };

        // if (hidden) return;

        const dynamicMenuListProps = {
          DynamicComponent,
          dynamicComponentProps,
          title,
          isMarginSmaller: true,
          isActiveIcon,
          isDynamicComponentShouldBeShown,
          dynamicItemProps,
          icon,
          customColor,
          // key: name,
          isPreventClickOfMenuItem: isChosen
        };

        return <DynamicMenuItem {...dynamicMenuListProps} key={`dateListArrOf${pakeepId}${id}`} />;
      })}
      {eventListArr.length === 1 && (
        <Box maxWidth={296} p={0.8} borderTop={1} borderColor={'text.disabled'}>
          <Typography component={'legend'} variant={'caption'}>
            {'U didnt not added events yet, but u can simple do this by click to the "Add custom event" button'}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default EventItemsList;
