import { makeStyles, Grid,InputBase,Checkbox } from '@material-ui/core';
import { filter } from 'lodash';
import { FC } from 'react';
import { CheckBoxItemPropsType } from './types';

const useStyles = makeStyles(
  ({ spacing, palette, transitions, typography: { subtitle1, h5 }, shape: { borderRadius } }) => ({
    checkBoxContainer: {},
    notAccomplishedCheckBoxContainer:{}
  })
);

const CheckBoxItem: FC<CheckBoxItemPropsType> = ({ checkBoxesArr ,setCheckBoxes}) => {
  const classes = useStyles();

  const accomplishedCheckBoxes = filter(checkBoxesArr, ({ isAccomplished }) => !!isAccomplished);
  const notAccomplishedCheckBoxes = filter(checkBoxesArr, ({ isAccomplished }) => !isAccomplished);

const onChange


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setState({ ...state, [event.target.name]: event.target.checked });
};

  return (
    <Grid className={classes.checkBoxContainer} container>
      {notAccomplishedCheckBoxes.map(({color, value,id }) => {

return <Grid className={classes.notAccomplishedCheckBoxContainer}> 

<CheckBox  checked={false} onChange={handleChange}/>  <InputBase name={id} value/>
</Grid>


      })}
      
    </Grid>
  );
};

export default CheckBoxItem;
