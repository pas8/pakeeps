import { find } from 'lodash';
import { GlobalLabelsType, LabelsOfPakeepType } from 'store/modules/App/types';

export const useFilteredLabels = (labels: LabelsOfPakeepType, globalLabels: GlobalLabelsType) => {
  const filteredLabels = labels.map(pakeepId => {
    const findedLabel = find(globalLabels, ({ id }) => id === pakeepId)!;
    return findedLabel;
  });

  return filteredLabels;
};
