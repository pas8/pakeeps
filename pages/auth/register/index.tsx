import AuthFieldSetContainer from 'components/AuthFieldSetContainer';
import AuthForm from 'components/AuthForm';
import PageCenteredContainer from 'components/PageCenteredContainer';

const Index = () => (
  <PageCenteredContainer>
    <AuthFieldSetContainer title={'Register'}>
      <AuthForm isPageIsRegisted />
    </AuthFieldSetContainer>
  </PageCenteredContainer>
);

export default Index;
