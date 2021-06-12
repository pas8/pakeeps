import { concat, reduce } from 'lodash';
import { useEffect, useState } from 'react';

export const useFindAverageWidthOfUtils = (): [number, number, Function] => {
  const [averageWidth, setAverageWidth] = useState<number>(0);
  const [averageWidthArr, setAverageWidthArr] = useState<number[]>([]);
  const lengthOfUtilsArr = averageWidthArr.length;

  const handleConcatAverageWidth = (value: number) => {
    setAverageWidthArr(concat(averageWidthArr, value));
  };

  const averageOfArrFunc = (arr: any[]): number => {
    if (arr.length <= 2) return 0;
    return reduce(arr, (a = 0, b) => a + b) / arr.length;
  };

  useEffect(() => {
    const averageValueWhichShouldBeSet: number = averageWidthArr.length !== 0 ? averageOfArrFunc(averageWidthArr) : 0;

    return setAverageWidth(averageValueWhichShouldBeSet);
  }, [averageWidthArr]);

  return [averageWidth, lengthOfUtilsArr, handleConcatAverageWidth];
};
