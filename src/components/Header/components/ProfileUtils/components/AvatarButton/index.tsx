import { FC } from 'react';
import {  useSelector } from 'react-redux';
import {  makeStyles, Tooltip, Grid } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { NONE } from 'models/denotation';
import { getAvatarProperties } from 'store/modules/App/selectors';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  containerOfHeaderAvatarButton: {
    // maxWidth: spacing(4.2),
    // height: spacing(4.2),
    // marginLeft: spacing(0.8),
    padding: 0,
    overflow: 'hidden',
    '& img': {
      // width:'100%',
      // height:'100%',
      width: 42,
      height: 42
    }
  }
}));

const AvatarButton: FC = () => {
  const classes = useStyles();
  const { url, backgroundColor, borderRadius } = useSelector(getAvatarProperties);

  return (
    <Grid container>
      {url === NONE ? (
        <AccountCircleOutlinedIcon />
      ) : (
        <Grid
          className={classes.containerOfHeaderAvatarButton}
          style={{ backgroundColor, borderRadius: `${borderRadius}%` }}
        >
          <img src={url} />
        </Grid>
      )}
    </Grid>
  );
};

export default AvatarButton;
