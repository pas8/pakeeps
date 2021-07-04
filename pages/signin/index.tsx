import { Grid, makeStyles ,Typography} from '@material-ui/core';
import ButtonOfSignInProvider from 'components/ButtonOfSignInProvider';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getProviders, signIn } from 'next-auth/client';
import { AppProviders } from 'next-auth/providers';
import { FC } from 'react';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  container: {
    width: '100%',
    height: '80vh'
  },
  buttonProvidersContainer: {
    borderRadius,
    borderColor: useAlpha(palette.text.primary, 0.2),
    width: 'auto',
    padding: spacing(0.8,1,0.2,1),

    '& legend': {
      padding: spacing(0, 0.8)
    }
  }
}));

const SignIn: FC<{ providers: AppProviders }> = ({ providers }) => {
  const classes = useStyles();

  const providersColor = {
    GitHub: '#999999',
    Facebook: '#4267B2',
    Google: '#0f9d58'
  };

  return (
    <Grid alignItems={'center'} justify={'center'} container className={classes.container}>
      <Grid
        lg={3}
        xl={2}
        md={4}
        sm={8}
        xs={12}
        container
        item
        className={classes.buttonProvidersContainer}
        component={'fieldset'}
      >
        <legend>
          
      <Typography color={'textSecondary'} variant={'subtitle1'}>    Sign_In</Typography></legend> 
        {Object.values(providers).map(({ name, id }) => (
          <Grid key={name} container item alignItems={'center'} justify={'center'}>
            <ButtonOfSignInProvider onClick={e => signIn(id)} name={name} color={providersColor[name]} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SignIn;

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();
  return {
    props: { providers }
  };
};
