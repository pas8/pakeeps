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
import { AppActionTypes, AppInitialStateInteface, GlobalLabelsType } from './types';
import { random, sampleSize, words } from 'lodash';
//@ts-ignore
import randomSentence from 'random-sentence';
import { colord } from 'colord';
import { NONE,TRANSPARENT } from 'models/denotation';

const labelsOfInitialState: GlobalLabelsType = [
  { color: '', title: 'Day plans', iconName: 'category', id: 'label0', variant: 'outlined' },
  { color: '#dd6b2a', title: 'Week plans', iconName: 'star', id: 'label1', variant: 'outlined' },
  { color: 'primary', title: 'Mouth plans', iconName: 'keyboard', id: 'label2', variant: 'outlined' },
  { color: 'secondary', title: 'Year plans', iconName: '', id: 'label3', variant: 'outlined' },
  { color: '#6e9f47', title: 'Your plans', iconName: 'star', id: 'label6', variant: 'default' },
  { color: '', title: 'Hobby Placeholders', iconName: 'bookmark', id: 'label4', variant: 'default' },
  { color: '#afa646', title: 'Eco', iconName: 'eco', id: 'label8', variant: 'default' }
];

const randomPakeeps = Array(8)
  .fill('pakeepID')
  .map((el, idx) => {
    const DEFAULT = 'default';

    const randomColor = colord({ r: random(256), g: random(256), b: random(256) }).toHex();
    const anotherRandomcolor = colord({ r: random(256), g: random(256), b: random(256) }).toHex();

    const color = colord(randomColor).isDark() && colord(anotherRandomcolor).isLight() ? anotherRandomcolor : DEFAULT;
    const backgroundColor = color === DEFAULT ? randomColor : !!random(1) ? randomColor : DEFAULT;

    const id = `${el}-${idx}`;

    const text = `${Array(random(2, 8))
      .fill('')
      .map(() => randomSentence())
      .toString()}-${id}`;

    return {
      title: randomSentence({ words: random(4, 8) }),
      text,
      isInBookmark: !!random(1),
      isFavorite: !!random(1),
      labels: sampleSize(
        labelsOfInitialState.map(({ id }) => id),
        random(labelsOfInitialState.length)
      ),
      isArchived: !!random(1),
      events: [],
      id,
      isPinned: !!random(1),
      backgroundColor,
      color,
      isCheckBoxes: !!random(1)
    };
  });

export const defaultAvatarProperties = {
  url: NONE,
  borderRadius: 4,
  backgroundColor: TRANSPARENT
};

const initialState: AppInitialStateInteface = {
  defaultFolderArr: [
    { title: 'All pakeeps', iconName: '', id: 'folder-ALL', property: 'ALL', color: 'default' },
    { title: 'Pined', iconName: 'pin', id: 'folder-isPinned', property: 'isPinned', color: 'default' },
    { title: 'Bookmark', iconName: 'bookmark', id: 'folder-isInBookmark', property: 'isInBookmark', color: 'default' },
    { title: 'Favorite', iconName: 'favorite', id: 'folder-isFavorite', property: 'isFavorite', color: 'default' },
    {
      title: 'With chckebox',
      iconName: 'checkbox',
      id: 'folder-isCheckBoxes',
      property: 'isCheckBoxes',
      color: 'default'
    },
    { title: 'Archiveted', iconName: 'archive', id: 'folder-isArchived', property: 'isArchived', color: 'default' }
  ],

  labels: labelsOfInitialState,
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
    ...randomPakeeps
  ],
  pakeepsOrderNames: [],
  pinnedPakeepsOrderNames: [],
  notifinationCounter: 8,
  // menuOpenStatus: 'HIDDEN',
  avatarProperties: defaultAvatarProperties,
  menuOpenStatus: 'EXTENDED',
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
    case TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES:

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
