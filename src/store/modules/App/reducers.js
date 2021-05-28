import { filter, find, pickBy } from 'lodash';
import { createReducer } from 'store/utils';
import * as types from './types';

const initialState = {
  data: 1,
  defaultFolderArr: [
    { title: 'All pakeeps', iconName: '', id: 'folder-ALL', property: 'ALL' },
    { title: 'Pined', iconName: 'pin', id: 'folder-isPinned', property: 'isPinned' },
    { title: 'Bookmark', iconName: 'bookmark', id: 'folder-isInBookmark', property: 'isInBookmark' },
    { title: 'Favorite', iconName: 'favorite', id: 'folder-isFavorite', property: 'isFavorite' },
    { title: 'Archiveted', iconName: 'archive', id: 'folder-isArchived', property: 'isArchived' }
  ],

  labels: [
    { color: '', title: 'Day plans', iconName: 'category', id: 'label0', variant: 'outlined' },
    { color: '#dd6b2a', title: 'Week plans', iconName: 'star', id: 'label1', variant: 'outlined' },
    { color: 'primary', title: 'Mouth plans', iconName: 'keyboard', id: 'label2', variant: 'outlined' },
    { color: 'secondary', title: 'Year plans', iconName: '', id: 'label3', variant: 'outlined' },
    { color: '#6e9f47', title: 'Your plans', iconName: 'star', id: 'label6', variant: 'default' },
    { color: '', title: 'Hobby Placeholders', iconName: '', id: 'label4', variant: 'default' }
  ],

  folders: [[]],

  pakeeps: [
    {
      title: 'Placeholder 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isInBookmark: true,
      isFavorite: true,
      color: 'default',
      labels: ['label3', 'label1', 'label0', 'label2'],
      isArchived: false,
      id: 'pakeep1',
      isPinned: true,
      backgroundColor:'default'
    },
    {
      title: 'Placeholder 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      isInBookmark: false,
      isFavorite: true,
      color: 'default',
      labels: ['label4', 'label0', 'label1', 'label2', 'label3'],
      id: 'pakeep2',
      isArchived: false,
      isPinned: false,
      backgroundColor:'default'

    },
    {
      title: 'Placeholder 3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: true,
      isFavorite: false,
      color: 'default',
      labels: ['label0', 'label2', 'label6'],
      isArchived: false,
      isPinned: true,
      id: 'pakeep3',
      backgroundColor:'default'

    },
    {
      title: 'Placeholder 4',
      text: 'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
      isInBookmark: false,
      isFavorite: true,
      color: 'primary',
      labels: ['label1', 'label2', 'label0', 'label6'],
      isArchived: false,
      id: 'pakeep4',
      isPinned: true,
      backgroundColor:'transparent'

    },
    {
      title: 'Placeholder 5',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isInBookmark: false,
      isFavorite: false,
      color: 'default',
      isPinned: false,
      isArchived: true,
      labels: ['label4', 'label0', 'label1', 'label2'],
      id: 'pakeep5',
      backgroundColor:'default'

    },
    {
      title: 'Placeholder 6',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum. Ipsum consequat nisl vel pretium lectus quam id leo. Lacinia quis vel eros donec ac odio tempor orci. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ac odio tempor orci dapibus. Pellentesque habitant morbi tristique senectus et netus. Et netus et malesuada fames ac. Est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor.',
      isInBookmark: false,
      isFavorite: false,
      color: 'default',
      labels: ['label0', 'label2', 'label6'],
      id: 'pakeep6',
      isPinned: true,
      isArchived: true,
      backgroundColor:'default'

    }
    // {
    //   title: 'Placeholder 7',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [{ color: 'primary', title: 'Day plans', icon: '', key: 0 }],
    //   id: 'pakeep7',
    //   isPinned: false
    // },
    // {
    //   title: 'Placeholder 8',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [
    //     { color: 'secondary', title: 'Plans', icon: '', key: 0 },
    //     { color: 'default', title: 'Week plans', icon: '', key: 1 },
    //     { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
    //     { color: 'primary', title: 'Year plans', icon: '', key: 3 },
    //     { color: 'secondary', title: 'Hobby Placeholders', icon: '', key: 4 }
    //   ],
    //   isPinned: true,
    //   id: 'pakeep8'
    // },
    // {
    //   title: 'Placeholder 9',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [
    //     { color: 'secondary', title: 'Plans', icon: '', key: 0 },
    //     { color: 'default', title: 'Week plans', icon: '', key: 1 },
    //     { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
    //     { color: 'primary', title: 'Year plans', icon: '', key: 3 },
    //     { color: 'secondary', title: 'Hobby Placeholders', icon: '', key: 4 }
    //   ],
    //   id: 'pakeep9',
    //   isPinned: true
    // },
    // {
    //   title: 'Placeholder 10',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [{ color: 'primary', title: 'Day plans', icon: '', key: 0 }],
    //   id: 'pakeep10',
    //   isPinned: false
    // },
    // {
    //   title: 'Placeholder 11',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [],
    //   isPinned: true,
    //   id: 'pakeep11'
    // },
    // {
    //   title: 'Placeholder 12',
    //   text: 'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'transparent',
    //   labels: [
    //     { color: 'default', title: 'Day plans', icon: '', key: 0 },
    //     { color: 'default', title: 'Week plans', icon: '', key: 1 },
    //     { color: 'primary', title: 'Mouth plans', icon: 'keyboard', key: 2 },
    //     { color: 'secondary', title: 'Year plans', icon: '', key: 3 }
    //   ],
    //   id: 'pakeep12',
    //   isPinned: true
    // },
    // {
    //   title: 'Placeholder 13',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   isPinned: false,
    //   labels: [{ color: 'default', title: 'Hobby Placeholders', icon: 'alarm', key: 4 }],
    //   id: 'pakeep13'
    // },
    // {
    //   title: 'Placeholder 14',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum. Ipsum consequat nisl vel pretium lectus quam id leo. Lacinia quis vel eros donec ac odio tempor orci. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ac odio tempor orci dapibus. Pellentesque habitant morbi tristique senectus et netus. Et netus et malesuada fames ac. Est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [{ color: 'secondary', title: 'Hobby', icon: 'alarm', key: 4 }],
    //   id: 'pakeep14',
    //   isPinned: true,
    //   events: [{ color: 'secondary', title: 'Hobby', icon: 'alarm', key: 4 }]
    // },
    // {
    //   title: 'Placeholder 15',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [{ color: 'primary', title: 'Day plans', icon: '', key: 0 }],
    //   id: 'pakeep15',
    //   isPinned: false
    // },
    // {
    //   title: 'Placeholder 16',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: [
    //     { color: 'secondary', title: 'Plans', icon: '', key: 0 },
    //     { color: 'default', title: 'Week plans', icon: '', key: 1 },
    //     { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
    //     { color: 'primary', title: 'Year plans', icon: '', key: 3 },
    //     { color: 'secondary', title: 'Hobby Placeholders', icon: '', key: 4 }
    //   ],
    //   isPinned: true,
    //   id: 'pakeep16'
    // },
  ],
  pakeepsOrderNames: ['pakeep1', 'pakeep2', 'pakeep3', 'pakeep4', 'pakeep5', 'pakeep6'],
  notifinationCounter: 8,
  isMenuOpen: false,
  scrollDirectionName: 'up',
  currentFolderPropertyIdx: 0,
  drawerWidth: 0,
  isUsePreviuosOrder: false
};

const AppReducer = createReducer(initialState)({
  [types.ADD_NEW_PAKEEP]: (state, { newPaKeep }) => ({
    ...state,
    pakeeps: [...state.pakeeps, newPaKeep]
  }),
  // [types.HANDLE_CHANGE_PAKEEP_PROPERTY]: (state, { newPaKeep }) => ({
  //   ...state,

  //   pakeeps: [...state.pakeeps, newPaKeep]
  // }),

  [types.HANDLE_FOLDERS]: (state, { foldersArr }) => ({
    ...state,
    folders: foldersArr
  }),

  [types.ADD_NEW_GLOBAL_LABEL]: (state, { newLabel }) => ({
    ...state,
    labels: [...state.labels, newLabel]
  }),
  [types.CHANGE_LABEL_ITEM]: (state, { labels }) => ({
    ...state,
    labels
  }),
  [types.DELETE_LABEL_FROM_PAKEEP]: (state, { currentPakeep, labels }) => ({
    ...state,
    isUsePreviuosOrder: true,
    pakeeps: [...filter(state.pakeeps, ({ id }) => currentPakeep.id !== id), { ...currentPakeep, labels }]
  }),

  [types.HANDLE_CURRENT_FOLDER_PROPERTY_IDX]: (state, { folderIdx }) => ({
    ...state,
    currentFolderPropertyIdx: folderIdx
  }),
  [types.SET_NEW_ORDER_NAMES]: (state, { newOrder }) => ({
    ...state,
    pakeepsOrderNames: newOrder
  }),
  [types.HANDLE_SET_PREVIUOS_ORDER_NAMES]: (state, { orderNames }) => ({
    ...state,
    isUsePreviuosOrder: false,
    pakeepsOrderNames: orderNames
  }),

  [types.HANDLE_DRAWER_WIDTH]: (state, { drawerWidth }) => ({ ...state, drawerWidth }),
  [types.DELETE_PAKEEP]: (state, { id }) => ({
    ...state,
    pakeeps: pickBy(state.pakeeps, ({ id: pakeepsId }) => id !== pakeepsId)
  }),
  [types.SCROLL_DIRECTION]: (state, { scrollDirectionName }) => ({
    ...state,
    scrollDirectionName
  }),

  [types.IS_MENU_OPEN]: (state, { boolStatus }) => ({ ...state, isMenuOpen: boolStatus }),
  [types.ADD_DATE_TO_PAKEEP]: (state, { pakeepId, event }) => ({
    ...state,
    pakeeps: {
      ...state.pakeeps,
      [pakeepId]: {
        ...state.pakeeps[pakeepId],
        date: [...state.pakeeps[pakeepId].date, event]
      }
    }
  })
});

export default AppReducer;
