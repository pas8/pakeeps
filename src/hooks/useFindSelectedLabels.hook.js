import { intersection } from 'lodash';
import { useEffect,useState } from 'react';

export const useFindSelectedLabels = selectedPakeeps => {
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => setSelectedLabels(intersection(...allLabels)), [selectedPakeeps]);

  const allLabels = selectedPakeeps.map(({ labels }) => labels);
  return selectedLabels;
};
