import _ from 'lodash';
import { createArraySelector } from 'reselect-map';

const getPakeeplLabels = labels => labels;
const getGlobalLabels = (labels, globalLabels) => globalLabels;

export const getFilteredLabels = createArraySelector([getPakeeplLabels, getGlobalLabels], (pakeepId, globalLabels) =>
  _.find(globalLabels, ({ id }) => id === pakeepId)
);
