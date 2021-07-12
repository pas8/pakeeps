import { FC } from 'react';
import { makeStyles, Tooltip, Grid, IconButton } from '@material-ui/core';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import ThemeChangerButton from './components/ThemeChangerButton';
import NoticationButton from './components/NoticationButton';
import AvatarButton from './components/AvatarButton';
import LockButton from '../ViewLikeInTelegram/components/LockButton';
import UploadButton from './components/UploadButton';
import ZenIcon from 'components/Icons/components/ZenIcon';
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
    marginLeft:4,
  }
}));

const HeaderProfileUtils: FC = () => {
  const classes = useStyles();
  const { isSiveIsXs } = useBreakpointNames();

  const headerProfileUtilsDenotationIds = {
    UPLOAD_BUTTON: 'UPLOAD_BUTTON',
    THEME_CHANGER_BUTTON: 'THEME_CHANGER_BUTTON',
    NOTICATION_BUTTON: 'NOTICATION_BUTTON',
    LOCK_BUTTON: 'LOCK_BUTTON',
    ZEN_MODE_BUTTON: 'ZEN_MODE_BUTTON',
    AVATAR_BUTTON: 'AVATAR_BUTTON'
  };

  const headerProfileUtilsOrderIds = [];

  const iconButtonUtilsArr = [
    {
      component: UploadButton,
      toolTipText: 'Upload your pakeeps data',
      id: headerProfileUtilsDenotationIds.UPLOAD_BUTTON
    },
    {
      component: ThemeChangerButton,
      toolTipText: 'Change theme',
      id: headerProfileUtilsDenotationIds.THEME_CHANGER_BUTTON
    },
    {
      component: NoticationButton,
      toolTipText: 'Number of notifications',
      id: headerProfileUtilsDenotationIds.NOTICATION_BUTTON
    },
    {
      component: LockButton,
      toolTipText: 'Lock your accont',

      id: headerProfileUtilsDenotationIds.LOCK_BUTTON
    },
    {
      component: ZenModeButton,
      toolTipText: 'Switch to zen mode',
      id: headerProfileUtilsDenotationIds.ZEN_MODE_BUTTON
    },

    {
      component: AvatarButton,
      toolTipText: 'Open your profile',
      id: headerProfileUtilsDenotationIds.AVATAR_BUTTON
    }

    // { component: , toolTipText: 'Open your profile' }
  ];
  return (
    <>
      <Grid className={classes.profileUtils}>
        {iconButtonUtilsArr.map(({ component: Component, toolTipText, id }, idx) => {
          // if (hideInSmallSize && isSiveIsXs) return;

          return (
            <Tooltip title={toolTipText} key={`HeaderProfileUtils-${id}-${idx}`}>
              <Grid className={classes.headerIconButtonContainer} container justify={'center'} alignItems={'center'}>
                <IconButton>
                  <Component />
                </IconButton>
              </Grid>
            </Tooltip>
          );
        })}
      </Grid>
    </>
  );
};

export default HeaderProfileUtils;
