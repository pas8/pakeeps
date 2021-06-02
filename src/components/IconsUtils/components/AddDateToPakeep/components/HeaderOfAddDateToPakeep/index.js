import PropTypes from 'prop-types';
import { Grid, IconButton, Typography, makeStyles, SvgIcon } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { themeColors } from 'components/theme';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

const useStyles = makeStyles(theme => ({
  container: ({ borderColor }) => ({
    borderBottom: '1px solid',
    borderBottomColor:  borderColor
  })
  // wrapperOfSaveButton: { marginRight: theme.spacing(1 * 0.8) }
}));

const HeaderOfAddDateToPakeep = ({
  buttonSaveState,
  arrowButtonFunc,
  dynamicTitle,
  isSaveButtonHidden = false,
  onClickOfSaveButton,
  customTitle,
  customColor
}) => {
  const borderColor =  !customColor ?  themeColors.mediumEmphasis :  customColor?.hover  
  const classes = useStyles({ borderColor });

  return (
    <Grid  className={classes.container} container justify={'space-between'}>
      <Grid item>
        <Grid container alignItems={'center'}>
          <IconButtonByPas
            icon={ArrowBackOutlinedIcon}
            onClick={arrowButtonFunc}
            activeProperty={Boolean(!buttonSaveState)}
            customColor={customColor}
          />

          {!!customTitle ? (
            customTitle
          ) : (
            <Typography variant={'subtitle1'}>{dynamicTitle ? dynamicTitle : 'Close'}</Typography>
          )}
        </Grid>
      </Grid>
      {!isSaveButtonHidden && (
        <Grid item className={classes.wrapperOfSaveButton}>
            <IconButtonByPas icon={SaveRoundedIcon} onClick={onClickOfSaveButton} customColor={customColor} />
        </Grid>
      )}
    </Grid>
  );
};

HeaderOfAddDateToPakeep.propTypes = {
  arrowButtonFunc: PropTypes.func,
  buttonSaveState: PropTypes.oneOf(['string', 'bool']),
  customTitle: PropTypes.any,
  dynamicTitle: PropTypes.oneOf(['string', 'bool']),
  isSaveButtonHidden: PropTypes.bool,
  onClickOfSaveButton: PropTypes.func
};

export default HeaderOfAddDateToPakeep;
