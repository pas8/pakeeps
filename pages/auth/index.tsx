import { Grid, makeStyles, Typography, useTheme, Button, TextField } from '@material-ui/core';
import ButtonOfSignInProvider from 'components/ButtonOfSignInProvider';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getCsrfToken, getProviders, signIn, useSession } from 'next-auth/client';
import { AppProviders } from 'next-auth/providers';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { NEW_USER_URL } from 'models/denotation';import FieldSetContainer from 'components/FieldSetContainer';
import { getHeaderHeight } from 'store/modules/App/selectors';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import AuthForm from 'components/AuthForm';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  container: {
    padding: spacing(0.4, 1, 0.2, 1),

    width: '100%',
  },

  buttonProvidersContainer: {
    borderRadius,
    borderColor: useAlpha(palette.text.primary, 0.2),
    width: '100%',
    height: spacing(30),

    '& >  legend': {
      padding: spacing(0, 0.8)
    }
  },
  footerButtons: {
    width: '48%',
    '& > div': {
      height: spacing(6)
    }
  },
  authContainer: {
    borderRadius,
    borderColor: useAlpha(palette.text.primary, 0.2),

    height: spacing(26),

    '& > legend': {
      padding: spacing(0, 0.8)
    }
  },
  border: {
    margin: spacing(4.2, 0, 3.2),

    borderBottom: `1px solid ${useAlpha(palette.text.primary, 0.2)}`
  }
}));

const Auth: FC<{ providers: AppProviders }> = ({ providers }) => {
  const classes = useStyles();

  const {
    palette: { secondary, text }
  } = useTheme();
  const [session, loading] = useSession();
// console.log(session)



  const router = useRouter();

  const providersColor = {
    GitHub: '#999999',
    Facebook: '#4267B2',
    Google: '#0f9d58',
    GitLab: '#df6d2c'
  };

  const goToRegisterPage = () => {
    router.push(NEW_USER_URL);
  };
  const headerHeight = useSelector(getHeaderHeight);

  const isProvidersButtonHaveCustomView = false;
  return (
    <Grid alignItems={'center'} justify={'center'} container className={classes.container}
    
    style={{ height: `calc(92vh - ${headerHeight}px)` }}
    >
      <FieldSetContainer lg={4} xl={3} md={5} sm={8} xs={12} container title={'Sign In'}>
        <Grid
          xs={12}
          container
          item
          className={classes.authContainer}
          component={isProvidersButtonHaveCustomView ? 'fieldset' : 'div'}
        >
          {isProvidersButtonHaveCustomView && (
            <legend>
              <Typography color={'textSecondary'} variant={'subtitle1'}>
                Auth
              </Typography>
            </legend>
          )}
          <AuthForm />
        </Grid>
        <Grid className={classes.border} container />
        <Grid
          xs={12}
          // item
          container
          item
          className={classes.buttonProvidersContainer}
          component={isProvidersButtonHaveCustomView ? 'fieldset' : 'div'}
        >
          {isProvidersButtonHaveCustomView && (
            <legend>
              <Typography color={'textSecondary'} variant={'subtitle1'}>
                With Providers
              </Typography>
            </legend>
          )}

          {Object.values(providers).map(({ name, id },idx) => (
            <ButtonOfSignInProvider
            key={`ButtonOfSignInProvider_${name}_${id}_${idx}`}
              onClick={e => signIn(id)}
              name={name}
              //@ts-ignore
              color={providersColor[name]}
              isProvidersButtonHaveCustomView={isProvidersButtonHaveCustomView}
            />
          ))}
        </Grid>
        <Grid container justify={'center'} xs={12}></Grid>
      </FieldSetContainer>
    </Grid>
  );
};

export default Auth;

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();

  // const csrfToken = await getCsrfToken(context);
  return {
    props: { providers }
    // props: { providers, csrfToken }
  };
};
