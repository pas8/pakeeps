import { CustomColorType } from './../../../models/types';
import { addDays, addHours } from 'date-fns';
import { nanoid } from 'nanoid';
import { TypeNames } from './enums';
import {
  useAddLabelToPakeep,
  useAddNewPakeep,
  useChangeGlobalEventItem,
  useChangeGlobalLabelItem,
  useChangePakeepCustomProperty,
  useChangePakeepProperty,
  useChangeSelectedPakeepsProperty,
  useDeleteLabelFromPakeep,
  useDeletePakeep,
  useFindPakeep,
  usePinStatusOfPakeeps
} from './hooks';
import { AppActionTypes, AppInitialStateInteface, GlobalLabelsType } from './types';
import { random, sampleSize, words, filter } from 'lodash';
//@ts-ignore
import randomSentence from 'random-sentence';
import { colord } from 'colord';
import { DEFAULT, NONE, OUTLINED, PRIMARY, SECONDARY, TRANSPARENT } from 'models/denotation';
import { DialogLayoutName, MenusLayoutName } from 'models/unums';

// pakeeps: [
//   {
//     title: 'Placeholder 1',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     isInBookmark: true,
//     isFavorite: true,
//     color: 'default',
//     labels: ['label3', 'label1', 'label0', 'label2'],
//     isArchived: false,
//     events: [
//       { id: '1', value: addHours(new Date(), 2) },
//       { id: '2', value: addHours(new Date(), 32) },
//       { id: '3', value: addHours(new Date(), 100) }
//     ],
//     checkBoxes: Array(random(4, 10))
//       .fill('')
//       .map(() => ({ value: randomSentence(), isAccomplished: !!random(1), id: nanoid(), color: 'default' })),
//     id: 'pakeep1',
//     isPinned: true,
//     isCheckBoxes: true,
//     backgroundColor: 'default'
//   },
//   ...randomPakeeps
// ],
// const randomPakeeps = Array(8)
//   .fill('pakeepID')
//   .map((el, idx) => {
//     const randomColor = colord({ r: random(256), g: random(256), b: random(256) }).toHex();
//     const anotherRandomcolor = colord({ r: random(256), g: random(256), b: random(256) }).toHex();

//     const color = colord(randomColor).isDark() && colord(anotherRandomcolor).isLight() ? anotherRandomcolor : DEFAULT;
//     const backgroundColor = color === DEFAULT ? randomColor : !!random(1) ? randomColor : DEFAULT;

//     const id = `${el}-${idx}`;

//     const text = `${Array(random(2, 8))
//       .fill('')
//       .map(() => randomSentence())
//       .toString()}-${id}`;

//     const isCheckBoxes = !!random(1);
//     const checkBoxes = Array(random(2, 4))
//       .fill('')
//       .map(() => ({ value: randomSentence(), isAccomplished: !!random(1), id: nanoid(), color: 'default' }));

//     const events = [
//       { id: '1', value: addHours(new Date(), 2) },
//       { id: '2', value: addHours(new Date(), 32) },
//       { id: '3', value: addHours(new Date(), 100) }
//     ];

//     return {
//       title: randomSentence({ words: random(4, 8) }),
//       text,
//       isInBookmark: !!random(1),
//       isFavorite: !!random(1),
//       labels: sampleSize(
//         labelsOfInitialState.map(({ id }) => id),
//         random(labelsOfInitialState.length)
//       ),
//       isArchived: !!random(1),
//       events,
//       id,
//       checkBoxes: isCheckBoxes ? checkBoxes : [],
//       isPinned: !!random(1),
//       backgroundColor,
//       color,
//       isCheckBoxes
//     };
//   });

// const labelsOfInitialState: GlobalLabelsType = [
//   { color: '', title: 'Day plans', iconName: 'category', id: 'label0', variant: 'outlined' },
//   { color: '#dd6b2a', title: 'Week plans', iconName: 'star', id: 'label1', variant: 'outlined' },
//   { color: 'primary', title: 'Mouth plans', iconName: 'keyboard', id: 'label2', variant: 'outlined' },
//   { color: 'secondary', title: 'Year plans', iconName: '', id: 'label3', variant: 'outlined' },
//   { color: '#6e9f47', title: 'Your plans', iconName: 'star', id: 'label6', variant: 'default' },
//   { color: '', title: 'Hobby Placeholders', iconName: 'bookmark', id: 'label4', variant: 'default' },
//   { color: '#afa646', title: 'Eco', iconName: 'eco', id: 'label8', variant: 'default' }
// ];

export const defaultAvatarProperties = {
  url: NONE,
  borderRadius: 2,
  backgroundColor: TRANSPARENT
};

export const nullityDefaultMenuProps = {
  mouseY: 0,
  menuName: MenusLayoutName.NONE,
  mouseX: 0,
  id: NONE,
  customColor: {} as CustomColorType
};

export const nullityDefaultDialogProps = {
  dialogName: DialogLayoutName.NONE,
  id: NONE,
  customColor: {} as CustomColorType
};

// export const defaultEvents = [
//   {
//     title: 'Later today',
//     iconName: 'today',
//     id: '1',
//     value: Date.now(),
//     onlyTime: true,
//     color: PRIMARY,
//     variant: DEFAULT
//   },
//   {
//     title: 'Tomorrow',
//     iconName: 'tomorrow',
//     id: '2',
//     value: addDays(Date.now(), 1),
//     onlyTime: true,
//     color: SECONDARY,
//     variant: OUTLINED
//   },
//   { title: 'Next week', iconName: 'week', id: '3', value: addDays(Date.now(), 7), color: DEFAULT, variant: OUTLINED },
//   {
//     title: 'Next Mouth',
//     iconName: 'alarm',
//     id: '4',
//     value: addDays(Date.now(), 30),
//     onlyTime: false,
//     color: '#fbbc49',
//     variant: DEFAULT
//   }
// ];

export const firebaseAppInitialState = {
  avatarProperties: defaultAvatarProperties,
  labels: [],
  userData: {
    email: NONE,
    userName: NONE,
    localPassword: NONE as typeof NONE,
    name: NONE,
    isEmailVerified: false
  },
  events: [],
  selectedPakeepsId: [],
  pakeeps: [],
  pakeepsOrderNames: []
};

const defaultFolderArr = [
  { title: 'All pakeeps', iconName: '', id: 'folder-ALL', property: 'ALL', color: 'default' },
  { title: 'Pined', iconName: 'pin', id: 'folder-isPinned', property: 'isPinned', color: 'default' },
  { title: 'Bookmark', iconName: 'bookmark', id: 'folder-isInBookmark', property: 'isInBookmark', color: 'default' },
  { title: 'Favorite', iconName: 'favorite', id: 'folder-isFavorite', property: 'isFavorite', color: 'default' },
  {
    title: 'With checkBoxes',
    iconName: 'checkBox',
    id: 'folder-isCheckBoxes',
    property: 'isCheckBoxes',
    color: 'default'
  },
  { title: 'Archiveted', iconName: 'archive', id: 'folder-isArchived', property: 'isArchived', color: 'default' }
];

const nullityOfTemporaryData = {
  defaultMenuProps: nullityDefaultMenuProps,
  defaultDialogProps: nullityDefaultDialogProps,

  pakeep: {
    id: '',
    isHovering: false
  },
  isAuthedWithLocalPassword: true,
  globalEventList: [],
  globalLabelList: []
};

export const initialState: AppInitialStateInteface = {
  ...firebaseAppInitialState,
  folders: [],
  defaultFolderArr,
  temporaryData: nullityOfTemporaryData,
  pinnedPakeepsOrderNames: [],
  notifinationCounter: 8,
  headerHeight: 0,
  menuOpenStatus: 'OPEN',
  currentFolderPropertyIdx: 0,
  drawerWidth: 0,
  isCancelSelectedPakeepsId: false
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
    case TypeNames.HANDLE_ADD_GLOBAL_EVENT: {
      const { newEvent } = action.payload;
      return { ...state, events: [...state.events, newEvent] };
    }

    case TypeNames.HANDLE_ADD_LABEL_TO_PAKEEP: {
      const { pakeeps } = state;
      const variedState = useAddLabelToPakeep({ pakeeps, ...action.payload });
      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_PIN_STATUS_OF_PAKEEPS: {
      // const { pinnedPakeepsOrderNames, pakeeps, pakeepsOrderNames } = state;
      // const variedState = usePinStatusOfPakeeps({
      //   pinnedPakeepsOrderNames,
      //   pakeeps,
      //   pakeepsOrderNames,
      //   ...action.payload
      // });

      const { pakeeps } = state;
      const pakeepId = action.payload.pakeepId;
      const findedPakeep = useFindPakeep(pakeeps, pakeepId);
      const variedState = useChangePakeepProperty({
        pakeepId,
        pakeeps,
        property: { isPinned: !findedPakeep?.isPinned! }
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

    case TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_ITEM: {
      const { events: globalEvents } = state;
      const variedState = useChangeGlobalEventItem({ globalEvents, ...action.payload });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_CHANGE_PAKEEP_PROPERTY: {
      const { pakeeps } = state;
      const variedState = useChangePakeepProperty({ pakeeps, ...action.payload });

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
    case TypeNames.HANDLE_CHANGE_PAKEEP_CUSTOM_PROPERTY: {
      const { pakeeps } = state;
      const { pakeepId, propertyName } = action.payload;
      const variedState = useChangePakeepCustomProperty({ pakeeps, pakeepId, propertyName });

      return { ...state, ...variedState };
    }

    case TypeNames.HANDLE_CHANGE_GLOBAL_LABEL_LIST_TEMPROPARY_DATA: {
      const { globalLabelList } = action.payload;
      return { ...state, temporaryData: { ...state.temporaryData, globalLabelList } };
    }

    case TypeNames.HANDLE_CHANGE_GLOBAL_EVENT_LIST_TEMPROPARY_DATA: {
      const { globalEventList } = action.payload;
      return { ...state, temporaryData: { ...state.temporaryData, globalEventList } };
    }

    case TypeNames.HANDLE_EDIT_PAKEEP: {
      const { editedPakeep } = action.payload;
      const pakeeps = [editedPakeep, ...filter(state.pakeeps, ({ id }) => id !== editedPakeep.id)];

      return { ...state, pakeeps };
    }

    case TypeNames.HANDLE_DELETE_GLOBAL_LABEL: {
      const { labelId } = action.payload;
      const labels = filter(state.labels, ({ id }) => id !== labelId);
      return { ...state, labels };
    }

    case TypeNames.HANDLE_DELETE_GLOBAL_EVENT: {
      const { eventId } = action.payload;
      const events = filter(state.events, ({ id }) => id !== eventId);
      return { ...state, events };
    }

    case TypeNames.HANDLE_SET_ORDER_NAMES_OF_PINNED_PAKEEPS:
    case TypeNames.HANDLE_SET_ORDER_NAMES:
    case TypeNames.HANDLE_CHANGE_AVATAR_PROPERTIES:
    case TypeNames.HANDLE_CHANGE_HEADER_HEIGTH:
    case TypeNames.HANDLE_SET_NEW_ORDER_NAMES:

    case TypeNames.HANDLE_CHANGE_PAKEEPS:
    case TypeNames.HANDLE_CHANGE_USER_DATA:
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
