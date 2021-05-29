import { find } from 'lodash';

export const useValidationOfPakeepsInColumn = (
  isPakeepDragContextPinned,
  { el,  folderProperty,folderId },
  draggableEl
) => {
  if (isPakeepDragContextPinned && el?.isPinned) return draggableEl;
  if (isPakeepDragContextPinned && !el?.isPinned) return null;

  if (folderProperty === 'isArchived' && el[folderProperty]) return draggableEl;
  if (el?.isArchived) return;
  if (el[folderProperty] && folderProperty !== 'label') return draggableEl;
  if (folderProperty !== 'isPinned' && el?.isPinned) return null;

  if (folderProperty === 'ALL') return draggableEl;

  if (folderProperty === 'label' && !!find(el?.labels, id => id === folderId)) return draggableEl;
};
