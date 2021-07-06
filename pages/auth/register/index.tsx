import { Grid } from '@material-ui/core';
import AuthForm from 'components/AuthForm';

const Index = () => {
  return (
    <Grid style={{ height: '88vh' }} container justify={'center'} alignItems={'center'}>
      <Grid lg={4} xl={3} md={5} sm={8} xs={12} container item>
        <AuthForm isPageIsRegisted />
      </Grid>
    </Grid>
  );
};

export default Index;
