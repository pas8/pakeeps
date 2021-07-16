import { FC } from 'react';
import { makeStyles, Tooltip, Grid, IconButton } from '@material-ui/core';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

import { useSelector } from 'react-redux';
import { getHeaderProperties, getIsZenModeActive } from 'store/modules/App/selectors';
import { values } from 'lodash';
import { headerProfileUtilsDenotationIds } from 'models/denotation';
import ZenModeButton from './components/ZenModeButton';
import { useTakeHeaderProfileUtilsObj } from 'hooks/useTakeHeaderProfileUtilsObj.hook';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(({ spacing, palette: { text, background } }) => ({
  profileUtils: ({ isHeaderHavePaperColor }: { isHeaderHavePaperColor: boolean }) => ({
    display: 'flex',
    '& button': {
      '&:hover': {
        '& .MuiTouchRipple-root': {
          background: useAlpha(!isHeaderHavePaperColor ? background.default : text.primary)
        },
        '& svg': {
          color: !isHeaderHavePaperColor ? background.default : text.primary
        }
      },
      '& svg': {
        color: !isHeaderHavePaperColor ? background.paper : text.secondary
      }
    },

    '& button:not(:last-child)': {
      height: spacing(6)
    }
  }),
  headerIconButtonContainer: {
    width: 42,
    height: 42,
    marginLeft: 4
  }
}));

const HeaderProfileUtils: FC = () => {
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const classes = useStyles({ isHeaderHavePaperColor });
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
            <Grid
              className={classes.headerIconButtonContainer}
              container
              justify={'center'}
              alignItems={'center'}
              key={`HeaderProfileUtils-${id}-${idx}`}
            >
              <Tooltip title={toolTipText}>
                <IconButton onClick={onClick}>
                  <Component />
                </IconButton>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default HeaderProfileUtils;
