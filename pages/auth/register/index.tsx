import { CircularProgress } from '@material-ui/core';
import AuthFieldSetContainer from 'components/AuthFieldSetContainer';
import PageCenteredContainer from 'components/PageCenteredContainer';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('components/AuthForm'), {
  loading: () => <CircularProgress />,
  ssr:false
});

const Index = () => (
  <PageCenteredContainer>
    <AuthFieldSetContainer title={'Register'}>
      <AuthForm isPageIsRegisted />
    </AuthFieldSetContainer>
  </PageCenteredContainer>
);


export default Index;
