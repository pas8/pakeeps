import PropTypes from 'prop-types';
import includes from 'lodash.includes';
import { MenuItem, Checkbox, ListItemText, Dialog } from '@material-ui/core';

const GlobalLabelListOflabelList = ({ globalLabels, handleChangeNewLabel, selectedLabels }) => (
  <>
    {globalLabels.map(({ title, id }) => {
      const isChecked = includes(selectedLabels, id);
      const onClick = () => handleChangeNewLabel(isChecked, id);

      return (
        <MenuItem disableGutters onClick={onClick} key={`newPakeep-label-${id}`}>
          <Checkbox checked={isChecked} /> <ListItemText primary={title} />
        </MenuItem>
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
