import { CircularProgress, Grid } from '@material-ui/core';
import AuthFieldSetContainer from 'components/AuthFieldSetContainer';
import PageCenteredContainer from 'components/PageCenteredContainer';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('components/AuthForm'), {
  loading: () => <CircularProgress />,
  ssr: false
});

const Index = () => (
  <PageCenteredContainer style={{padding:12}}>
    <Grid style={{ padding: 12 }} container alignItems={'center'}  justify={'center'}>
      <AuthFieldSetContainer title={'Register'}>
        <AuthForm isPageIsRegisted />
      </AuthFieldSetContainer>
    </Grid>
  </PageCenteredContainer>
);

export default Index;
