import { Grid } from '@material-ui/core';
import { FC } from 'react';

const ButtonUtils: FC<any> = () => {
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

  // const handleAllRight = () => {
  //   setRight(right.concat(left));
  //   setLeft([]);
  // };

  // const handleCheckedRight = () => {
  //   setRight(right.concat(leftChecked));
  //   setLeft(not(left, leftChecked));
  //   setChecked(not(checked, leftChecked));
  // };

  // const handleCheckedLeft = () => {
  //   setLeft(left.concat(rightChecked));
  //   setRight(not(right, rightChecked));
  //   setChecked(not(checked, rightChecked));
  // };

  // const handleAllLeft = () => {
  //   setLeft(left.concat(right));
  //   setRight([]);
  // };

  return (
    <Grid item>
      Button
      {/* <Grid container direction="column" alignItems="center">
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleAllRight}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          ≫
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleAllLeft}
          disabled={right.length === 0}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default ButtonUtils;
