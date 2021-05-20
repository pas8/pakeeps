export const useFolders = (folderPropertyies,  { labels }) => {
  const isLabels = folderPropertyies?.labels;

  const arr = [
    { title: 'All pakeeps', iconName: '', id: "folder-1", property: 'ALL' },
    { title: 'Pined', iconName: 'pin', id: "folder-2", property: 'isPinned' }
  ];

  const labelsArr = labels.map(({ title, iconName, id }) => ({ title, iconName, id, property: 'label' }));


  // { title: 'All pakeeps', iconName: '', id: 1, property: 'ALL' },
  // { color: '', title: 'Day plans', iconName: 'category', id: 'label0', variant: 'outlined' },

  const foldersArr = [...arr,...labelsArr];
  console.log(foldersArr);


  return foldersArr;
};
