import { pickBy } from 'lodash';
import { createReducer } from 'store/utils';
import * as types from './types';

const initialState = {
  data: 1,
  labels: [
    { color: 'primary', title: 'Day plans', icon: '', key: 0 },
    { color: 'primary', title: 'Week plans', icon: '', key: 1 },
    { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
    { color: 'primary', title: 'Year plans', icon: '', key: 3 },
    { color: 'primary', title: 'Hobby Placeholders', icon: '', key: 4 }
  ],

  folders: [
    { title: 'All pakeeps', iconName: '', key: 1, property: 'ALL' },
    { title: 'Pined', iconName: 'pin', key: 2, property: 'isPinned' }
  ],
  pakeeps: [
    {
      title: 'Placeholder 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [
        { color: 'secondary', title: 'Plans', icon: '', key: 0 },
        { color: 'default', title: 'Week plans', icon: '', key: 1 },
        { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
        { color: 'primary', title: 'Year plans', icon: '', key: 3 },
        { color: 'secondary', title: 'Hobby Placeholders', icon: '', key: 4 }
      ],
      id: 'pakeep1',
      isPinned: true
    },
    {
      title: 'Placeholder 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [{ color: 'primary', title: 'Day plans', icon: '', key: 0 }],
      id: 'pakeep2',
      isPinned: false
    },
    {
      title: 'Placeholder 3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [],
      isPinned: true,
      id: 'pakeep3'
    },
    {
      title: 'Placeholder 4',
      text: 'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: [
        { color: 'default', title: 'Day plans', icon: '', key: 0 },
        { color: 'default', title: 'Week plans', icon: '', key: 1 },
        { color: 'primary', title: 'Mouth plans', icon: 'keyboard', key: 2 },
        { color: 'secondary', title: 'Year plans', icon: '', key: 3 }
      ],
      id: 'pakeep4',
      isPinned: true
    },
    {
      title: 'Placeholder 5',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'default',
      isPinned: false,
      labels: [{ color: 'default', title: 'Hobby Placeholders', icon: 'alarm', key: 4 }],
      id: 'pakeep5'
    },
    {
      title: 'Placeholder 6',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum. Ipsum consequat nisl vel pretium lectus quam id leo. Lacinia quis vel eros donec ac odio tempor orci. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ac odio tempor orci dapibus. Pellentesque habitant morbi tristique senectus et netus. Et netus et malesuada fames ac. Est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor.',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [{ color: 'secondary', title: 'Hobby', icon: 'alarm', key: 4 }],
      id: 'pakeep6',
      isPinned: true,
      events: [{ color: 'secondary', title: 'Hobby', icon: 'alarm', key: 4 }]
    }
  ],
  pakeepsOrderNames: ['pakeep1','pakeep2','pakeep3','pakeep4','pakeep5','pakeep6',],
  notifinationCounter: 8,
  isMenuOpen: false,
  scrollDirectionName: 'up'
};

const AppReducer = createReducer(initialState)({
  [types.ADD_NEW_PAKEEP]: (state, { newPaKeep }) => ({
    ...state,
    pakeeps: { ...state.pakeeps, [newPaKeep.id]: newPaKeep }
  }),
  [types.SET_NEW_ORDER_NAMES]: (state, { newOrder }) => ({
    ...state,
    pakeepsOrderNames: newOrder
  }),
  [types.DELETE_PAKEEP]: (state, { id }) => ({
    ...state,
    pakeeps: pickBy(state.pakeeps, ({ id: pakeepsId }) => id !== pakeepsId)
  }),

  [types.SCROLL_DIRECTION]: (state, { scrollDirectionName }) => ({
    ...state,
    scrollDirectionName
  }),

  [types.IS_MENU_OPEN]: (state, { boolStatus }) => ({ ...state, isMenuOpen: boolStatus }),
  [types.CHANGE_PAKEEP_COLUMNS]: (state, { breakpointName, columnValue }) => ({
    ...state,
    columns: {
      ...state.columns,
      [breakpointName]: {
        ...state.columns[breakpointName],
        [columnValue.id]: columnValue
      }
    }
  }),
  [types.CHANGE_TWO_PAKEEP_COLUMNS]: (state, { breakpointName, startColumn, finishColumn }) => ({
    ...state,
    columns: {
      ...state.columns,
      [breakpointName]: {
        ...state.columns[breakpointName],
        [startColumn.id]: startColumn,
        [finishColumn.id]: finishColumn
      }
    }
  }),
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
