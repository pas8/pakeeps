import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useMeasure } from 'react-use';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  textOfFolderWithPakeepsView: ({ positionOfFolderViewWithPakeepViewIsBottom }) =>
    !positionOfFolderViewWithPakeepViewIsBottom
      ? { padding: theme.spacing(0, 0, 0, 0.8) }
      : {
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          flexWrap: positionOfFolderViewWithPakeepViewIsBottom ? 'wrap' : 'nowrap',
          justifyContent: 'flex-end',
          // width:'100%',
          // height:'100%',
          alignItems: 'center'
        }
}));

const ButtomItem = ({ onClick, icon, title, positionOfFolderViewWithPakeepViewIsBottom, findedIdx, id ,isMenuOpen,isShouldBeHidden}) => {
  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom });

  const [ref, { width: buttonWidth }] = useMeasure();
  console.log(buttonWidth);
  if(isShouldBeHidden) return <></>;
  return ( 
    // <Grid ref={ref}>
      <ToggleButton
      //  ref={ref}
        value={findedIdx}
        aria-label={title}
        onClick={e => {
          onClick && e.preventDefault();
          onClick();
        }}
        key={id}
      >
        {icon}
        {isMenuOpen && (
          <Grid className={classes.textOfFolderWithPakeepsView} container>
            {title}
          </Grid>
        )}
      </ToggleButton>
    // </Grid>
  );
};

ButtomItem.propTypes = {};

export default ButtomItem;
