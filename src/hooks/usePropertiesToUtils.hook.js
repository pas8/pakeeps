import { map, mapKeys, every, forIn, mapValues } from 'lodash';

export const usePropertiesToUtils = (
  pakeepPropertyies,
  selectedPakeeps,
  handleSelectedPakeepsPropertyFunc,
  cancelSelectedPakeepsId,
  { TOOGLE, VALUE }
) => {
  const functionObjectWithPropetyNameKeys = mapValues(
    pakeepPropertyies,
    ({ func, propertyValue, funcName, isShouldBeClosed }, key) => {
      if (func) return { func, funcName };

      if (propertyValue === TOOGLE) {
        const isEveryItemPropetyTrue = every(selectedPakeeps, el => !!el[key]);
        const newPakeeps = selectedPakeeps.map(el => ({ ...el, [key]: !isEveryItemPropetyTrue }));

        const toogleFunc = () => {
          handleSelectedPakeepsPropertyFunc(newPakeeps);
          isShouldBeClosed && cancelSelectedPakeepsId();
        };
        return { func: toogleFunc, funcName };
      }
      if (propertyValue === VALUE) {
        const valueFunc = value => {
          const newPakeeps = selectedPakeeps.map(el => ({ ...el, [key]: value }));
          handleSelectedPakeepsPropertyFunc(newPakeeps);
        };
        return { func: valueFunc, funcName };
      }
      return { func: () => console.log(';'), funcName };
    }
  );

  const objectWithKeysOfFuncNames = mapKeys(functionObjectWithPropetyNameKeys, ({ funcName }) => funcName);
  const functionObject = mapValues(objectWithKeysOfFuncNames, ({ func }) => func);

  const propertyiesObject = mapValues(pakeepPropertyies, (value, key) => {
    if (selectedPakeeps.length === 0) return false;

    const isEveryItemPropetyTrue = every(selectedPakeeps, el => !!el[key]);
    const propety = isEveryItemPropetyTrue;
    return propety;
  });
  const propertObject = { ...functionObject, ...propertyiesObject };

  return propertObject;
};
