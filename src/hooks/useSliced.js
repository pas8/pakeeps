import { useEffect, useState } from 'react';
import { useFindAverageWidthOfUtils } from './useFindAverageWidthOfUtils';

export const useSliced = (widthOfContainer, arrWhichShouldBeSliced) => {
  const [averageWidth, lengthOfUtilsArr, handleConcatAverageWidth] = useFindAverageWidthOfUtils();
  const [slicedArr, setSlicedArr] = useState([]);

  const slicedCoefficient = widthOfContainer / (averageWidth * lengthOfUtilsArr + averageWidth);
  const sliceArrayTo = lengthOfUtilsArr * slicedCoefficient;
  const isShouldBeSliced = slicedCoefficient < 1;

  useEffect(() => {
    if (isShouldBeSliced) setSlicedArr(arrWhichShouldBeSliced.slice(sliceArrayTo));
  }, [slicedCoefficient]);

  // const [isShouldBeSliced, setIsShouldBeSliced] = useState([]);
  // const [whereShouldBeSliced, setIsShouldBeSliced] = useState([]);

  return [slicedArr,isShouldBeSliced, handleConcatAverageWidth];
};
