import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles, Box, Button, Grid } from '@material-ui/core';
import { useMeasure } from 'react-use';

import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import ActionsButtonGroup from 'components/ActionsButtonGroup/index';
import { NewPakeepUtilsType } from './types';

const IconsUtils = dynamic(() => import('components/IconsUtils'), {
  loading: () => (
    <>
      <Skeleton variant={'rect'} width={200} height={42} />
    </>
  )
});

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(({ spacing }) => ({
  container: {
    paddingRight: spacing(0.8)
  }
}));

const NewPakeepUtils: FC<NewPakeepUtilsType> = ({
  customColor,
  onSave,
  widthOfContainer,
  onClose,
  ...newPakeepUtilsProps
}) => {
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
    onClose,
    colorOfCloseButton: customColor.isUseDefault ? mediumEmphasisColor! : useAlpha(customColor?.hover, 0.6),
    colorOfSaveButton: customColor.isUseDefault ? primaryColor! : customColor?.hover
  };

  return (
    <Grid className={clsx(classes.container)} container alignItems={'center'} justify={'space-between'} wrap={'nowrap'}>
      <Grid>
        <IconsUtils {...iconUtilsProps} />
      </Grid>

      <Grid ref={ref}>
        <ActionsButtonGroup {...actionsButtonGroupProps} />
      </Grid>
    </Grid>
  );
};

export default NewPakeepUtils;
