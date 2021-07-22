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
       width: 22,
      height: 22,
    // overflow: 'hidden',
    '& img': {
      
      objectFit:'fill',
      width:'100%',
      height:'100%',
   
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
        container
          className={classes.containerOfHeaderAvatarButton}
          style={{ backgroundColor}} 
        >
          <img src={url} style={{borderRadius: `${borderRadius}%` }}/>
        </Grid>
      )}
    </Grid>
  );
};

export default AvatarButton;
