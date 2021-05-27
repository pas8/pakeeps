import PropTypes from 'prop-types';
import { Grid, IconButton, Typography, makeStyles, SvgIcon } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { themeColors } from 'components/theme';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';

const useStyles = makeStyles(theme => ({
  container: { borderBottom: '1px solid rgba(255,255,255,0.4)' },
  // wrapperOfSaveButton: { marginRight: theme.spacing(1 * 0.8) }
}));

const HeaderOfAddDateToPakeep = ({
  buttonSaveState,
  arrowButtonFunc,
  dynamicTitle,
  isSaveButtonHidden = false,
  onClickOfSaveButton,
  customTitle
}) => {
  const classes = useStyles();

  return (
    <Grid borderBottom={1} className={classes.container} container justify={'space-between'}>
      <Grid item>
        <Grid container alignItems={'center'}>
          <IconButtonByPas
            icon={ArrowBackOutlinedIcon}
            onClick={arrowButtonFunc}
            activeProperty={Boolean(!buttonSaveState)}
          />

          {!!customTitle ? (
            customTitle
          ) : (
            <Typography
              variant={'subtitle1'}
              style={{
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              {dynamicTitle ? dynamicTitle : 'Close'}
            </Typography>
          )}
        </Grid>
      </Grid>
      {!isSaveButtonHidden && (
        <Grid item className={classes.wrapperOfSaveButton}>
          <IconButton onClick={onClickOfSaveButton}>
            <SaveRoundedIcon
              style={{
                color:
                  buttonSaveState === 'saved'
                    ? themeColors.primaryMain
                    : `rgba(255,255,255,${buttonSaveState ? 0.8 : 0.42}`
              }}
            />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

HeaderOfAddDateToPakeep.propTypes = {
  arrowButtonFunc: PropTypes.func,
  buttonSaveState: PropTypes.oneOf(["string", "bool"]),
  customTitle: PropTypes.any,
  dynamicTitle: PropTypes.oneOf(["string", "bool"]),
  isSaveButtonHidden: PropTypes.bool,
  onClickOfSaveButton: PropTypes.func
}

export default HeaderOfAddDateToPakeep;
