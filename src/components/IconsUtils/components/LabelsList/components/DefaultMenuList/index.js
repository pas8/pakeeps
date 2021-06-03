import { makeStyles, MenuItem, ListItemText, FormControl, FormLabel ,Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(({ spacing,palette }) => ({
  container: {
    border: 0,
    borderBottomWidth: 2,
    borderColor: palette?.mediumEmphasis?.main,
    borderStyle: 'solid',
    margin: spacing(0.8, 0, 0.4, 0),
    '& legend': {
      padding: spacing(0.8, 1.6)
    }
  },
  defaultMenuListItem: {
    padding: spacing(1, 1),
    fontSize: '10px',
    '& svg': {
      margin: spacing(0, 1.08, 0, 0.2),
      color: palette?.highEmphasis?.main
    }
  }
}));

const DefaultMenuListOflabelList = ({ defaultMenuListArr }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      <FormLabel component={'legend'}>All Utils</FormLabel>

      {defaultMenuListArr.map(({ title, Icon, onClick }) => (
        <MenuItem disableGutters onClick={onClick} className={classes.defaultMenuListItem} key={nanoid()}>
          <Icon /> <ListItemText secondary={title} />
        </MenuItem>
      ))}
    </Grid>
  );
};

DefaultMenuListOflabelList.propTypes = {
  defaultMenuListArr: PropTypes.shape({
    map: PropTypes.func
  })
};

export default DefaultMenuListOflabelList;
