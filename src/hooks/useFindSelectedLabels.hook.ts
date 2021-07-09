import { LabelsOfPakeepType } from 'store/modules/App/types';
import { intersection } from 'lodash';
import { UseFindSelectedLabelsType } from 'models/types';
import { useEffect, useState } from 'react';

export const useFindSelectedLabels: UseFindSelectedLabelsType = selectedPakeeps => {
  const [selectedLabels, setSelectedLabels] = useState<LabelsOfPakeepType>([]);

  const allLabels = selectedPakeeps.map(({ labels }) => labels);

  useEffect(() => {
    setSelectedLabels(intersection(...allLabels));
  }, [selectedPakeeps]);

  return selectedLabels;
};
