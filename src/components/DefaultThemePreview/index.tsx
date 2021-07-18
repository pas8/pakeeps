import { makeStyles, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { colord } from 'colord';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { useAlpha } from 'hooks/useAlpha.hook';
import { DefaultThemePreviewPropsType } from './types';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  defaultThemeElementContainer: ({ background, isThemeSelected }: any) => ({
    background: background.default,
    height: spacing(32),
    width: '32.4%',

    [breakpoints.down('md')]: {
      width: '48%'
    },

    [breakpoints.down('sm')]: {
      width: '48%'
    },

    [breakpoints.down('xs')]: {
      width: '100%'
    },
    position: 'relative',
    borderRadius,
    margin: spacing(0, 0, 1, 0),
    overflow: 'hidden',
    border: `3px solid `,
    borderColor: isThemeSelected ? palette.primary.main : background.paper,
    '&:hover': {
      cursor: 'pointer',
      borderColor: palette.secondary.main
    }
  }),

  headerOfThemePrewier: ({ background, isHeaderHavePaperColor }: any) => ({
    height: spacing(4.4),
    width: '100%',
    padding: spacing(0, 2),
    background: !isHeaderHavePaperColor ? palette.primary.main : background.paper,
    '& > div': {
      height: spacing(2.4),
      background: colord(background.default).invert().alpha(0.32).toHex(),
      borderRadius
    }
  }),

  leftPartPreviewOfHeaderOfThemePrewier: ({ background: { type } }: any) => ({
    width: '32%',
    [breakpoints.down('sm')]: {
      width: '24%'
    },
    color: type === 'light' ? '#000' : '#fff',
    padding: spacing(0, 1)
  }),

  rightPartPreviewOfHeaderOfThemePrewier: {
    width: '24%',
    [breakpoints.down('sm')]: {
      width: '18%'
    },
    background: `${palette.secondary.main} !important`
  },
  bodyOfThemePrevier: {
    height: '80%',
    margin: spacing(2, 0, 0, 0)
  },
  navOfThemePrevier: ({ background }: any) => ({
    borderRadius,
    margin: spacing(0, 0, 0, 2),

    width: '20%',
    [breakpoints.down('sm')]: {
      width: '16%'
    },
    height: spacing(14),
    '& > div': {
      height: '20%',
      width: '100%',
      marginBottom: '12%',
      '&:nth-child(2)': {
        height: '42%',
        width: '100%'
      },

      '& > div': {
        borderRadius: borderRadius / 2,
        width: '90%',
        height: '100%',
        background: colord(background.default).invert().alpha(0.32).toHex()
      }
    }
  }),

  activeFolderPrevier: ({ background }: any) => ({
    '& > div': {
      background: `${palette.primary.main} !important`
    }
  }),

  pakeepPrevier: ({ background }: any) => ({
    // height: spacing(24),
    margin: spacing(0, 0, 0, 2),
    padding: spacing(1),
    borderRadius: borderRadius,

    [breakpoints.down('xl')]: {
      width: '48%'
    },
    [breakpoints.down('lg')]: {
      width: '60%'
    },

    [breakpoints.down('md')]: {
      width: '60%'
    },
    [breakpoints.down('sm')]: {
      width: '60%'
    },

    [breakpoints.down('xs')]: {
      width: '60%'
    },
    background: background.paper,

    '& .titleOfPakeepPrevier': {
      height: spacing(2.8),
      overflow: 'hidden',
      color:palette.text.primary,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      minWidth: '42%'
    },
    '& .textOfPakeepPrevier': {
      borderRadius: borderRadius / 2,
      padding: spacing(0.4, 0.4, 0.2, 0.8),

      '& p': {
        color: background.textColor
      },
      background: colord(background.default).invert().alpha(0.16).toHex(),
      width: '100%',
      margin: spacing(1, 0, 0, 0)
    }
  }),
  eventsContainerOfPakeepPrevier: ({ background }: any) => ({
    height: spacing(2.4),

    background: 'transparent !important',

    margin: spacing(0.8, 0, 0, 0),
    width: '80%',

    '& > div:nth-child(2)': {
      background: `${palette.mixed.main} !important`
    },

    '& > div': {
      borderRadius: borderRadius / 2,
      width: '46.8%',
      height: '100%',
      background: colord(background.default).invert().alpha(0.32).toHex()
    }
  }),

  labelContainerOfPakeepPrevier: ({ background }: any) => ({
    height: spacing(2),

    background: 'transparent !important',

    margin: spacing(0.8, 0, 0, 0),
    width: '92%',

    '& > div:nth-child(1)': {
      background: `${palette.primary.main} !important`
    },

    '& > div:nth-child(2)': {
      background: `${palette.secondary.main} !important`
    },

    '& > div': {
      borderRadius: borderRadius / 2,
      width: '30%',
      height: '100%',
      background: colord(background.default).invert().alpha(0.32).toHex()
    }
  }),
  caption: ({ background }: any) => ({
    padding: spacing(0.4, 0.8),
    borderRadius: borderRadius / 2,
    background: colord(background.default).invert().alpha(0.16).toHex(),
    color: background.textColor
  }),
  randomBgContainer: () => ({
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    borderRadius: borderRadius,
    right: 0,
    zIndex: 0,
    bottom: 0,

    '& p': {
      userSelect: 'none',
      color: useAlpha(palette.mediumEmphasis?.main!, 0.42),
      width: '200%',
      height: '300%',
      lineHeight: '32px',
      transform: 'rotate(42deg) translateX(-42%) translateY(-8%)'
    }
  })
}));

const DefaultThemePreview: FC<DefaultThemePreviewPropsType> = ({
  caption,
  background,

  isThemeSelected,
  onClick,
}) => {
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const classes = useStyles({ background, isHeaderHavePaperColor, isThemeSelected });

  return (
    <Grid className={classes.defaultThemeElementContainer} onClick={onClick}>
      <Grid>
        <Grid className={classes.headerOfThemePrewier} justify={'space-between'} alignItems={'center'} container>
          <Grid className={classes.leftPartPreviewOfHeaderOfThemePrewier}></Grid>
          <Grid className={classes.rightPartPreviewOfHeaderOfThemePrewier} item />
        </Grid>
      </Grid>
      <Grid className={classes.bodyOfThemePrevier} container alignItems={'flex-start'}>
        <Grid className={classes.navOfThemePrevier} container>
          <Grid className={classes.activeFolderPrevier}>
            <Grid />
          </Grid>

          {Array(2).fill(
            <Grid>
              <Grid />
            </Grid>
          )}
        </Grid>
        <Grid className={classes.pakeepPrevier}>
          <Grid className={'titleOfPakeepPrevier'}>
            <Typography variant={'button'} className={classes.caption}>
              {caption}
            </Typography>
          </Grid>
          <Grid className={'textOfPakeepPrevier'}>
            <Typography variant={'body2'}>Background: {background.default}</Typography>

            <Typography variant={'body2'}>Paper: {background.paper}</Typography>
            <Typography variant={'body2'}>Text: {background.textColor}</Typography>
          </Grid>

          <Grid className={classes.eventsContainerOfPakeepPrevier} container justify={'space-between'}>
            {Array(2).fill(
              <Grid>
                <Grid />
              </Grid>
            )}
          </Grid>

          <Grid className={classes.labelContainerOfPakeepPrevier} container justify={'space-between'}>
            {Array(2 + 1).fill(<Grid></Grid>)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DefaultThemePreview;
