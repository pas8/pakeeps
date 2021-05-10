import { makeStyles, Tooltip, Grid } from '@material-ui/core';
import ThemeChangerButton from './components/ThemeChangerButton';
import NoticationButton from './components/NoticationButton';
import AvatarButtor from './components/AvatarButtor';

const useStyles = makeStyles(theme => ({
  profileUtils: {
    display: 'flex'
  }
}));

const HeaderProfileUtils = () => {
  const classes = useStyles();

  const iconButtonUtilsArr = [
    { component: ThemeChangerButton, toolTipText: 'Change theme' },
    { component: NoticationButton, toolTipText: 'Number of notifications' },
    { component: AvatarButtor, toolTipText: 'Open your profile' }
  ];

  return (
    <div className={classes.profileUtils}>
      {iconButtonUtilsArr.map(({ component: Component, toolTipText }) => (
        <Tooltip title={toolTipText} >
          <Grid container>
            <Component />
          </Grid>
        </Tooltip>
      ))}
    </div>
  );
};

HeaderProfileUtils.propTypes = {};

export default HeaderProfileUtils;
