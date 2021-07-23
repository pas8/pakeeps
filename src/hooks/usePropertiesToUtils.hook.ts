import { PakeepPropertyValueType } from './../store/modules/App/types';
import { map, mapKeys, every, forIn, mapValues } from 'lodash';
import { UsePropertiesToUtilsType, SelectedPakeepsType } from 'models/types';
import { VariantsOfropertiesToUtils } from 'models/unums';
import { PakeepElementType, PakeepPropertyKeysType } from 'store/modules/App/types';
import { $Keys } from 'utility-types';
import { IconUtilsFuncNameType } from 'components/HeaderWhenActiveSelecto/types';

export const usePropertiesToUtils: UsePropertiesToUtilsType = (
  pakeepPropertyies,
  selectedPakeeps,
  handleSelectedPakeepsPropertyFunc,
  cancelSelectedPakeepsId
) => {
  const { TOOGLE, VALUE } = VariantsOfropertiesToUtils;

  const functionObjectWithPropetyNameKeys = mapValues(
    pakeepPropertyies,
    ({ func, propertyValue, funcName, isShouldBeClosed }, key: PakeepPropertyKeysType) => {
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
        const valueFunc = (value: PakeepPropertyValueType) => {
          const newPakeeps = selectedPakeeps.map(el => ({ ...el, [key]: value }));
          handleSelectedPakeepsPropertyFunc(newPakeeps);
        };
        return { func: valueFunc, funcName };
      }
      return { func: () => {}, funcName };
    }
  );
  //@ts-ignore
  const objectWithKeysOfFuncNames = mapKeys(functionObjectWithPropetyNameKeys, ({ funcName }) => funcName);
  const functionObject = mapValues(objectWithKeysOfFuncNames, ({ func }: { func: Function }) => func);

  const propertyiesObject = mapValues(pakeepPropertyies, (value, key: PakeepPropertyKeysType) => {
    if (selectedPakeeps.length === 0) return false;

    const isEveryItemPropetyTrue = every(selectedPakeeps, el => !!el[key]);
    const propety = isEveryItemPropetyTrue;
    return propety;
  });
  const propertObject = { ...functionObject, ...propertyiesObject };

  return propertObject;
};
