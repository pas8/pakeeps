import { addDays } from 'date-fns';
import { filter, find, pickBy, includes, map, every } from 'lodash';
import { createReducer } from 'store/utils';
import { DefaultThemeInterface, InitialStateInteface } from './interfaces';
import * as types from './types';

export const defaultTheme: DefaultThemeInterface = {
  primaryMain: '#ffff8d',
  paperMain: '#424242',
  defaultBackgroundMain: '#282828',
  secondaryMain: '#00b0ff',
  type: 'dark',
  highEmphasis: 'rgba(255,255,255,0.8)',
  mediumEmphasis: 'rgba(255,255,255,0.6)',
  maxEmphasis: 'rgba(255,255,255,0.96)'
};

const initialState: InitialStateInteface = {
  breakpointsValues: { xs: 1, sm: 600, md: 960, lg: 1280, xl: 1920 },
  theme: defaultTheme,
  defaultFolderArr: [
    { title: 'All pakeeps', iconName: '', id: 'folder-ALL', property: 'ALL' },
    { title: 'Pined', iconName: 'pin', id: 'folder-isPinned', property: 'isPinned' },
    { title: 'Bookmark', iconName: 'bookmark', id: 'folder-isInBookmark', property: 'isInBookmark' },
    { title: 'Favorite', iconName: 'favorite', id: 'folder-isFavorite', property: 'isFavorite' },
    { title: 'With chckebox', iconName: 'checkbox', id: 'folder-isCheckBoxes', property: 'isCheckBoxes' },
    { title: 'Archiveted', iconName: 'archive', id: 'folder-isArchived', property: 'isArchived' }
  ],

  labels: [
    { color: '', title: 'Day plans', iconName: 'category', id: 'label0', variant: 'outlined' },
    { color: '#dd6b2a', title: 'Week plans', iconName: 'star', id: 'label1', variant: 'outlined' },
    { color: 'primary', title: 'Mouth plans', iconName: 'keyboard', id: 'label2', variant: 'outlined' },
    { color: 'secondary', title: 'Year plans', iconName: '', id: 'label3', variant: 'outlined' },
    { color: '#6e9f47', title: 'Your plans', iconName: 'star', id: 'label6', variant: 'default' },
    { color: '', title: 'Hobby Placeholders', iconName: 'bookmark', id: 'label4', variant: 'default' },
    { color: '#afa646', title: 'Eco', iconName: 'eco', id: 'label8', variant: 'default' }
  ],
  events: [
    { title: 'Later today', iconName: 'today', id: '1', value: Date.now(), onlyTime: true, color: '' },
    { title: 'Tomorrow', iconName: 'tomorrow', id: '2', value: addDays(Date.now(), 1), onlyTime: true, color: '' },
    { title: 'Next week', iconName: 'week', id: '3', value: addDays(Date.now(), 7), color: '' }
  ],
  selectedPakeepsId: [],
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
      events: [],
      id: 'pakeep1',
      isPinned: true,
      isCheckBoxes: true,
      backgroundColor: 'default'
    },
    // {
    //   title: 'Placeholder 2',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
    //   isInBookmark: false,
    //   events: [],
    //   isFavorite: true,
    //   color: 'default',
    //   labels: ['label4', 'label0', 'label1', 'label2', 'label3'],
    //   id: 'pakeep2',
    //   isArchived: false,
    //   isPinned: false,
    //   isCheckBoxes: false,

    //   backgroundColor: 'default'
    // },
    // {
    //   title: 'Placeholder 3',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
    //   isInBookmark: true,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: ['label0', 'label2', 'label6'],
    //   isArchived: false,
    //   isPinned: true,
    //   id: 'pakeep3',
    //   events: [],
    //   isCheckBoxes: false,

    //   backgroundColor: 'default'
    // },
    // {
    //   title: 'Placeholder 4',
    //   text: 'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
    //   isInBookmark: false,
    //   isFavorite: true,
    //   color: '#312b03',
    //   labels: ['label1', 'label2', 'label0', 'label6'],
    //   events: [],
    //   isArchived: false,
    //   id: 'pakeep4',
    //   isPinned: true,
    //   backgroundColor: '#969696',
    //   isCheckBoxes: false
    // },
    // {
    //   title: 'Placeholder 5',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   isPinned: false,
    //   events: [],
    //   isArchived: true,
    //   labels: ['label4', 'label0', 'label1', 'label2'],
    //   id: 'pakeep5',
    //   backgroundColor: 'default',
    //   isCheckBoxes: false
    // },
    // {
    //   title: 'Placeholder 6',
    //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum. Ipsum consequat nisl vel pretium lectus quam id leo. Lacinia quis vel eros donec ac odio tempor orci. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ac odio tempor orci dapibus. Pellentesque habitant morbi tristique senectus et netus. Et netus et malesuada fames ac. Est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor.',
    //   isInBookmark: false,
    //   isFavorite: false,
    //   color: 'default',
    //   labels: ['label0', 'label2', 'label6'],
    //   id: 'pakeep6',
    //   events: [],
    //   isPinned: true,
    //   isCheckBoxes: false,
    //   isArchived: true,
    //   backgroundColor: 'default'
    // },
    {
      title: 'Placeholder 7',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      isInBookmark: false,
      events: [],
      isArchived: false,
      isPinned: false,
      isCheckBoxes: false,
      isFavorite: false,
      color: 'default',
      labels: ['label4', 'label6'],
      id: 'pakeep7',
      backgroundColor: '#470000'
    },
    {
      title: 'Placeholder 8',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: false,
      id: 'pakeep8'
    }
  ],
  pakeepsOrderNames: [],
  pinnedPakeepsOrderNames: [],
  notifinationCounter: 8,
  isMenuOpen: false,
  currentFolderPropertyIdx: 0,
  drawerWidth: 0,
  isCancelSelectedPakeepsId: false
};

const AppReducer = createReducer(initialState)({
  [types.ADD_NEW_PAKEEP]: (state, { newPaKeep }) => {
    const isPinned = newPaKeep?.isPinned;

    const pakeeps = [...state.pakeeps, newPaKeep];
    const pakeepsOrderNames = isPinned ? state.pakeepsOrderNames : [...state.pakeepsOrderNames, newPaKeep.id];
    const pinnedPakeepsOrderNames = isPinned
      ? [...state.pinnedPakeepsOrderNames, newPaKeep.id]
      : state.pinnedPakeepsOrderNames;

    return { ...state, pinnedPakeepsOrderNames, pakeepsOrderNames, pakeeps };
  },
  // [types.HANDLE_CHANGE_PAKEEP_PROPERTY]: (state, { newPaKeep }) => ({
  //   ...state,

  //   pakeeps: [...state.pakeeps, newPaKeep]
  // }),

  [types.HANDLE_FOLDERS]: (state, { foldersArr }) => ({
    ...state,
    folders: foldersArr
  }),
  [types.HANDLE_PIN_STATUS_OF_PAKEEPS]: (state, { pakeepId, isPakeepPinned = false }) => {
    const findedPakeep = find(state.pakeeps, ({ id }) => id === pakeepId);
    const isPinned = isPakeepPinned ?? findedPakeep.isPinned;

    const filteredPakeeps = filter(state.pakeeps, ({ id }) => pakeepId !== id);

    const newAddedPakeepOrderNames = includes(state.pakeepsOrderNames, findedPakeep.id)
      ? state.pakeepsOrderNames
      : [...state.pakeepsOrderNames, findedPakeep.id];
    const filteredPakeepsOrderNames = filter(state.pakeepsOrderNames, ({ id }) => pakeepId !== id);
    const pakeepsOrderNames = isPinned ? newAddedPakeepOrderNames : filteredPakeepsOrderNames;

    const newAddedPinnedPakeepOrderNames = includes(state.pinnedPakeepsOrderNames, findedPakeep.id)
      ? state.pinnedPakeepsOrderNames
      : [...state.pinnedPakeepsOrderNames, findedPakeep.id];

    const filteredPinnedPakeepsOrderNames = filter(state.pinnedPakeepsOrderNames, ({ id }) => pakeepId !== id);
    const pinnedPakeepsOrderNames = !isPinned ? newAddedPinnedPakeepOrderNames : filteredPinnedPakeepsOrderNames;

    const handlelingPakeep = { ...findedPakeep, isPinned: !isPinned };
    const pakeeps = [...filteredPakeeps, handlelingPakeep];
    return { ...state, pakeeps, pakeepsOrderNames, pinnedPakeepsOrderNames };
  },
  [types.HANDLE_CANCEL_SELECTING_STATUS]: (state, { boolValue }) => ({
    ...state,
    isCancelSelectedPakeepsId: boolValue
  }),

  [types.ADD_NEW_GLOBAL_LABEL]: (state, { newLabel }) => ({
    ...state,
    labels: [...state.labels, newLabel]
  }),
  [types.CHANGE_LABEL_ITEM]: (state, { labels }) => ({
    ...state,
    labels
  }),

  [types.HANDLE_SET_SELECTED_PAKEEPIDS_ARR]: (state, { pakepsId: selectedPakeepsId }) => ({
    ...state,
    selectedPakeepsId
  }),

  [types.HANDLE_CHANGE_LABEL_IN_PAKEEP]: (state, { currentPakeep, labels }) => ({
    ...state,
    pakeeps: [...filter(state.pakeeps, ({ id }) => currentPakeep.id !== id), { ...currentPakeep, labels }]
  }),

  [types.HANDLE_CURRENT_FOLDER_PROPERTY_IDX]: (state, { folderIdx }) => ({
    ...state,
    currentFolderPropertyIdx: folderIdx
  }),

  [types.HANDLE_PAKEEPS]: (state, { pakeeps }) => ({ ...state, pakeeps }),
  [types.SET_NEW_ORDER_NAMES]: (state, { newOrder }) => ({
    ...state,
    pakeepsOrderNames: newOrder
  }),
  [types.HANDLE_SET_PREVIUOS_ORDER_NAMES]: (state, { orderNames }) => ({
    ...state,
    pakeepsOrderNames: orderNames
  }),
  [types.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS]: (state, { orderNames: pinnedPakeepsOrderNames }) => ({
    ...state,
    pinnedPakeepsOrderNames
  }),

  [types.HANDLE_THEME_COLORS]: (state, { newThemeColors }) => {
    const theme = { ...state.theme, ...newThemeColors };
    return { ...state, theme };
  },

  [types.HANDLE_SELECTED_PAKEEPS_PROPERTY]: (state, { newPakeeps }) => {
    const newPakeepsId = newPakeeps.map(({ id }) => id);
    const filteredPakeeps = filter(state.pakeeps, ({ id }) => !includes(newPakeepsId, id));
    const pakeeps = [...filteredPakeeps, ...newPakeeps];
    return { ...state, pakeeps };
  },

  [types.HANDLE_PAKEEP_PROPERTY]: (state, { pakeepId, property }) => {
    const findedPakeep = find(state.pakeeps, ({ id }) => id === pakeepId);
    const newPakeep = { ...findedPakeep, ...property };

    const filteredPakeeps = filter(state.pakeeps, ({ id }) => pakeepId !== id);

    const pakeeps = [...filteredPakeeps, newPakeep];
    return { ...state, pakeeps };
  },

  [types.HANDLE_DRAWER_WIDTH]: (state, { drawerWidth }) => ({ ...state, drawerWidth }),
  [types.DELETE_PAKEEP]: (state, { id }) => ({
    ...state,
    pakeeps: filter(state.pakeeps, ({ id: pakeepsId }) => id !== pakeepsId)
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
