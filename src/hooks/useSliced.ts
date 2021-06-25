import { NullityOfSlicedArrType } from 'components/IconsUtils/types';
import { UseSlicedType } from 'models/types';
import { useEffect, useState } from 'react';
import { useFindAverageWidthOfUtils } from './useFindAverageWidthOfUtils';

export const useSliced: UseSlicedType = (widthOfContainer = 0, arrWhichShouldBeSliced) => {
  const nullityOfSlicedArr = { before: [], after: [] };

  const [averageWidth, lengthOfUtilsArr, handleConcatAverageWidth] = useFindAverageWidthOfUtils();
  const [slicedArr, setSlicedArr] = useState<NullityOfSlicedArrType>(nullityOfSlicedArr);

  const slicedCoefficient = widthOfContainer / (averageWidth * lengthOfUtilsArr + averageWidth * 1.4);
  const sliceArrayTo = lengthOfUtilsArr * slicedCoefficient;
  const isShouldBeSliced = slicedCoefficient < 1;

  useEffect(() => {
    if (!isShouldBeSliced || !arrWhichShouldBeSliced) return;

    const slicedBeforeArr = arrWhichShouldBeSliced.slice(0, sliceArrayTo);
    const slicedAfterArr = arrWhichShouldBeSliced.slice(sliceArrayTo);

    return setSlicedArr({ before: slicedBeforeArr, after: slicedAfterArr });
  }, [slicedCoefficient]);

  // const [isShouldBeSliced, setIsShouldBeSliced] = useState([]);
  // const [whereShouldBeSliced, setIsShouldBeSliced] = useState([]);

  return [slicedArr, isShouldBeSliced, handleConcatAverageWidth];
};
