import { FC } from 'react';
import { makeStyles, Tooltip, Grid, IconButton } from '@material-ui/core';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import ThemeChangerButton from './components/ThemeChangerButton';
import NoticationButton from './components/NoticationButton';
import AvatarButton from './components/AvatarButton';
import LockButton from '../ViewLikeInTelegram/components/LockButton';
import UploadButton from './components/UploadButton';
import { useSelector } from 'react-redux';
import { getHeaderProperties, getIsZenModeActive } from 'store/modules/App/selectors';
import { values } from 'lodash';
import { headerProfileUtilsDenotationIds } from 'models/denotation';
import ZenModeButton from './components/ZenModeButton';

const useStyles = makeStyles(({ spacing }) => ({
  profileUtils: {
    display: 'flex',
    '& button:not(:last-child)': {
      height: spacing(6)
    }
  },
  headerIconButtonContainer: {
    width: 42,
    height: 42,
    marginLeft: 4
  }
}));

export const headerProfileUtilsObj = {
  [headerProfileUtilsDenotationIds.UPLOAD_BUTTON]: {
    component: UploadButton,
    toolTipText: 'Upload your pakeeps data'
  },
  [headerProfileUtilsDenotationIds.THEME_CHANGER_BUTTON]: {
    component: ThemeChangerButton,
    toolTipText: 'Change theme'
  },
  [headerProfileUtilsDenotationIds.NOTICATION_BUTTON]: {
    component: NoticationButton,
    toolTipText: 'Number of notifications'
  },
  [headerProfileUtilsDenotationIds.LOCK_BUTTON]: {
    component: LockButton,
    toolTipText: 'Lock your accont'
  },
  [headerProfileUtilsDenotationIds.ZEN_MODE_BUTTON]: {
    component: ZenModeButton,
    toolTipText: 'Switch to zen mode'
  },
  [headerProfileUtilsDenotationIds.AVATAR_BUTTON]: {
    component: AvatarButton,
    toolTipText: 'Open your profile'
  }
};

const HeaderProfileUtils: FC = () => {
  const classes = useStyles();
  const { isSiveIsXs } = useBreakpointNames();

  const { orderIds } = useSelector(getHeaderProperties);

  return (
    <>
      <Grid className={classes.profileUtils}>
        {orderIds.map((id, idx) => {
          // if (hideInSmallSize && isSiveIsXs) return;

          const findedEl = headerProfileUtilsObj[id];
          if (!findedEl) return null;
          const { component: Component, toolTipText } = findedEl;

          return (
            <Tooltip title={toolTipText} key={`HeaderProfileUtils-${id}-${idx}`}>
              <IconButtonUtilContainer>
                <Component />
              </IconButtonUtilContainer>
            </Tooltip>
          );
        })}
      </Grid>
    </>
  );
};

export default HeaderProfileUtils;

const IconButtonUtilContainer: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.headerIconButtonContainer} container justify={'center'} alignItems={'center'}>
      <IconButton>{children}</IconButton>
    </Grid>
  );
};
