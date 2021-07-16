import { Grid, Typography, Button, makeStyles, Chip } from '@material-ui/core';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import { FC } from 'react';

const useStyles = makeStyles(({ shape, spacing, palette, typography: { subtitle2, subtitle1, caption } }) => ({
  container: ({ color }: { color: string }) => ({
    // MuiChip-root
    borderBottom: `1px solid ${palette.text.disabled}`,

    padding: spacing(0.8, 0, 0.8, 1.2),
    borderRadius: 0,
    margin: `0 !important`,
    width: '100%',
    '& .MuiChip-root': {
      // ...caption,
      transform:'scale(0.92)', 
      border: `1px solid transparent`,
      marginTop: -2,
      marginRight: 4
    },
    '& p': {
      textAlign: 'left',
      textTransform: 'capitalize',
      color: palette.text.secondary
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
    '&:hover button': {
      display: 'flex',
      wrap: 'no-wrap'
    },
    '&:focus button':{

      color: palette.secondary.main

    },
    '&:hover': {
      cursor: 'pointer',
      '& p': {
        textDecoration: 'underline',
        color,
        // color
      },
      '& .MuiChip-root': {
        background: palette.background.default,
        borderColor: color,
        color
      }
    }
  })
}));

const SearchGroupItem: FC<{ color: string; arr: string[]; title: string }> = ({ color, arr, title }) => {
  const classes = useStyles({ color });

  return (
    <Button className={classes.container}>
    <Grid container alignItems={'center'} >
      <Typography variant={'body2'}>
        {' '}
        <Chip label={arr.length} size={'small'} /> {title}{' '}
      </Typography>
    </Grid>
</Button>
  );
};

export default SearchGroupItem;
