import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { ButtonUtilsPropsType } from 'components/TransferListOfHeaderUtils/types';
import { flatten, uniq } from 'lodash';
import { FC } from 'react';

const useStyles = makeStyles(
  ({ palette, spacing, shape: { borderRadius }, typography: { subtitle1, subtitle2, h5 } }) => ({
    container: {
      height: '100%',
      // width:50,
      // width:'100%',

      '& button': {
        ...h5,
        width: '100%',
        height: '22.5%'
      }
    }
  })
);

const ButtonUtils: FC<ButtonUtilsPropsType> = ({ selected, setSelected, setState, state, exclusionNamesArr }) => {
  const classes = useStyles();
  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

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

  return (
    <Grid className={classes.container} container direction={'column'} justify={'space-between'}>
      <Button
        variant={'outlined'}
        size={'small'}
        // className={classes.button}
        onClick={handleMoveAllToRight}
        // disabled={left.length === 0}
        aria-label={'move all right'}
      >
        ≫
      </Button>
      <Button
        variant="outlined"
        // size="small"
        // className={classes.button}
        onClick={handleCheckedRight}
        // disabled={leftChecked.length === 0}
        aria-label={'move selected right'}
      >
        &gt;
      </Button>
      <Button
        variant="outlined"
        // size="small"
        // className={classes.button}
        onClick={handleCheckedLeft}
        // disabled={rightChecked.length === 0}
        aria-label="move selected left"
      >
        &lt;
      </Button>
      <Button
        variant="outlined"
        // className={classes.button}
        onClick={handleMoveAllToLeft}
        // disabled={right.length === 0}
        aria-label="move all left"
      >
        ≪
      </Button>
    </Grid>
  );
};

export default ButtonUtils;
