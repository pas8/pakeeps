import _ from 'lodash';
import { createSelector } from 'reselect';


export const getColorsArr = createSelector([ colorsArr => colorsArr], colorsArr => colorsArr);
