import { Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({}));

const Secret = () => {
  const classes = useStyles();
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  console.log(content);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('api/auth/secret');
      setContent(response.data.content);
    };
    fetchData();
  }, [session]);

  if (loading) return <Grid>loading</Grid>;
  if (!session) return <Grid>You arent sign in</Grid>;

  return <Grid>Great page {content}</Grid>;
};

Secret.propTypes = {};

export default Secret;
