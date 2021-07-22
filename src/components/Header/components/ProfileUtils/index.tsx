import { FC } from 'react';
import { makeStyles, Tooltip, Grid, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { getHeaderProperties } from 'store/modules/App/selectors';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { useTakeHeaderProfileUtilsObj } from 'hooks/useTakeHeaderProfileUtilsObj.hook';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';

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

  const { isSizeSmall } = useBreakpointNames();

  const classes = useStyles({ isHeaderHavePaperColor:isHeaderHavePaperColor|| isSizeSmall});

  const { order } = useSelector(getHeaderProperties);

  const headerProfileUtilsObj = useTakeHeaderProfileUtilsObj();

  return (
    <>
      <Grid className={classes.profileUtils}>
        {order.names.map((id, idx) => {
          // if (hideInSmallSize && isSiveIsXs) return;

          const findedEl = headerProfileUtilsObj[id];
          if (!findedEl) return null;
          const { component: Component, toolTipText, onClick, iconName } = findedEl;
          const [icon] = useTakeIcon(iconName!);

          return (
            <Grid
              className={classes.headerIconButtonContainer}
              container
              justify={'center'}
              alignItems={'center'}
              key={`HeaderProfileUtils-${id}-${idx}`}
            >
              <Tooltip title={toolTipText}>
                <IconButton onClick={onClick}>{!!iconName ? icon : <Component />}</IconButton>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default HeaderProfileUtils;
