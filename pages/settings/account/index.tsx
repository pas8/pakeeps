import { LinearProgress } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useToggle } from 'react-use';

const SettingAccount: FC<any> = () => {
  const [isLoaded, setIsLoaded] = useToggle(false);

  // useEffect(() => {

  // setIsLoaded(true);

  // return () => {
  //   setIsLoaded(false);
  // };
  // }, []);

  return <Grid>Account</Grid>;
};

export default SettingAccount;
