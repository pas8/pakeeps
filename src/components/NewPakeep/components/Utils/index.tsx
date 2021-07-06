import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Button, Grid } from '@material-ui/core';
import { useMeasure } from 'react-use';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import IconsUtils from 'components/IconsUtils';
import ActionsButtonGroup from 'components/ActionsButtonGroup/index';
import { FC } from 'react';
import { NewPakeepUtilsType } from './types';

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(({ spacing }) => ({
  container: {
    paddingRight: spacing(0.8)
  }
}));

const NewPakeepUtils: FC<NewPakeepUtilsType> = ({ customColor, onSave, widthOfContainer, ...newPakeepUtilsProps }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [primaryColor, , , , mediumEmphasisColor] = useThemeColors();

  const [ref, { width: widthOfCButtonConatiner }] = useMeasure<HTMLDivElement>();

  const correctWidthOfContainer = widthOfContainer - widthOfCButtonConatiner;

  const iconUtilsProps = {
    ...newPakeepUtilsProps,
    customColor,
    widthOfContainer: correctWidthOfContainer
  };

  const classes = useStyles({ customColor });

  const actionsButtonGroupProps = {
    onSave,
    onClose: null,
    colorOfCloseButton: customColor.isUseDefault ? mediumEmphasisColor : useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor.isUseDefault ? primaryColor : customColor?.hover
  };

  return (
    <Grid className={clsx(classes.container)} container alignItems={'center'} justify={'space-between'}>
      <Grid>
        <IconsUtils {...iconUtilsProps} />
      </Grid>

      <Grid className={classes.buttonGroupWrapper} ref={ref}>
        <ActionsButtonGroup {...actionsButtonGroupProps} />
      </Grid>
    </Grid>
  );
};

export default NewPakeepUtils;
