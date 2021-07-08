import { HandleSaveEventsType } from 'components/IconsUtils/components/AddDateToPakeep/types';
import { dropRight, filter } from 'lodash';
import { DEFAULT } from 'models/denotation';
import { HandleChangeInputsValueType, UseNewPakeepUtilityType } from 'models/types';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useStateWithHistory } from 'react-use';
import { getLabels } from 'store/modules/App/selectors';
import { ColorType, EventsOfPakeepType, LabelIdType } from 'store/modules/App/types';
import { useFilteredLabels } from './useFilteredLabels.hook';

export const useNewPakeepUtility: UseNewPakeepUtilityType = ({
  defaultState,
  defaultInputState,
  defaultCheckBoxesValue
}) => {
  const [inputState, setInputState, { back: inputsBack, forward: inputsForward }] = useStateWithHistory(
    defaultInputState,
    42
  );
  const [checkBoxes, setCheckBoxes, { back: checkBoxesBack, forward: checkBoxesForward }] = useStateWithHistory(
    defaultCheckBoxesValue,
    42
  );

  const [state, setState] = useState(defaultState);

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
    const newCheckBoxes = dropRight(
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
// console.log(newCheckBoxes)
    state.isCheckBoxes
      ? setInputState(state => ({
          ...state,
          text
        }))
      : setCheckBoxes(newCheckBoxes);
    setState(state => ({ ...state, isCheckBoxes: !state.isCheckBoxes }));
  };

  const handleAddNewLabel = (idWhichShouldBeAdded: LabelIdType) => {
    setState(state => ({ ...state, labels: [...state.labels, idWhichShouldBeAdded] }));
  };
  const handleDeleteNewLabel = (idWhichShouldBeDeleted: LabelIdType) => {
    setState(state => ({ ...state, labels: filter(state.labels, id => id !== idWhichShouldBeDeleted) }));
  };

  const handleUndo = () => (!state.isCheckBoxes ? inputsBack(4) : checkBoxesBack(4));
  const handleRedo = () => (!state.isCheckBoxes ? inputsForward(4) : checkBoxesForward(4));

  const handleChangeInputsValue: HandleChangeInputsValueType = ({ target: { name, value } }) => {
    setInputState(state => ({ ...state, [name]: value }));
  };

  const handleSaveEvents: HandleSaveEventsType = (events: EventsOfPakeepType) => {
    setState(state => ({ ...state, events }));
  };

  const globalLabels = useSelector(getLabels);
  const labelsOfAttributeGroup = useFilteredLabels(state.labels, globalLabels);



  const eventsListProps = {
    events: state.events,
    handleSaveEvents
  };

  const propertyies = {
    ...state,
    ...inputState,
    checkBoxes
  };

  const iconUtilsFuncs = {
    handleRedo,
    handleUndo,
    handleSetBookmarkPakeep,
    handleSetIsPinnedPakeep,
    handleSetColorPakeep,
    handleSetBackgroundColorPakeep,
    handleSetFavoritePakeep,
    handleSetIsCheckBoxesPakeep
  };

  const defaultLabelListProps = {
    handleAddNewLabel,
    handleDeleteNewLabel,
    labels: state.labels,
    pakeepId: state.id
  };

  return {
    state: propertyies,
    setState,
    iconUtilsFuncs,
    labelsOfAttributeGroup,
    defaultLabelListProps,
    handleChangeInputsValue,
    setCheckBoxes,
    eventsListProps
  };
};
