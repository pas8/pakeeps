import { Grid, Typography, makeStyles, useTheme, IconButton, MenuItem, Button } from '@material-ui/core';
import { isArray, map } from 'lodash';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { FC, useState } from 'react';
import SearchGroupItem from '../GroupItem';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(
  ({ shape: { borderRadius }, spacing, typography: { subtitle2, subtitle1, caption, body2, h6 }, palette }) => ({
    container: () => ({
      '& legend': {
        ...subtitle2,
        fontSize: subtitle1.fontSize,
        padding: spacing(0, 0, 0, 1.2),

        textTransform: 'capitalize'
      },
      '& svg': {
        color: palette.text.hint
      },
      '&  .buttonContainer': {
        margin:'0 !important',
        padding: spacing(0.6, 0.4, 0.6, 0),
        borderRadius: 0,
        color: palette.text.secondary,



        '&:focus':{
          // background:useAlpha( palette.secondary.main,0.)
color:palette.secondary.main

        },
        '&:hover': {
          '& legend,svg': {
            color: palette.background.default
          },
          background: palette.secondary.main
          // '& .MuiTouchRipple-root':{}
        },

        width: '100%'
      }
    })
  })
);

const SearchGroup: FC<any> = ({ title, list }) => {
  const classes = useStyles();
  const [isListHidden, setIsListHidden] = useState(true);

  const { palette } = useTheme();

  const handleChangeListHiddenStatus = () => {
    setIsListHidden(prev => !prev);
  };

  return (
    <Grid className={classes.container} container>
      <Button onClick={handleChangeListHiddenStatus} className={'buttonContainer'}>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Typography component={'legend'}>{title}</Typography>
          {!isListHidden ? <ExpandLess /> : <ExpandMore />}
        </Grid>
      </Button>
      {!isListHidden &&
        map(list, (arr, key) => {
          if (!isArray(arr)) return null;
          const color = key === 'backgroundColor' || key === 'color' ? key : palette.secondary.main;
          return <SearchGroupItem title={key} arr={arr} key={key} color={color} />;
        })}
    </Grid>
  );
};

export default SearchGroup;
