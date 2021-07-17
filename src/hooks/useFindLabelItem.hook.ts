import { find } from 'lodash';
import { UseFindLabelItem } from 'models/types';
import { useSelector } from 'react-redux';
import { getLabels } from 'store/modules/App/selectors';

export const useFindLabelItem: UseFindLabelItem = labelId => {
  const labels = useSelector(getLabels);

  const findedLabel = find(labels, ({ id }) => labelId === id)!;
  return findedLabel;
};
