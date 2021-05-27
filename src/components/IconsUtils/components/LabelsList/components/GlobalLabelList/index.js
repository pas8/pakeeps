import PropTypes from 'prop-types';
import includes from 'lodash.includes';
import { MenuItem, Checkbox, ListItemText, IconButton,Grid } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const GlobalLabelListOflabelList = ({ globalLabels, handleChangeNewLabel, selectedLabels }) => (
  <>
    {globalLabels.map(({ title, id }) => {
      const isChecked = includes(selectedLabels, id);
      const onClick = () => handleChangeNewLabel(isChecked, id);

      return (
        <Grid >
        <MenuItem disableGutters onClick={onClick} key={`newPakeep-label-${id}`}>
          <Checkbox checked={isChecked} /> <ListItemText primary={title} />
        </MenuItem>
        {/* < */}
        {/* <IconButton onClick={(e)=> {e.preventDefault();console.log(';')}}><EditOutlinedIcon/> </IconButton> */}

        </Grid>
      );
    })}
    
  </>
);

GlobalLabelListOflabelList.propTypes = {
  globalLabels: PropTypes.shape({
    map: PropTypes.func
  }),
  handleChangeNewLabel: PropTypes.func,
  selectedLabels: PropTypes.array
};

export default GlobalLabelListOflabelList;
