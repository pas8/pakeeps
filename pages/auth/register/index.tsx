import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthForm from 'components/AuthForm';
import FieldSetContainer from 'components/FieldSetContainer';
import { getHeaderHeight } from 'store/modules/App/selectors';

const Index = () => {
  const headerHeight = useSelector(getHeaderHeight);
  return (
    <Grid
   
      style={{ height: `calc(92vh - ${headerHeight}px)` }}
      container
      justify={'center'}
      alignItems={'center'}
    >
      <FieldSetContainer lg={4} xl={3} md={5} sm={8} xs={12} container item    title={'Register'}>
        <AuthForm isPageIsRegisted />
      </FieldSetContainer>
    </Grid>
  );
};

export default Index;
