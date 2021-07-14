import { Grid } from '@material-ui/core';
import ZenModeIcon from 'components/Icons/components/ZenModeIcon';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { getIsZenModeActive } from 'store/modules/App/selectors';

const ZenModeButton: FC = () => {
  const dispatch = useDispatch();
  const isZenModeActive = useSelector(getIsZenModeActive);

  const handleChageZenModeStatus = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { isZenModeActive: !isZenModeActive } }));
  };

  return (
    <Grid onClick={handleChageZenModeStatus}>
      <ZenModeIcon />
    </Grid>
  );
};

export default ZenModeButton;
