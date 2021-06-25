import { CustomColorType } from './../../../models/types';
import { addDays } from 'date-fns';
import { nanoid } from 'nanoid';
import { TypeNames } from './enums';
import {
  useAddLabelToPakeep,
  useAddNewPakeep,
  useChangeGlobalLabelItem,
  useChangePakeepCustomProperty,
  useChangePakeepProperty,
  useChangeSelectedPakeepsProperty,
  useDeleteLabelFromPakeep,
  useDeletePakeep,
  usePinStatusOfPakeeps
} from './hooks';
import { AppActionTypes, AppInitialStateInteface } from './types';

const initialState: AppInitialStateInteface = {
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
    {
      title: 'Placeholder 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      isInBookmark: false,
      events: [],
      isFavorite: true,
      color: 'default',
      labels: ['label4', 'label0', 'label1', 'label2', 'label3'],
      id: 'pakeep2',
      isArchived: false,
      isPinned: false,
      isCheckBoxes: false,

      backgroundColor: 'default'
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
      events: [],
      isCheckBoxes: false,

      backgroundColor: 'default'
    },
    {
      title: 'Placeholder 4',
      text: 'ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam',
      isInBookmark: false,
      isFavorite: true,
      color: '#312b03',
      labels: ['label1', 'label2', 'label0', 'label6'],
      events: [],
      isArchived: false,
      id: 'pakeep4',
      isPinned: true,
      backgroundColor: '#969696',
      isCheckBoxes: false
    },
    {
      title: 'Placeholder 5',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isInBookmark: false,
      isFavorite: false,
      color: 'default',
      isPinned: false,
      events: [],
      isArchived: true,
      labels: ['label4', 'label0', 'label1', 'label2'],
      id: 'pakeep5',
      backgroundColor: 'default',
      isCheckBoxes: false
    },
    {
      title: 'Placeholder 6',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nec dui nunc mattis enim ut tellus elementum. Ipsum consequat nisl vel pretium lectus quam id leo. Lacinia quis vel eros donec ac odio tempor orci. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Ac odio tempor orci dapibus. Pellentesque habitant morbi tristique senectus et netus. Et netus et malesuada fames ac. Est velit egestas dui id ornare. Mi quis hendrerit dolor magna eget est lorem ipsum dolor.',
      isInBookmark: false,
      isFavorite: false,
      color: 'default',
      labels: ['label0', 'label2', 'label6'],
      id: 'pakeep6',
      events: [],
      isPinned: true,
      isCheckBoxes: false,
      isArchived: true,
      backgroundColor: 'default'
    },
    {
      title: 'Placeholder 7',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At imperdiet dui accumsan sit amet nulla facilisi morbi. Aliquam sem et tortor consequat id porta nibh. Enim praesent elementum facilisis leo vel fringilla est. Cras adipiscing enim eu turpis egestas pretium aenean. Sed libero enim sed faucibus turpis in eu mi bibendum. Vestibulum lorem sed risus ultricies. Neque egestas congue quisque egestas diam.',
      isInBookmark: false,
      events: [],
      isArchived: false,
      isPinned: true,
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
      isPinned: true,
      id: 'pakeep8'
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }, {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    },
    {
      title: nanoid(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Duis convallis convallis tellus id interdum. Eu augue ut lectus arcu bibendum at varius.      ',
      isInBookmark: false,
      isFavorite: false,
      isCheckBoxes: false,
      isArchived: false,
      backgroundColor: '#d37a18',
      events: [],
      color: 'default',
      labels: ['label1'],
      isPinned: true,
      id: nanoid()
    }
  ],
  pakeepsOrderNames: [],
  pinnedPakeepsOrderNames: [],
  notifinationCounter: 8,
  isMenuOpen: false,
  currentFolderPropertyIdx: 0,
  drawerWidth: 0,
  isCancelSelectedPakeepsId: false,
  temporaryData: {
    defaultMenuProps: {
      mouseY: 0,
      mouseX: 0,
      customColor: {} as CustomColorType
    },

    pakeep: {
      id: '',
      isHovering: false
    },

    labelItem: {
      id: ''
    }
  }
};

// console.log(TypeNames)
export const AppReducer = (state = initialState, action: AppActionTypes): AppInitialStateInteface => {
  // if (!('type' in action) ) return state;
  switch (action.type) {
    case TypeNames.HANDLE_ADD_NEW_PAKEEP: {
      const { pakeeps, pakeepsOrderNames, pinnedPakeepsOrderNames } = state;
      const variedState = useAddNewPakeep({ pakeeps, pakeepsOrderNames, pinnedPakeepsOrderNames, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_ADD_EVENT_TO_PAKEEP: {
      const { pakeeps } = state;
      const { newEvent: propertyValue, pakeepId } = action.payload;
      const properyName = 'events';

      const variedState = useChangePakeepProperty({ pakeepId, properyName, propertyValue, pakeeps });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_DELETE_PAKEEP: {
      const { pakeeps } = state;
      const variedState = useDeletePakeep({ pakeeps, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_DELETE_LABEL_FROM_PAKEEP: {
      const { pakeeps } = state;
      const variedState = useDeleteLabelFromPakeep({ pakeeps, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP: {
      const { pakeeps } = state;
      const variedState = useAddLabelToPakeep({ pakeeps, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS: {
      const { pinnedPakeepsOrderNames, pakeeps, pakeepsOrderNames } = state;
      const variedState = usePinStatusOfPakeeps({
        pinnedPakeepsOrderNames,
        pakeeps,
        pakeepsOrderNames,
        ...action.payload
      });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_CHANGE_SELECTED_PAKEEPS_PROPERTY: {
      const { pakeeps } = state;
      const variedState = useChangeSelectedPakeepsProperty({ pakeeps, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_ITEM: {
      const { labels: globalLabels } = state;
      const variedState = useChangeGlobalLabelItem({ globalLabels, ...action.payload });

      return { ...state, ...variedState };
    }
    case TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY: {
      const { pakeeps } = state;
      const variedState = useChangePakeepProperty({ pakeeps, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY: {
      const { pakeeps } = state;
      const variedState = useChangePakeepCustomProperty({ pakeeps, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_ADD_NEW_GLOBAL_LABEL: {
      const { newLabel } = action.payload;
      const labels = [...state.labels, newLabel];

      return { ...state, labels };
    }

    case TypeNames.HANDLE_CHANGE_TEMPORARY_DATA: {
      const { newTemporaryData } = action.payload;
      const temporaryData = { ...state.temporaryData, ...newTemporaryData };

      return { ...state, temporaryData };
    }

    case TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS:
    case TypeNames.HANDLE_SET_ORDER_NAMES:
    case TypeNames.HANDLE_SET_NEW_ORDER_NAMES:
    case TypeNames.HANDLE_CHANGE_PAKEEPS:
    case TypeNames.HANDLE_SET_SELECTED_PAKEEPIDS_ARR:
    case TypeNames.HANDLE_CANCEL_SELECTING_STATUS:
    case TypeNames.HANDLE_CHANGE_GLOBAL_LABELS:
    case TypeNames.HANDLE_CHANGE_FOLDERS:
    case TypeNames.HANDLE_SET_DRAWER_WIDTH:
    case TypeNames.HANDLE_SET_CURRENT_FOLDER_PROPERTY_IDX:
    case TypeNames.HANDLE_CHANGE_MENU_OPEN_STATUS: {
      return { ...state, ...action.payload };
    }

    // [types.SET_NEW_ORDER_NAMES]: (state, { newOrder }) => ({
    //   ...state,
    //   pakeepsOrderNames: newOrder
    // }),
    // [types.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS]: (state, { pinnedPakeepsOrderNames }) => ({
    //   pinnedPakeepsOrderNames
    // }),

    default:
      //@ts-ignore
      const x: never = action;
  }
  return state;
};
