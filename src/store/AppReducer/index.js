const ADD_NEW_PAKEEP = 'ADD_NEW_PAKEEP';

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
  'pakeep1' : {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: [
        { color: 'secondary', title: 'Plans', icon: '', key: 0 },
        { color: 'default', title: 'Week plans', icon: '', key: 1 },
        { color: 'primary', title: 'Mouth plans', icon: '', key: 2 },
        { color: 'primary', title: 'Year plans', icon: '', key: 3 },
        { color: 'secondary', title: 'Hobby Placeholders', icon: '', key: 4 }
      ],
      id: 'pakeep1'
    },
    'pakeep2': {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: [{ color: 'primary', title: 'Day plans', icon: '', key: 0 }],
      id: 'pakeep2'
    },
    'pakeep3': {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: [],
      id: 'pakeep3'
    },
    'pakeep4':  {
      title: 'Placeholder',
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
    'pakeep5':  {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: [{ color: 'default', title: 'Hobby Placeholders', icon: 'alarm', key: 4 }],
      id: 'pakeep5'
    }
  },
  
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Column 1',
      pakeepIds: ['pakeep1', 'pakeep2', 'pakeep3', 'pakeep4', 'pakeep5']
    }
  },  
  columnOrder:['column-1']
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PAKEEP:
      return { ...state, pakeeps: [...state.pakeeps, action.newPaKeep] };
    default:
      return state;
  }
};

const addNewPakeep = data => ({ type: ADD_NEW_PAKEEP, newPaKeep: data });

export const addNewPaKeepThunk = data => dispatch => {
  dispatch(addNewPakeep(data));
};

export default AppReducer;
