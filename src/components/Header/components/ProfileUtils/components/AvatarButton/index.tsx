import { FC, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, makeStyles, Tooltip, Grid } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import { customColorPlaceholder } from 'components/AccountAvatar';
import { NONE } from 'models/denotation';
import { MenusLayoutName } from 'models/unums';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { getAvatarProperties } from 'store/modules/App/selectors';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  containerOfHeaderAvatarButton: {
    // maxWidth: spacing(4.2),
    // height: spacing(4.2),
    marginLeft: spacing(0.8),
    padding: 0,
    overflow: 'hidden',
    '& img': {
      width: 42,
      height: 42
    }
  }
}));

const AvatarButton: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url, backgroundColor, borderRadius } = useSelector(getAvatarProperties);

  const handleOpenMenu: MouseEventHandler<HTMLDivElement> = ({ currentTarget, clientX: mouseX, clientY: mouseY }) => {
    const defaultMenuProps = {
      mouseX,
      mouseY,
      id: 'AvatarButton',
      customColor: customColorPlaceholder,
      menuName: MenusLayoutName.ACCOUNT
    };

    dispatch(toChangeTemporaryData({ newTemporaryData: { defaultMenuProps } }));
  };

  return (
    <Grid onClick={handleOpenMenu} container>
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
