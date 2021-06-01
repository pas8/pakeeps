import { every } from 'lodash';
import { useState, useEffect } from 'react';

export const useGetIsColorDefault = (arr, property) => {
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => setIsDefault(every(arr, el => el[property] === arr[0][property])), [arr]);

  return !isDefault;
};
