import { FC } from 'react';
import { Grid, IconButton, Typography, makeStyles, SvgIcon } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import IconButtonByPas from 'components/IconButton';
import { useAlpha } from 'hooks/useAlpha.hook';
import { HeaderOfAddDateToPakeepPropsType, UseStylesOfHeaderOfAddDateToPakeepType } from './types';

const useStyles = makeStyles(({ palette}  ) => ({
  containerClass: ({ customColor, isHideBorder }: UseStylesOfHeaderOfAddDateToPakeepType) => ({
    borderBottom: '1px solid',
    borderBottomColor: isHideBorder
      ? 'transparent'
      : customColor.isUseDefault
      ? palette.text.hint
      : customColor?.hover
  }),
  titleClass: {
    color: ({ customColor }: UseStylesOfHeaderOfAddDateToPakeepType) =>
      useAlpha(customColor.isUseDefault ? palette.text.hint : customColor?.hover!, 0.8)
  }
}));

const HeaderOfAddDateToPakeep: FC<HeaderOfAddDateToPakeepPropsType> = ({
  buttonSaveState,
  arrowButtonFunc,
  dynamicTitle,
  isSaveButtonHidden = false,
  onClickOfSaveButton,
  customTitle = false,
  customColor,
  isHideBorder = false
}) => {
  const classes = useStyles({ customColor, isHideBorder });

  return (
    <Grid className={classes.containerClass} container justify={'space-between'}>
      <Grid>
        <Grid container>
          <IconButtonByPas
            icon={ArrowBackOutlinedIcon}
            onClick={arrowButtonFunc}
            // activeProperty={Boolean(!buttonSaveState)}
            customColor={customColor}
          />
          <Grid>
            <Grid container alignItems={'center'} justify={'center'} style={{ height: '100%' }}>
              {customTitle || (
                <Grid className={classes.titleClass}>
                  <Typography variant={'subtitle1'}>{dynamicTitle ? dynamicTitle : 'Close'}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {!isSaveButtonHidden && (
        <Grid>
          <IconButtonByPas icon={SaveRoundedIcon} onClick={onClickOfSaveButton} customColor={customColor} />
        </Grid>
      )}
    </Grid>
  );
};

export default HeaderOfAddDateToPakeep;
