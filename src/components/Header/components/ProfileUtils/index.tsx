import { FC } from 'react';
import { makeStyles, Tooltip, Grid, IconButton } from '@material-ui/core';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

import { useSelector } from 'react-redux';
import { getHeaderProperties, getIsZenModeActive } from 'store/modules/App/selectors';
import { values } from 'lodash';
import { headerProfileUtilsDenotationIds } from 'models/denotation';
import ZenModeButton from './components/ZenModeButton';
import { useTakeHeaderProfileUtilsObj } from 'hooks/useTakeHeaderProfileUtilsObj.hook';

const useStyles = makeStyles(({ spacing, palette: { text } }) => ({
  profileUtils: {
    display: 'flex',
    '& svg': {
      color: text.hint,
      '&:hover': {
        color: text.primary
      }
    },
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

  const { orderIds } = useSelector(getHeaderProperties);

  const headerProfileUtilsObj = useTakeHeaderProfileUtilsObj();

  return (
    <>
      <Grid className={classes.profileUtils}>
        {orderIds.map((id, idx) => {
          // if (hideInSmallSize && isSiveIsXs) return;

          const findedEl = headerProfileUtilsObj[id];
          if (!findedEl) return null;
          const { component: Component, toolTipText, onClick } = findedEl;

          return (
            <IconButtonUtilContainer onClick={onClick} title={toolTipText} key={`HeaderProfileUtils-${id}-${idx}`}>
              <Component />
            </IconButtonUtilContainer>
          );
        })}
      </Grid>
    </>
  );
};

export default HeaderProfileUtils;

const IconButtonUtilContainer: FC<any> = ({ children, onClick, title }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.headerIconButtonContainer} container justify={'center'} alignItems={'center'}>
      <Tooltip title={title}>
        <IconButton onClick={onClick}>{children}</IconButton>
      </Tooltip>
    </Grid>
  );
};
