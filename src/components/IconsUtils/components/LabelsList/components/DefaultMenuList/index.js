import {  makeStyles,MenuItem,ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { themeColors } from 'components/theme';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(({spacing}) => ({
  defaultMenuListItem: {
    padding: spacing(1, 1),
    '& svg': {
      margin: spacing(0, 1.08, 0, 0.2),
      color: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal
    }
  }
}));

const DefaultMenuListOflabelList = ({ defaultMenuListArr }) => {
  const classes = useStyles();

  return (
    <>
      {defaultMenuListArr.map(({ title, Icon, onClick }) => (
        <MenuItem disableGutters onClick={onClick} className={classes.defaultMenuListItem} key={nanoid()}>
          <Icon /> <ListItemText primary={title} />
        </MenuItem>
      ))}
    </>
  );
};

DefaultMenuListOflabelList.propTypes = {
  defaultMenuListArr: PropTypes.shape({
    map: PropTypes.func
  })
}

export default DefaultMenuListOflabelList;
