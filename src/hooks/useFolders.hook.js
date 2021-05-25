export const useFolders = ({ labels, defaultFolderArr }) => {
  const labelsArr = labels.map(({ title, iconName, id }) => ({ title, iconName, id, property: 'label' }));
  const foldersArr = [[...defaultFolderArr], [...labelsArr]];

  return foldersArr;
};
