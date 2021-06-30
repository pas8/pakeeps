import { IconButton, makeStyles, Button ,Tooltip,Grid} from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { NONE } from 'models/denotation';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAvatarProperties } from 'store/modules/App/selectors';

const useStyles = makeStyles(({ spacing }) => ({
  containerOfHeaderAvatarButton: {
    maxWidth: spacing(4.2),
    height: spacing(4.2),
    marginLeft:spacing(0.8),
    // transform: 'scale(0.5)',
    padding: 0,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      // padding:spacing(0.4),
      // border:'1px solid black',
      height: '100%'
    }
  }
}));

const AvatarButton: FC = () => {
  const classes = useStyles();

  const { url, backgroundColor, borderRadius } = useSelector(getAvatarProperties);

  return (
    <>
      {url === NONE ? (
        <IconButton aria-label={'account of current user'} aria-haspopup={'true'} color={'inherit'}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      ) : (
      <Tooltip title={'Open your profile'}>

        <Grid
          className={classes.containerOfHeaderAvatarButton}
          style={{ backgroundColor, borderRadius: `${borderRadius}%` }}
        >
          <img src={url} />
        </Grid>
      </Tooltip>

      )}
    </>
  );
};

export default AvatarButton;
