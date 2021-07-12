import { mapValues } from 'lodash';
import { FolderArrType } from 'store/modules/App/types';

export const useAddIdToFolder = (obj: { [key: string]: { label: string; arr: FolderArrType } }) => {
  const folders = mapValues(obj, (value, id) => ({ ...value, id }));
  return folders;
};
