import { CustomColorType } from 'models/interfaces';

export interface ReduxState {
  settings: { utilsViewLikeInGoogleKeep: boolean; timeFormat: string; timeAndDateFromat: string };
  app: { labels: any[]; events: any[] };
}

export interface PakeepElementProps {
  title: string;
  text: string;
  color: string;
  backgroundColor: string;
  labels: any[];
  isDragging: boolean;
  id: string;
  utilsViewLikeInGoogleKeep: boolean;
  idx: number | string;
  globalEvents: any[];
  // events,
  globalLabels: any[];
  filteredLabels: any[];
  timeFormat: string;
  timeAndDateFromat: string;
  handleDeleteLabelFromPakeepThunk: any; //func
  changeLabelItemThunk: any; //func
  handkePakeepPropertyThunk: any; //func
  isPinIconShouldBeShownInPakeep: boolean;
  handlePinStatusPakeepThunk: any; //func,
  isSelecting: boolean;
  handlePakeepPropertyThunk: any; //func
  handleAddLabelToPakeepThunk: any; //func
}

export interface NullityStatusState {
  isHovered: boolean;
  isLoaded: boolean;
}

export interface UseStylesProps {
  customColor?: CustomColorType;
  backgroundColor?: string;
  color?: string;
  utilsViewLikeInGoogleKeep?: boolean;
}
export interface IconsUtilsProps {
  isAllIconsIsShown: boolean;
  changingTitle: false;
  labels: any;
  id: string;
  customColor: any;
}
