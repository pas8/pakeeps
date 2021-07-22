import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

import FieldSetContainer from 'components/FieldSetContainer';
import SettingContainer from 'components/SettingContainer';
import SwitchByPas from 'components/Switch';
import { APPEARANCE, appearanceIds, settingUrls } from 'layouts/RouterLayout/denotation';
import { toChangeSettingProperty } from 'store/modules/Settings/actions';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';

const TransferListOfHeaderUtils = dynamic(() => import('components/TransferListOfHeaderUtils'), {
  loading: () => (
    <>
      <Typography variant="h4">
        <Skeleton />
      </Typography>
      <Skeleton variant={'rect'} width={320} height={420} />
      <Typography variant="h4">
        <Skeleton />
      </Typography>
      <Skeleton variant={'rect'} width={320} height={100} />
    </>
  )
});

const useStyles = makeStyles(({ spacing, transitions, breakpoints, shape, palette }) => ({
  container: {},
  groupContainer: { padding: spacing(0) }
}));

const SettingAppearance: FC<any> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const handleChangeHeaderHavePaperColorStatus = () => {
    dispatch(toChangeSettingProperty({ property: { isHeaderHavePaperColor: !isHeaderHavePaperColor } }));
  };

  return (
    <Grid container justify={'center'} className={classes.container}>
      <SettingContainer>
        <FieldSetContainer title={'Header'} id={settingUrls[APPEARANCE][appearanceIds.HEADER]} isOnlyTop>
          <Grid container className={classes.groupContainer}>
            <Box mb={2}>
              <SwitchByPas
                title={'Is header color is secondary'}
                checked={!isHeaderHavePaperColor}
                onChange={handleChangeHeaderHavePaperColorStatus}
              />
            </Box>
            <Grid container>
              <TransferListOfHeaderUtils />
            </Grid>
          </Grid>
        </FieldSetContainer>
      </SettingContainer>
    </Grid>
  );
};

export default SettingAppearance;
