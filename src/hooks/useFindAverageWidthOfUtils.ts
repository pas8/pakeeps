import { useEffect, useState } from 'react';

export const useFindAverageWidthOfUtils = () => {
  const [averageWidth, setAverageWidth] = useState([]);
  const [averageWidthArr, setAverageWidthArr] = useState([]);
  const lengthOfUtilsArr = averageWidthArr.length;

  const handleConcatAverageWidth = value => {
    setAverageWidthArr(_.concat(averageWidthArr, value));
  };

  const averageOfArrFunc = arr => _.reduce(arr, (a, b) => a + b) / arr.length;

  useEffect(() => {
    const averageValueWhichShouldBeSet = averageWidthArr.length !== 0 && averageOfArrFunc(averageWidthArr);

    return setAverageWidth(averageValueWhichShouldBeSet);
  }, [averageWidthArr]);

  return [averageWidth, lengthOfUtilsArr, handleConcatAverageWidth];
};
