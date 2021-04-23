const ADD_NEW_PAKEEP = 'ADD_NEW_PAKEEP';

const initialState = {
  data: 1,
  pakeeps: [
    {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: false
    },
    {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: false
    },
    {
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: false
    },
    {
      title: 'Placeholder',
      text:
        'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: false
    },{
      title: 'Placeholder',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      bookmark: false,
      favorite: false,
      color: 'transparent',
      labels: false
    },
  ]
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
  console.log(dispatch);
  dispatch(addNewPakeep(data));
};

export default AppReducer;
