import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import FieldSetContainer from 'components/FieldSetContainer';
import SettingContainer from 'components/SettingContainer';
import SwitchByPas from 'components/Switch';
import TransferListOfHeaderUtils from 'components/TransferListOfHeaderUtils';
import { APPEARANCE, appearanceIds, settingUrls } from 'layouts/RouterLayout/denotation';
import { toChangeSettingProperty } from 'store/modules/Settings/actions';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';

const useStyles = makeStyles(({ spacing, transitions, breakpoints, shape, palette }) => ({
  container: {}
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
        <FieldSetContainer title={'Header'} id={settingUrls[APPEARANCE][appearanceIds.HEADER]}>
          <SwitchByPas
            title={'Is header color is secondary'}
            checked={!isHeaderHavePaperColor}
            onChange={handleChangeHeaderHavePaperColorStatus}
          />
          <TransferListOfHeaderUtils />
        </FieldSetContainer>
      </SettingContainer>
    </Grid>
  );
};

export default SettingAppearance;
