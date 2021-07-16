import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { SearchGroupContainerWithTitlePropsType } from 'components/Header/types';
import { FC } from 'react';

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
        margin: '0 !important',
        padding: spacing(0.6, 0.4, 0.6, 0),
        borderRadius: 0,
        color: palette.text.secondary,

        '&:focus': {
          color: palette.secondary.main,
          '& svg': {
            color: palette.secondary.main
          }
        },
        '&:hover': {
          '& legend,svg': {
            color: palette.background.default
          },
          background: palette.secondary.main
        },

        width: '100%'
      }
    })
  })
);

const SearchGroupContainerWithTitle: FC<SearchGroupContainerWithTitlePropsType> = ({
  setIsListHidden,
  isListHidden,
  children,
  title
}) => {
  const classes = useStyles();

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
      {children}
    </Grid>
  );
};

export default SearchGroupContainerWithTitle;
