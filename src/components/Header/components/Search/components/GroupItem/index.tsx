import { Grid, Typography, Button, makeStyles, Chip } from '@material-ui/core';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';

const useStyles = makeStyles(({ shape, spacing, palette, typography: { subtitle2, subtitle1, caption } }) => ({
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
    padding: spacing(0.8, 0, 0.8, 1.2),
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
      display:'flex',
      color: palette.text.secondary,
      '& svg': {
        padding:2,
        marginRight: 4,
        
        // marginTop:-2,
      },
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
      '& .MuiTouchRipple-root': {
        background: useAlpha(color)
      },
      cursor: 'pointer',
      '& p': {
        textDecoration: 'underline',
        color,
        '& svg':{
        color
          
        }
        // color
      },
      '& .MuiChip-root': {
        background: 'transparent',
        borderColor: color,
        color
      }
    }
  })
}));

const SearchGroupItem: FC<{
  color: string;
  label?:string
  title: string;
  onClick: () => void;
  customIcon?: any | false;
}> = ({ color,  title, onClick, customIcon = false,label }) => {
  const classes = useStyles({ color });

  return (
    <Button className={classes.container} onClick={onClick}>
      <Grid container alignItems={'center'}>
        <Typography variant={'body2'}>
          {!!customIcon ? customIcon : <Chip label={label} size={'small'} />}<span> {title}</span>
        </Typography>
      </Grid>
    </Button>
  );
};

export default SearchGroupItem;
