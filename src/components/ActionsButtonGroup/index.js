import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseButtonWithIcon from './CloseButtonWithIcon';
import SaveButtonWithIcon from './components/SaveButtonWithIcon';

const useStyles = makeStyles(({spacing}) => ({


container:{  '& svg':{

    margin:spacing(0,0,0.2,-0.42)

  },
}
}));

const ActionsButtonGroup = ({ colorOfSaveButton, onSave ,colorOfCloseButton,onClose}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container wrap={'nowrap'} justify={'flex-end'}>
      <CloseButtonWithIcon colorOfCloseButton={colorOfCloseButton} onClose={onClose}/>
      <SaveButtonWithIcon colorOfSaveButton={colorOfSaveButton} onSave={onSave} />
    </Grid>
  );
};

ActionsButtonGroup.propTypes = {
  colorOfCloseButton: PropTypes.any,
  colorOfSaveButton: PropTypes.any,
  onClose: PropTypes.func,
  onSave: PropTypes.func
}

export default ActionsButtonGroup;
