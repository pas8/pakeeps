import AlarmOutlinedIcon from '@material-ui/icons/AlarmOutlined';
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import KeyboardVoiceOutlinedIcon from '@material-ui/icons/KeyboardVoiceOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import DetailsOutlinedIcon from '@material-ui/icons/DetailsOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import LandscapeOutlinedIcon from '@material-ui/icons/LandscapeOutlined';
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined';
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import PinOutlinedIcon from './components/PinOutlinedIcon';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import InfinityIcon from './components/Infinity';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PinIcon from './components/PinIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CategoryIcon from '@material-ui/icons/Category';
import StarIcon from '@material-ui/icons/Star';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import EcoIcon from '@material-ui/icons/Eco';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import TodayIcon from '@material-ui/icons/Today';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import CalendarViewDayOutlinedIcon from '@material-ui/icons/CalendarViewDayOutlined';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import ViewWeekOutlinedIcon from '@material-ui/icons/ViewWeekOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { $Values } from 'utility-types';
import ViewColumnOutlinedIcon from '@material-ui/icons/ViewColumnOutlined';
import { SvgIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

export const iconsArr = [
  { icon: <TodayOutlinedIcon />, iconName: 'tomorrow', id: 'random1', checkedIcon: <TodayIcon /> },
  { icon: <ExitToAppOutlinedIcon />, iconName: 'signout', id: 'signout' },
  { icon: <CalendarTodayOutlinedIcon />, iconName: 'today', id: 'random2', checkedIcon: <CalendarTodayIcon /> },
  { icon: <ViewWeekOutlinedIcon />, iconName: 'week', id: 'random3', checkedIcon: <ViewWeekIcon /> },
  { icon: <ViewColumnOutlinedIcon />, iconName: 'view', id: 'view' },
  { icon: <ArrowBackOutlinedIcon />, iconName: 'arrowBack', id: 'arrowBack' },
  { icon: <CloseIcon />, iconName: 'close', id: 'close' },
  { icon: <LockOutlinedIcon />, iconName: 'security', id: 'security' },
  { icon: <DashboardOutlinedIcon />, iconName: 'dashboard', id: 'random4', checkedIcon: <DashboardIcon /> },
  { icon: <DateRangeOutlinedIcon />, iconName: 'dateRange', id: 'random10', checkedIcon: <DateRangeIcon /> },
  { icon: <AlarmOutlinedIcon />, iconName: 'alarm', id: '1' },
  { icon: <DeleteOutlinedIcon />, iconName: 'delete', id: 'delete' },
  { icon: <EditOutlinedIcon />, iconName: 'edit', id: 'edit' },
  { icon: <AccountCircleOutlinedIcon />, iconName: 'account', id: '12dfqd1' },
  { icon: <ColorLensOutlinedIcon />, iconName: 'color', id: 'color' },
  { icon: <FingerprintOutlinedIcon />, iconName: 'fingerprint', id: '2' },
  { icon: <CheckBoxOutlinedIcon />, iconName: 'checkBox', id: 'checkBox' },
  
  { icon: <DoneOutlineOutlinedIcon />, iconName: 'done', id: '4' },
  { icon: <GitHubIcon />, iconName: 'GitHub', id: 'GitHub' },
  { icon: <FacebookIcon />, iconName: 'Facebook', id: 'Facebook' },
  {
    icon: (
      <SvgIcon viewBox={'0 0 24 24'}>
        <path
          d={
            'M13 2V3H12V9H11V10H9V11H8V12H7V13H5V12H4V11H3V9H2V15H3V16H4V17H5V18H6V22H8V21H7V20H8V19H9V18H10V19H11V22H13V21H12V17H13V16H14V15H15V12H16V13H17V11H15V9H20V8H17V7H22V3H21V2M14 3H15V4H14Z'
          }
        />
      </SvgIcon>
    ),
    iconName: 'Google',
    id: 'Google'
  },
  {
    icon: (
      <SvgIcon viewBox={'0 0 24 24'}>
        <path d="M21.94 13.11L20.89 9.89C20.89 9.86 20.88 9.83 20.87 9.8L18.76 3.32C18.65 3 18.33 2.75 17.96 2.75C17.6 2.75 17.28 3 17.17 3.33L15.17 9.5H8.84L6.83 3.33C6.72 3 6.4 2.75 6.04 2.75H6.04C5.67 2.75 5.35 3 5.24 3.33L3.13 9.82C3.13 9.82 3.13 9.83 3.13 9.83L2.06 13.11C1.9 13.61 2.07 14.15 2.5 14.45L11.72 21.16C11.89 21.28 12.11 21.28 12.28 21.15L21.5 14.45C21.93 14.15 22.1 13.61 21.94 13.11M8.15 10.45L10.72 18.36L4.55 10.45M13.28 18.37L15.75 10.78L15.85 10.45H19.46L13.87 17.61M17.97 3.94L19.78 9.5H16.16M14.86 10.45L13.07 15.96L12 19.24L9.14 10.45M6.03 3.94L7.84 9.5H4.23M3.05 13.69C2.96 13.62 2.92 13.5 2.96 13.4L3.75 10.97L9.57 18.42M20.95 13.69L14.44 18.42L14.46 18.39L20.25 10.97L21.04 13.4C21.08 13.5 21.04 13.62 20.95 13.69" />
      </SvgIcon>
    ),
    iconName: 'GitLab',
    id: 'GitLab'
  },

  { icon: <KeyboardVoiceOutlinedIcon />, iconName: 'keyboard', id: '5', checkedIcon: <KeyboardVoiceIcon /> },
  { icon: <BookOutlinedIcon />, iconName: 'book', id: '6' },
  { icon: <LocalPostOfficeOutlinedIcon />, iconName: 'mail', id: '7' },
  { icon: <StarBorderOutlinedIcon />, iconName: 'star', id: '8', checkedIcon: <StarIcon /> },
  { icon: <CategoryOutlinedIcon />, iconName: 'category', id: '9', checkedIcon: <CategoryIcon /> },
  { icon: <WidgetsOutlinedIcon />, iconName: 'widget', id: '10' },
  { icon: <AlternateEmailOutlinedIcon />, iconName: 'email', id: '11' },
  { icon: <DetailsOutlinedIcon />, iconName: 'details', id: '12' },
  { icon: <EcoOutlinedIcon />, iconName: 'eco', id: '13', checkedIcon: <EcoIcon /> },
  { icon: <HttpsOutlinedIcon />, iconName: 'lock', id: '14' },
  { icon: <LanguageOutlinedIcon />, iconName: 'world', id: '15' },
  { icon: <LandscapeOutlinedIcon />, iconName: 'mountains', id: '16' },
  { icon: <PinOutlinedIcon />, iconName: 'pin', id: '96', checkedIcon: <PinIcon /> },
  { icon: <InfinityIcon />, iconName: 'infinity', id: '92' },
  { icon: <SettingsOutlinedIcon />, iconName: 'settings', id: '80' },
  { icon: <LabelOutlinedIcon />, iconName: 'label', id: '100' },
  { icon: <VisibilityOutlinedIcon />, iconName: 'visibility', id: '104' },
  {
    icon: (
      <SvgIcon viewBox={'0 0 24 24'}>
        <path d={'M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M6,4V8H18V4H6Z'} />
      </SvgIcon>
    ),
    iconName: 'header',
    id: 'header'
  },
  { icon: <MoreVertOutlinedIcon />, iconName: 'more', id: '104' },
  { icon: <BookmarkBorderOutlinedIcon />, iconName: 'bookmark', id: '964', checkedIcon: <BookmarkIcon /> },
  { icon: <FolderOutlinedIcon />, iconName: 'folder', id: 'folder' },
  { icon: <FavoriteBorderOutlinedIcon />, iconName: 'favorite', id: '968', checkedIcon: <FavoriteIcon /> },
  { icon: <ArchiveOutlinedIcon />, iconName: 'archive', id: '928' }
] as const;
