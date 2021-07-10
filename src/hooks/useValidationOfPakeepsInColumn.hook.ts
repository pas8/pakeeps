import { find, filter, pull } from 'lodash';
import { pakeepPropertyiesNames } from 'models/denotation';
import { UseValidationOfPakeepsInColumnType } from 'models/types';
import { PakeepElementType, PakeepsType } from 'store/modules/App/types';

export const useValidationOfPakeepsInColumn: UseValidationOfPakeepsInColumnType = ({
  notValidatedPakeepsInColumn,
  folderProperty,
  folderId,
  isPakeepDragContextPinned
}) => {
  if (!notValidatedPakeepsInColumn) return null;

  const validatedPakeepsInColumn: (PakeepElementType | null)[] = notValidatedPakeepsInColumn.map(el => {
    if (!el) return null;
    if (folderProperty === 'ALL') return el;
    if (folderProperty === pakeepPropertyiesNames.isArchived && el[folderProperty]) return el;
    if (el?.isArchived) return null;
    if (!(folderProperty === 'label' || folderProperty === 'event') && el[folderProperty]) return el;
    if (!(folderProperty === 'label' || folderProperty === 'event') && !!find(el?.labels, id => id === folderId))
      return el;

    // if (folderProperty !== 'label' && el[folderProperty]) return el;

    // if (isPakeepDragContextPinned && el.isPinned) return el;
    // if (isPakeepDragContextPinned && !el.isPinned) return null;
    // if (folderProperty !== 'isPinned' && el?.isPinned) return null;

    return null;
  });
  //@ts-ignore
  const filtered: PakeepsType = pull(validatedPakeepsInColumn, null);

  return filtered;
};
