import { Grid, makeStyles, Typography, useTheme, Button, TextField } from '@material-ui/core';
import { FC, MouseEventHandler } from 'react';
import { useRouter } from 'next/dist/client/router';
import { NEW_USER_URL, SIGN_IN_URL } from 'models/denotation';
import PageCenteredContainer from 'components/PageCenteredContainer';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette, breakpoints }) => ({
  container: {
    padding: spacing(1.4),
    marginTop:100,
   
    width: '32rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      transform: 'scale(0.4)',

    },
    '& .welco': {
      fontSize: '10rem',
      lineHeight: '0rem',
      marginLeft: -240,
      transform: 'rotate(-2deg)',

      letterSpacing: '-0.42rem'
    },
    '& ._me_': {
      lineHeight: '12rem',
      marginLeft: 100,
      transform: 'rotate(4deg)',
      letterSpacing: '4rem',

      fontSize: '8.8rem'
    },
    '& .in_pa': {
      transform: 'rotate(-4deg)',
      fontSize: '9.2rem',
      // fontWeight:800,
      marginLeft: -60,
      letterSpacing: '2rem',
      lineHeight: '4rem'
    },
    '& ._keeps': {
      marginLeft: -80,
      transform: 'rotate(2deg)',

      lineHeight: '10.2rem',
      letterSpacing: '2rem',

      fontSize: '6.96rem'
    },
    '& p': {
      position: 'relative',
      fontWeight: 800,
      whiteSpace: 'nowrap',
      width: '100%',
      color: palette.text.hint,
      textAlign: 'center',
      marginBottom: spacing(2.8),

      
      // color: colord(palette.primary.main).mix(palette.secondary.main).toHex()
    },
    '& div >  div ': {
      [breakpoints.down('xs')]: {
      transform: 'scale(2.4)',
marginTop:80,
        width: '100%'
      },
      transform: 'scale(1.16)',
      marginTop:42,
      marginLeft:-48,

      width: '49.6%',
      '& a': {
      marginLeft:24,

        width: '100%'
      }
    }
  }
}));

const Auth: FC = () => {
  extend([mixPlugin]);
  const router = useRouter();
  const toSignIn: MouseEventHandler = e => {
    e.preventDefault();
    router.push(SIGN_IN_URL);
  };

  const toRegister: MouseEventHandler = e => {
    e.preventDefault();
    router.push(NEW_USER_URL);
  };
  const { container } = useStyles();
  return (
    <PageCenteredContainer>
      <Grid container className={container} direction={'column'}>
        <Grid container>
          <Typography className={'welco'}>
            V<span style={{ position: 'absolute', top: 0, marginLeft: -18 }}> \</span>
            <span style={{ position: 'absolute', top: 0, marginLeft: 36 }}> /e</span>
            <span style={{ position: 'absolute', top: 0, right: -62, letterSpacing: 42, transform: 'rotate(-178deg)' }}>
              {' '}
              !{' '}
            </span>
            <span
              style={{ position: 'absolute', top: -10, right: -342, letterSpacing: 42, transform: 'rotate(10deg)' }}
            >
              {' '}
              c0{' '}
            </span>
          </Typography>
          <Typography className={'_me_'}>
            <span style={{ position: 'absolute', top: 42, marginLeft: -142 }}>~</span>
            m_
            <span style={{ position: 'absolute', top: 12, marginLeft: -8 }}> e </span>
          </Typography>

          <Typography className={'in_pa'}>
            <span style={{ position: 'absolute', top: -20, marginLeft: -120, transform: 'rotate(16deg)' }}> T </span>
            0_
            <span style={{ position: 'absolute', top: 42, marginLeft: 0, transform: 'rotate(-8deg)' }}> P </span>
            <span style={{ position: 'absolute', top: 20, marginLeft: 100, transform: 'rotate(308deg)' }}> @ </span>
          </Typography>
          <Typography className={'_keeps'}>
            ~k
            <span style={{ position: 'absolute', top: 12, marginLeft: -8 }}> F </span>
            _e
            <span style={{ position: 'absolute', top: 16, marginLeft: -20 }}> p </span> _${' '}
          </Typography>
        </Grid>
        <Grid container justify={'space-between'}>
          <Grid>
            <Button variant={'outlined'} onClick={toRegister} color={'secondary'} href={NEW_USER_URL}>
              Register
            </Button>
          </Grid>
          <Grid>
            <Button color={'primary'} variant={'outlined'} onClick={toSignIn} href={SIGN_IN_URL}>
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageCenteredContainer>
  );
};

export default Auth;
