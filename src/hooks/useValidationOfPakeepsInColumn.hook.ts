import { find, filter, pull, values } from 'lodash';
import { pakeepPropertyiesNames } from 'models/denotation';
import { UseValidationOfPakeepsInColumnType } from 'models/types';
import { useSelector } from 'react-redux';
import { getGlobalFolderId } from 'store/modules/App/selectors';
import { PakeepElementType, PakeepsType } from 'store/modules/App/types';

export const useValidationOfPakeepsInColumn: UseValidationOfPakeepsInColumnType = ({
  notValidatedPakeepsInColumn,
  isPakeepDragContextPinned
}) => {
  const folderId = useSelector(getGlobalFolderId);
  const validatedPakeepsInColumn = notValidatedPakeepsInColumn.map(el => {
    if (!el) return null;
    if (folderId === pakeepPropertyiesNames.isArchived && !!el.isArchived) return el;
    if (el?.isArchived) return null;

    if (folderId === 'ALL') return el;

    if (!!el[values(pakeepPropertyiesNames).find(id => id === folderId)!]) return el;
    if (!!find(el?.labels, id => id === folderId)) return el;

    if (!!find(el?.events, ({ id }) => id === folderId)) return el;
    return null;
  });

  //@ts-ignore
  const filtered: PakeepsType = pull(validatedPakeepsInColumn, null);

  return filtered;
};
