const ADD_NEW_PAKEEP = 'ADD_NEW_PAKEEP';
const CHANGE_PAKEEP_COLUMNS = 'CHANGE_PAKEEP_COLUMNS';

const initialState = {
  data: 1,
  labels: [
    { color: 'primary', title: 'Day plans', icon: '', key: 0 },
    { color: 'primary', title: 'Week plans', icon: '', key: 1 },
    { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
    { color: 'primary', title: 'Year plans', icon: '', key: 3 },
    { color: 'primary', title: 'Hobby Placeholders', icon: '', key: 4 }
  ],
  pakeeps: {
    pakeep1: {
      title: 'Placeholder 1',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
      id: 'pakeep1'
    },
    pakeep2: {
      title: 'Placeholder 2',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [{ color: 'primary', title: 'Day plans', icon: '', key: 0 }],
      id: 'pakeep2'
    },
    pakeep3: {
      title: 'Placeholder 3',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [],
      id: 'pakeep3'
    },
    pakeep4: {
      title: 'Placeholder 4',
      text:
        'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: [
        { color: 'default', title: 'Day plans', icon: '', key: 0 },
        { color: 'default', title: 'Week plans', icon: '', key: 1 },
        { color: 'primary', title: 'Mouth plans', icon: 'keyboard', key: 2 },
        { color: 'secondary', title: 'Year plans', icon: '', key: 3 }
      ],
      id: 'pakeep4'
    },
    pakeep5: {
      title: 'Placeholder 5',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [{ color: 'default', title: 'Hobby Placeholders', icon: 'alarm', key: 4 }],
      id: 'pakeep5'
    },
    pakeep6: {
      title: 'Placeholder 6',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum. Ipsum consequat nisl vel pretium lectus quam id leo. Lacinia quis vel eros donec ac odio tempor orci. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ac odio tempor orci dapibus. Pellentesque habitant morbi tristique senectus et netus. Et netus et malesuada fames ac. Est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor.',
      bookmark: false,
      favorite: false,
      color: 'default',
      labels: [{ color: 'secondary', title: 'Hobby', icon: 'alarm', key: 4 }],
      id: 'pakeep5'
    }
  },

  columns: {
    xl: {
      'column-1': {
        id: 'column-1',
        title: 'Column 1',
        pakeepIds: ['pakeep1']
      },
      'column-2': {
        id: 'column-2',
        title: 'Column 2',
        pakeepIds: ['pakeep2']
      },
      'column-3': {
        id: 'column-3',
        title: 'Column 3',
        pakeepIds: ['pakeep3']
      },
      'column-4': {
        id: 'column-4',
        title: 'Column 4',
        pakeepIds: ['pakeep4']
      },
      'column-5': {
        id: 'column-5',
        title: 'Column 5',
        pakeepIds: ['pakeep5']
      },
      'column-6': {
        id: 'column-6',
        title: 'Column 6',
        pakeepIds: ['pakeep6']
      }
    },
    lg: {
      'column-1': {
        id: 'column-1',
        title: 'Column 1',
        pakeepIds: ['pakeep1', 'pakeep5']
      },
      'column-2': {
        id: 'column-2',
        title: 'Column 2',
        pakeepIds: ['pakeep2', 'pakeep6']
      },
      'column-3': {
        id: 'column-3',
        title: 'Column 3',
        pakeepIds: ['pakeep3']
      },
      'column-4': {
        id: 'column-4',
        title: 'Column 4',
        pakeepIds: ['pakeep4']
      }
    },
    md: {
      'column-1': {
        id: 'column-1',
        title: 'Column 1',
        pakeepIds: ['pakeep1', 'pakeep4']
      },
      'column-2': {
        id: 'column-2',
        title: 'Column 2',
        pakeepIds: ['pakeep2', 'pakeep5']
      },
      'column-3': {
        id: 'column-3',
        title: 'Column 3',
        pakeepIds: ['pakeep3', 'pakeep6']
      }
    },
    sm: {
      'column-1': {
        id: 'column-1',
        title: 'Column 1',
        pakeepIds: ['pakeep1', 'pakeep3', 'pakeep5']
      },
      'column-2': {
        id: 'column-2',
        title: 'Column 2',
        pakeepIds: ['pakeep2', 'pakeep4', 'pakeep6']
      }
    },
    xs: {
      'column-1': {
        id: 'xs-column-1',
        title: 'Column 1',
        pakeepIds: ['pakeep1', 'pakeep2', 'pakeep3', 'pakeep4', 'pakeep5', 'pakeep6']
      }
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6']
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PAKEEP:
      return { ...state, pakeeps: { ...state.pakeeps, [action.newPaKeep.id]: action.newPaKeep } };

    case CHANGE_PAKEEP_COLUMNS:
      return { ...state, columns: { ...state.columns, [action.columns.id]: action.columns } };

    default:
      return state;
  }
};

const addNewPakeep = data => ({ type: ADD_NEW_PAKEEP, newPaKeep: data });
const changeColumns = columns => ({ type: CHANGE_PAKEEP_COLUMNS, columns });

export const addNewPaKeepThunk = data => dispatch => {
  dispatch(addNewPakeep(data));
};

export const changePakeepColumnsDataThunk = data => dispatch => {
  dispatch(changeColumns(data));
};

export default AppReducer;
