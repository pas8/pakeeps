import { every } from 'lodash';
import { DEFAULT } from 'models/denotation';
import { useState, useEffect } from 'react';
import { PakeepsType } from 'store/modules/App/types';

export const useGetIsColorDefault = (arr: PakeepsType, property: 'color' | 'backgroundColor') => {
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    setIsDefault(
      every(arr, el => {
        return el[property] === arr[0][property] && el[property] === DEFAULT;
      })
    );
  }, [arr]);

  return isDefault;
};
