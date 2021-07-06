import { GlobalLabelsType } from 'store/modules/App/types';
import { find, filter, includes } from 'lodash';

import {
  OnlyPakeepReturnType,
  OperateWOP,
  PakeepElementType,
  PakeepIdType,
  PakeepPropertyValueType,
  PakeepsType,
  PayloadTypes,
  useHooksTypes
} from './types';
import { TypeNames } from './enums';

// export const useGetCurrentPakeep = (pakeepId: string, getState: any): PakeepElementType => {
//   const {
//     app: { pakeeps }
//   } = getState();
//   const currentPakeep = find(pakeeps, ({ id }) => pakeepId === id);
//   return currentPakeep;
// };

export const useFilterPakeeps = (pakeeps: PakeepsType, pakeepId: PakeepIdType): PakeepsType => {
  const filteredPakeeps = filter(pakeeps, ({ id }) => id !== pakeepId);
  return filteredPakeeps;
};

export const useFindPakeep = (pakeeps: PakeepsType, pakeepId: PakeepIdType): PakeepElementType | null => {
  const findedPakeep = find(pakeeps, ({ id }) => id === pakeepId);

  if (!findedPakeep) return null;
  return findedPakeep;
};

export const useChangePakeepProperty = ({
  pakeepId,
  properyName,
  propertyValue,
  pakeeps
}: useHooksTypes[TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP]): OnlyPakeepReturnType => {
  const findedPakeep = find(pakeeps, ({ id }) => pakeepId === id);
  if (!findedPakeep) return { pakeeps };

  const property: PakeepPropertyValueType =
    properyName === 'events' || properyName === 'labels'
      ? [...findedPakeep[properyName], propertyValue]
      : !findedPakeep[properyName];

  const newPakeep = { ...findedPakeep, [properyName]: property };

  const filteredPakeeps = filter(pakeeps, ({ id }) => pakeepId !== id);
  const variedPakeeps = [...filteredPakeeps, newPakeep];

  const variedState = { pakeeps: variedPakeeps };

  return variedState;
};

export const useChangePakeepCustomProperty = ({
  pakeepId,
  property,
  pakeeps
}: useHooksTypes[TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY]): OnlyPakeepReturnType => {
  const findedPakeep = find(pakeeps, ({ id }) => pakeepId === id);
  if (!findedPakeep) return { pakeeps };

  const newPakeep = { ...findedPakeep, ...property };

  const filteredPakeeps = filter(pakeeps, ({ id }) => pakeepId === id);
  const variedPakeeps = [...filteredPakeeps, newPakeep];

  const variedState = { pakeeps: variedPakeeps };

  return variedState;
};

export const useAddNewPakeep = ({
  pinnedPakeepsOrderNames,
  pakeepsOrderNames,
  pakeeps,
  newPakeep
}: useHooksTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP] & PayloadTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP]): any => {
  const isPinned = newPakeep?.isPinned;

  const newPakeeps = [...pakeeps, newPakeep];
  const newPakeepsOrderNames = isPinned ? pakeepsOrderNames : [newPakeep.id, ...pakeepsOrderNames];
  const newPinnedPakeepsOrderNames = isPinned ? [newPakeep.id, ...pinnedPakeepsOrderNames] : pinnedPakeepsOrderNames;

  const variedState = {
    pinnedPakeepsOrderNames: newPinnedPakeepsOrderNames,
    pakeepsOrderNames: newPakeepsOrderNames,
    pakeeps: newPakeeps
  };
  return variedState;
};

export const useDeletePakeep = ({
  pakeeps,
  pakeepId
}: useHooksTypes[TypeNames.HANDLE_DELETE_PAKEEP]): OnlyPakeepReturnType => {
  const filteredPakeeps = useFilterPakeeps(pakeeps, pakeepId);

  const variedState = { pakeeps: filteredPakeeps };
  return variedState;
};
export const useChangeGlobalLabelItem = ({
  globalLabels,
  changedLabel
}: PayloadTypes[TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM] & {
  globalLabels: GlobalLabelsType;
}): { labels: GlobalLabelsType } => {
  const filteredLabels = filter(globalLabels, ({ id }) => id !== changedLabel.id);
  const labels = [...filteredLabels, changedLabel];
  const variedState = { labels };
  return variedState;
};

export const useDeleteLabelFromPakeep = ({
  currentPakeepId,
  labelIdWhichShouldBeDeleted,
  pakeeps
}: PayloadTypes[TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP] & OnlyPakeepReturnType): OnlyPakeepReturnType => {
  const findedPakeep = useFindPakeep(pakeeps, currentPakeepId);
  if (!findedPakeep) return { pakeeps };

  const labels = filter(findedPakeep.labels, id => labelIdWhichShouldBeDeleted !== id);
  const newPakeep = { ...findedPakeep, labels };
  const newPakeeps = [...pakeeps, newPakeep];

  const variedState = { pakeeps: newPakeeps };
  return variedState;
};

export const useAddLabelToPakeep = ({
  currentPakeepId,
  labelIdWhichShouldBeAdded,
  pakeeps
}: PayloadTypes[TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP] & OnlyPakeepReturnType): OnlyPakeepReturnType => {
  const findedPakeep = useFindPakeep(pakeeps, currentPakeepId);
  if (!findedPakeep) return { pakeeps };

  const isPakeepHaveThisLabel = includes(findedPakeep.labels, labelIdWhichShouldBeAdded);

  const newLabels = [...findedPakeep?.labels, labelIdWhichShouldBeAdded];
  const labels = isPakeepHaveThisLabel ? findedPakeep.labels : newLabels;

  const newPakeep = { ...findedPakeep, labels };
  const newPakeeps = [...pakeeps, newPakeep];

  const variedState = { pakeeps: newPakeeps };
  return variedState;
};

export const usePinStatusOfPakeeps = ({
  pakeepId,
  pakeeps,
  pinnedPakeepsOrderNames,
  pakeepsOrderNames,
  isPakeepPinned
}: useHooksTypes[TypeNames.HANDLE_ADD_NEW_PAKEEP] & PayloadTypes[TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS]): any => {
  const findedPakeep = find(pakeeps, ({ id }) => id === pakeepId);
  if (!findedPakeep) return;
  const isPinned = isPakeepPinned ?? findedPakeep.isPinned;

  const filteredPakeeps = useFilterPakeeps(pakeeps, pakeepId);

  const newAddedPakeepOrderNames = includes(pakeepsOrderNames, findedPakeep.id)
    ? pakeepsOrderNames
    : [...pakeepsOrderNames, findedPakeep.id];
  const filteredPakeepsOrderNames = filter(pakeepsOrderNames, id => pakeepId !== id);
  const newPakeepsOrderNames = isPinned ? newAddedPakeepOrderNames : filteredPakeepsOrderNames;

  const newAddedPinnedPakeepOrderNames = includes(pinnedPakeepsOrderNames, findedPakeep.id)
    ? pinnedPakeepsOrderNames
    : [...pinnedPakeepsOrderNames, findedPakeep.id];

  const filteredPinnedPakeepsOrderNames = filter(pinnedPakeepsOrderNames, id => pakeepId !== id);
  const newPinnedPakeepsOrderNames = !isPinned ? newAddedPinnedPakeepOrderNames : filteredPinnedPakeepsOrderNames;

  const handlelingPakeep = { ...findedPakeep, isPinned: !isPinned };
  const newPakeeps = [...filteredPakeeps, handlelingPakeep];

  const variedState = {
    pakeeps: newPakeeps,
    pakeepsOrderNames: newPakeepsOrderNames,
    pinnedPakeepsOrderNames: newPinnedPakeepsOrderNames
  };
  return variedState;
};

export const useChangeSelectedPakeepsProperty = ({
  newPakeeps,
  pakeeps
}: PayloadTypes[TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY] & OnlyPakeepReturnType): OnlyPakeepReturnType => {
  const newPakeepsId = newPakeeps.map(({ id }) => id);
  const filteredPakeeps = filter(pakeeps, ({ id }) => !includes(newPakeepsId, id));
  const variedPakeeps = [...filteredPakeeps, ...newPakeeps];

  const variedState = { pakeeps: variedPakeeps };
  return variedState;
};
