import { FC } from 'react';
import { makeStyles, Tooltip, Grid, IconButton } from '@material-ui/core';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import ThemeChangerButton from './components/ThemeChangerButton';
import NoticationButton from './components/NoticationButton';
import AvatarButton from './components/AvatarButton';
import LockButton from '../ViewLikeInTelegram/components/LockButton';
import UploadButton from './components/UploadButton';
import ZenModeButton from './components/ZenModeButton';
import { useSelector } from 'react-redux';
import { getHeaderProperties, getIsZenModeActive } from 'store/modules/App/selectors';
import { values } from 'lodash';

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

const HeaderProfileUtils: FC = () => {
  const classes = useStyles();
  const { isSiveIsXs } = useBreakpointNames();

  const isZenModeActive = useSelector(getIsZenModeActive);
  const { orderIds } = useSelector(getHeaderProperties);

  const headerProfileUtilsDenotationIds = {
    UPLOAD_BUTTON: 'UPLOAD_BUTTON',
    THEME_CHANGER_BUTTON: 'THEME_CHANGER_BUTTON',
    NOTICATION_BUTTON: 'NOTICATION_BUTTON',
    LOCK_BUTTON: 'LOCK_BUTTON',
    ZEN_MODE_BUTTON: 'ZEN_MODE_BUTTON',
    AVATAR_BUTTON: 'AVATAR_BUTTON'
  };

  const headerProfileUtilsOrderIds = !!orderIds.length ? orderIds : values(headerProfileUtilsDenotationIds);

  const iconButtonUtilObj = {
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
  return (
    <>
      <Grid className={classes.profileUtils}>
        {headerProfileUtilsOrderIds.map((id, idx) => {
          // if (hideInSmallSize && isSiveIsXs) return;

          const findedEl = iconButtonUtilObj[id];
          if (!findedEl) return null;
          const { component: Component, toolTipText } = findedEl;

          const ButtonContainer = isZenModeActive ? Grid : IconButtonUtilContainer;

          return (
            <Tooltip title={toolTipText} key={`HeaderProfileUtils-${id}-${idx}`}>
              <ButtonContainer>
                <IconButton>
                  <Component />
                </IconButton>
              </ButtonContainer>
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
      {children}
    </Grid>
  );
};
