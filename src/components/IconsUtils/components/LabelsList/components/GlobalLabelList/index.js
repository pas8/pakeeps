import PropTypes from 'prop-types';
import includes from 'lodash.includes';
import { MenuItem, Checkbox, ListItemText, Grid, makeStyles } from '@material-ui/core';
import IconsUtilsOfGlobalLabelListOflabelList from './components/IconsUtils';

const GlobalLabelListOflabelList = ({ globalLabels, handleChangeNewLabel, selectedLabels, setMenuState }) => (
  <>
    {globalLabels.map(labelState => {

const isChecked = includes(selectedLabels, labelState.id);
      const onClickOfCheckBoxContainer = () => handleChangeNewLabel(isChecked, labelState.id);
      const onClickOfEditButton = e => {
        e.preventDefault();
        setMenuState({ mouseX: e.clientX, mouseY: e.clientY, ...labelState,labelIconName:labelState.iconName });
      };
    
      const iconsUtilsOfGlobalLabelListOflabelListProps = { onClickOfEditButton };

      return (
        <MenuItem disableGutters key={`newPakeep-label-${labelState.id}`}>
          <Grid container alignItems={'center'} onClick={onClickOfCheckBoxContainer}>
            <Checkbox checked={isChecked} /> <ListItemText primary={labelState.title} />
          </Grid>
          <IconsUtilsOfGlobalLabelListOflabelList {...iconsUtilsOfGlobalLabelListOflabelListProps} />
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
  selectedLabels: PropTypes.array,
  setMenuState: PropTypes.func
}

export default GlobalLabelListOflabelList;
