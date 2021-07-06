import { RootStoreType } from 'models/types';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

export const getColor = createSelector([({ color }: RootStoreType) => color], color => color);

