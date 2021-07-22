import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { flatten, uniq } from 'lodash';
import { FC } from 'react';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { ButtonUtilsPropsType } from 'components/TransferListOfHeaderUtils/types';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, breakpoints }) => ({
  container: {
    height: '100%',
    [breakpoints.down('xs')]: {
      padding: spacing(1.4, 0),
      width: '100%',
      '& .allItemsToSecond,.oneItemToFirst ': {
        transform: 'rotate(-90deg)'
      },

      '& .oneItemToSecond,.allItemsToFirst': {
        transform: 'rotate(270deg)'
      }
    },
    '& button': {
      width: '100%',
      height: '22.5%',
      [breakpoints.down('xs')]: {
        height: 'auto',
        padding: spacing(1, 0),
        width: '22.5%'
      }
    }
  }
}));

const ButtonUtils: FC<ButtonUtilsPropsType> = ({ selected, setSelected, setState, state, exclusionNamesArr }) => {
  const classes = useStyles();

  const handleMoveAllToRight = () => {
    setState(state => [[], flatten(state)]);
  };
  const handleMoveAllToLeft = () => {
    setState(state => [flatten(state), []]);
  };
  const handleCheckedRight = () => {
    setState(state => [state[0].filter(id => !selected.includes(id)), uniq([...selected, ...state[1]])]);
    setSelected([]);
  };

  const handleCheckedLeft = () => {
    setState(state => [uniq([...selected, ...state[0]]), state[1].filter(id => !selected.includes(id))]);
    setSelected([]);
  };
  const { isSiveIsXs } = useBreakpointNames();

  return (
    <Grid className={classes.container} container direction={isSiveIsXs ? 'row' : 'column'} justify={'space-between'}>
      <Button variant={'outlined'} size={'small'} onClick={handleMoveAllToRight} aria-label={'move all right'}>
        <Typography variant={'h5'} className={'allItemsToSecond'}>
          ≫
        </Typography>
      </Button>
      <Button variant={'outlined'} onClick={handleCheckedRight} aria-label={'move selected right'}>
        <Typography variant={'h5'} className={'oneItemToSecond'}>
          &gt;
        </Typography>
      </Button>
      <Button variant={'outlined'} onClick={handleCheckedLeft} aria-label={'move selected left'}>
        <Typography variant={'h5'} className={'oneItemToFirst'}>
          &lt;
        </Typography>
      </Button>
      <Button variant={'outlined'} onClick={handleMoveAllToLeft} aria-label={'move all left'}>
        <Typography variant={'h5'} className={'allItemsToFirst'}>
          ≪
        </Typography>
      </Button>
    </Grid>
  );
};

export default ButtonUtils;
