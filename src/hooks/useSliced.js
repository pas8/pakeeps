import { useEffect, useState } from 'react';
import { useFindAverageWidthOfUtils } from './useFindAverageWidthOfUtils';

export const useSliced = (widthOfContainer, arrWhichShouldBeSliced) => {
  const [averageWidth, lengthOfUtilsArr, handleConcatAverageWidth] = useFindAverageWidthOfUtils();
  const [slicedArr, setSlicedArr] = useState({ before: [], after: [] });

  const slicedCoefficient = widthOfContainer / (averageWidth * lengthOfUtilsArr + averageWidth);
  const sliceArrayTo = lengthOfUtilsArr * slicedCoefficient;
  const isShouldBeSliced = slicedCoefficient < 1;

  useEffect(() => {
    if (!isShouldBeSliced) return;

    const slicedBeforeArr = arrWhichShouldBeSliced.slice(0, sliceArrayTo);
    const slicedAfterArr = arrWhichShouldBeSliced.slice(sliceArrayTo);

    return setSlicedArr({ before: slicedBeforeArr, after: slicedAfterArr });
  }, [slicedCoefficient]);

  // const [isShouldBeSliced, setIsShouldBeSliced] = useState([]);
  // const [whereShouldBeSliced, setIsShouldBeSliced] = useState([]);

  return [slicedArr, isShouldBeSliced, handleConcatAverageWidth];
};
