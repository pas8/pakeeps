import { IconButton, Link, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles, Tooltip } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { capitalize, map, split } from 'lodash';
import { FC, Fragment } from 'react';
import NextLink from 'next/link';
import { SIGN_IN_URL, NEW_USER_URL } from 'models/denotation';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { getIsAuthedWithLocalPassword } from 'store/modules/App/selectors';
import { MainBarPropsType } from '../../types';
import MenuButton from '../ProfileUtils/components/MenuButton';
import { useTakeFuncOfChangngDrawerOpenStatus } from 'hooks/useTakeFuncOfChangngDrawerOpenStatus.hook';

const useStyles = makeStyles(({ palette: { text } ,spacing}) => ({
  menuButton: {
    margin: spacing(0, 0.8, 0, -1.8),
    '& svg': {
      color: text.hint, 
      '&:hover': {
        color: text.primary
      }
    }
  },
  typography: {
    flexGrow: 1
  }
}));

const MainBar: FC<MainBarPropsType> = ({ isMenuOpen, isMenuExtended }) => {
  const classes = useStyles();
  const { pathname } = useRouter();
  const { isSiveIsXs } = useBreakpointNames();

  const isMainPage = pathname === '/';

  const splitedPathName = split(pathname, '/');
  const isAuthedWithLocalPinCode = useSelector(getIsAuthedWithLocalPassword);

  const headerArr = isMainPage
    ? [{ string: 'Pakeeps', routeArr: ['/'] }]
    : map(splitedPathName, (el, idx) => {
        const arr = Array.from(splitedPathName);
        arr.splice(idx + 1, splitedPathName.length);

        const routeArr = arr.filter(el => !!el).map(el => '/' + el);

        const defaultString = capitalize(el);
        const isFirst = idx === 0;

        if (isFirst) return false;
        // if (isLast) return { string: defaultString, routeArr };

        const string = defaultString;
        return { string, routeArr };
      });

  const menuToolTipTitle = isMenuExtended ? 'Narrow down menu' : isMenuOpen ? 'Extend menu' : 'Open Menu';
  const isRouteIsSignIn = pathname === SIGN_IN_URL;
  const isRoteIsSignUp = pathname === NEW_USER_URL;

  const handleChangeDrawerOpenStatus = useTakeFuncOfChangngDrawerOpenStatus();

  return (
    <>
      {isRouteIsSignIn || isRoteIsSignUp ? (
        <Typography variant={'h6'}>{isRoteIsSignUp ? 'Register' : 'Log In '}</Typography>
      ) : (
        <>
          <Tooltip title={menuToolTipTitle}>
            <IconButton className={classes.menuButton} onClick={handleChangeDrawerOpenStatus}>
              <MenuButton />
            </IconButton>
          </Tooltip>
          {!isSiveIsXs && (
            <Typography variant={'h6'} className={classes.typography}>
              {/* {headerTitle} */}
              {!isAuthedWithLocalPinCode
                ? 'Enter a pin code'
                : headerArr.map((el, idx) => {
                    if (!el) return;

                    const href = el.routeArr.join('');
                    const isLast = idx + 1 === splitedPathName.length;
                    const isFirst = idx === 0;
                    return (
                      <Fragment key={`headerArr-${idx}`}>
                        <Link
                          color={'inherit'}
                          onClick={event => event.preventDefault()}
                          style={{ cursor: 'pointer ' }}
                          component={'span'}
                        >
                          <NextLink href={href}>{el.string}</NextLink>
                        </Link>
                        {isLast && isFirst ? '' : ' / '}
                      </Fragment>
                    );
                  })}
            </Typography>
          )}
        </>
      )}
    </>
  );
};

export default MainBar;
