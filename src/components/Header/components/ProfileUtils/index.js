import PropTypes from 'prop-types';
import { makeStyles, Tooltip, Grid } from '@material-ui/core';
import ThemeChangerButton from './components/ThemeChangerButton';
import NoticationButton from './components/NoticationButton';
import AvatarButtor from './components/AvatarButtor';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({
  profileUtils: {
    display: 'flex'
  }
}));

const HeaderProfileUtils = ({ isSmallSize }) => {
  const classes = useStyles();

  const iconButtonUtilsArr = [
    { component: ThemeChangerButton, toolTipText: 'Change theme', hideInSmallSize: true },
    { component: NoticationButton, toolTipText: 'Number of notifications' ,hideInSmallSize: true },
    { component: AvatarButtor, toolTipText: 'Open your profile' }
  ];

  return (
    <div className={classes.profileUtils}>
      {iconButtonUtilsArr.map(({ component: Component, toolTipText, hideInSmallSize }) => {
        if (hideInSmallSize && isSmallSize) return;

        return (
          <Tooltip title={toolTipText} key={nanoid()}>
            <Grid container>
              <Component />
            </Grid>
          </Tooltip>
        );
      })}
    </div>
  );
};

HeaderProfileUtils.propTypes = {
  isSmallSize: PropTypes.bool
};

export default HeaderProfileUtils;
