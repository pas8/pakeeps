import { Grid, Typography, Button, makeStyles, Chip } from '@material-ui/core';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';

const useStyles = makeStyles(({ shape, spacing, palette, typography: { caption }, breakpoints }) => ({
  container: ({ color }: { color: string }) => ({
    // MuiChip-root
    borderTop: `1px solid ${useAlpha(color, 0.42)}`,

    '&:focus': {
      color,
      ' & .MuiChip-root': {
        background: color,
        color: palette.getContrastText(color)
      }
    },
    padding: spacing(1.2, 0, 1.2, 1.2),
    borderRadius: 0,
    margin: `0 !important`,
    width: '100%',
    '& .MuiChip-root': {
      // ...caption,
      transform: 'scale(0.92)',
      border: `1px solid transparent`,
      marginTop: -2,
      marginRight: 4
    },
    '& p': {
      textAlign: 'left',
      textTransform: 'capitalize',
      display: 'flex',
      color: palette.text.secondary,
      '& svg': {
        padding: 2,
        marginRight: 4

        // marginTop:-2,
      }
    },
    '& button': {
      ...caption,
      textTransform: 'lowercase',
      padding: spacing(0.2, 0.8),
      '& svg': {
        marginLeft: -6,
        color
      },

      display: 'none',
      background: palette.background.default
    },

    '&:hover': {
      background: color,
      '& .MuiTouchRipple-root': {
        color: palette.getContrastText(color)
      },
      cursor: 'pointer',
      '& p': {
        // textDecoration: 'underline',
        color: palette.getContrastText(color),
        '& svg': {
          color: palette.getContrastText(color)
        }
        // color
      },
      '& .MuiChip-root': {
        background: 'transparent',
        borderColor: palette.getContrastText(color),
        color: palette.getContrastText(color)
      }
    },
    [breakpoints.down('sm')]: {
      padding: spacing(1.6)
    }
  })
}));

const SearchGroupItem: FC<{
  color: string;
  label?: string;
  title: string;
  onClick: () => void;
  customIcon?: any | false;
}> = ({ color, title, onClick, customIcon = false, label }) => {
  const classes = useStyles({ color });

  return (
    <Button className={classes.container} onClick={onClick}>
      <Grid container alignItems={'center'}>
        <Typography variant={'body2'}>
          {!!customIcon ? customIcon : <Chip label={label} size={'small'} />}
          <span> {title}</span>
        </Typography>
      </Grid>
    </Button>
  );
};

export default SearchGroupItem;
