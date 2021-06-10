import { find, filter } from 'lodash';
import { PakeepElementInterface, PakeepPropertyKeysType, PakeepPropertyType, PakeepPropertyValueType, PakeepsType } from './interfaces';

export const useGetCurrentPakeep = (pakeepId: string, getState: any): PakeepElementInterface => {
  const {
    app: { pakeeps }
  } = getState();
  const currentPakeep = find(pakeeps, ({ id }) => pakeepId === id);
  return currentPakeep;
};

type UseGetValidatedPakeepsType = (
  pakeepId: string,
  properyName: PakeepPropertyKeysType,
  property: any,
  pakeeps: PakeepsType
) => PakeepsType;

export const useGetValidatedPakeeps: UseGetValidatedPakeepsType = (pakeepId, properyName, propertyValue, pakeeps) => {
  const findedPakeep = find(pakeeps, ({ id }) => pakeepId === id);
  if (!findedPakeep) return pakeeps;

  const property : PakeepPropertyValueType=  ? [...findedPakeep[properyName], propertyValue] : !findedPakeep[properyName];
  const newPakeep = { ...findedPakeep, property };

  const filteredPakeeps = filter(pakeeps, ({ id }) => pakeepId === id);
  const newPakeeps = [...filteredPakeeps, newPakeep];

  return newPakeeps;
};
