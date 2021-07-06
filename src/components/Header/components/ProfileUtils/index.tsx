import PropTypes from 'prop-types';
import { makeStyles, Tooltip, Grid } from '@material-ui/core';
import ThemeChangerButton from './components/ThemeChangerButton';
import NoticationButton from './components/NoticationButton';
import AvatarButton from './components/AvatarButton';
import { nanoid } from 'nanoid';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { FC } from 'react';

const useStyles = makeStyles(({ spacing }) => ({
  profileUtils: {
    display: 'flex',
    '& button:not(:last-child)': {
      height: spacing(6)
    }
  }
}));

const HeaderProfileUtils: FC = () => {
  const classes = useStyles();

  const { isSiveIsXs } = useBreakpointNames();

  const iconButtonUtilsArr = [
    { component: ThemeChangerButton, toolTipText: 'Change theme', hideInSmallSize: true },
    { component: NoticationButton, toolTipText: 'Number of notifications', hideInSmallSize: true }
    // { component: , toolTipText: 'Open your profile' }
  ];
  return (
    <>
      <Grid className={classes.profileUtils}>
        {iconButtonUtilsArr.map(({ component: Component, toolTipText, hideInSmallSize }) => {
          if (hideInSmallSize && isSiveIsXs) return;

          return (
            <Tooltip title={toolTipText} key={`HeaderProfileUtils-${toolTipText}`}>
              <Grid container>
                <Component />
              </Grid>
            </Tooltip>
          );
        })}
      </Grid>
        <AvatarButton />
    </>
  );
};

export default HeaderProfileUtils;