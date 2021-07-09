import { every } from 'lodash';
import { useState, useEffect } from 'react';
import { PakeepsType } from 'store/modules/App/types';

export const useGetIsColorDefault = (arr: PakeepsType, property: 'color' | 'backgroundColor') => {
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    setIsDefault(every(arr, el => el[property] === arr[0][property]));
  }, [arr]);

  return !isDefault;
};
