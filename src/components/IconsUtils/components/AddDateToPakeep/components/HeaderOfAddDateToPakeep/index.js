import PropTypes from 'prop-types';
import { Grid, IconButton, Typography, makeStyles, SvgIcon } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(theme => ({
  container: ({ borderColor }) => ({
    borderBottom: '1px solid',
    borderBottomColor: borderColor
  }),
  title: {
    color: ({ borderColor }) => useAlpha( borderColor,0.8)
  }
  // wrapperOfSaveButton: { marginRight: theme.spacing(1 * 0.8) }
}));

const HeaderOfAddDateToPakeep = ({
  buttonSaveState,
  arrowButtonFunc,
  dynamicTitle,
  isSaveButtonHidden = false,
  onClickOfSaveButton,
  customTitle = false,
  customColor
}) => {
  const [, , , mediumEmphasisColor] = useThemeColors();
  const borderColor = !customColor ? mediumEmphasisColor : customColor?.hover;
  const classes = useStyles({ borderColor });

  return (
    <Grid className={classes.container} container justify={'space-between'}>
      <Grid item>
        <Grid container alignItems={'center'}>
          <IconButtonByPas
            icon={ArrowBackOutlinedIcon}
            onClick={arrowButtonFunc}
            activeProperty={Boolean(!buttonSaveState)}
            customColor={customColor}
          />

          {customTitle || (
            <Grid className={classes.title}>
              {' '}
              <Typography variant={'subtitle1'}>{dynamicTitle ? dynamicTitle : 'Close'}</Typography>{' '}
            </Grid>
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
