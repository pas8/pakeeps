import { Grid, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  container: {
    height: '90vh'
  }
}));
const Auth = ({}) => {
  const classes = useStyles();

  const [session, loading] = useSession();
  console.log(session);

  return (
    <Grid className={classes.container} container alignItems={'center'} justify={'center'}>
      <Grid item>
        Auth {!session && <Button onClick={signIn}>sign In</Button>}
        {session && <Button onClick={signOut}>sign Out</Button>}
      </Grid>
      <Link href={'secret'}>To the secrets</Link>
    </Grid>
  );
};

Auth.propTypes = {};

export default Auth;
