import { Link, Typography } from '@material-ui/core';
import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/dist/client/router';
import { capitalize, filter, map, split, values } from 'lodash';
import { FC, useState } from 'react';
import NextLink from 'next/link';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import { MainBarPropsType } from '../types';
import { SIGN_IN_URL, NEW_USER_URL } from 'models/denotation';
import { useToggle } from 'react-use';
import MenuByPas from 'components/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  typography: {
    flexGrow: 1
  }
}));

const MainBar: FC<MainBarPropsType> = ({ handleDrawerOpen, isMenuOpen, isSmallSize, isMenuExtended }) => {
  const classes = useStyles();
  const { pathname } = useRouter();

  const isMainPage = pathname === '/';

  const splitedPathName = split(pathname, '/');

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

  return (
    <>
      {isRouteIsSignIn || isRoteIsSignUp ? (
        <Typography variant={'h6'}>{isRoteIsSignUp ? 'Register' : 'Log In '}</Typography>
      ) : (
        <>
          <Tooltip title={menuToolTipTitle}>
            <IconButton
              aria-label={'open drawer'}
              onClick={handleDrawerOpen}
              edge={'start'}
              className={clsx(classes.menuButton)}
            >
              {isMenuExtended ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>
          {!isSmallSize && (
            <Typography variant={'h6'} className={classes.typography}>
              {/* {headerTitle} */}

              {headerArr.map((el, idx) => {
                if (!el) return;

                const href = el.routeArr.join('');
                const isLast = idx + 1 === splitedPathName.length;

                return (
                  <>
                    <Link color={'inherit'} onClick={event => event.preventDefault()} style={{ cursor: 'pointer ' }}>
                      <NextLink href={href}>{el.string}</NextLink>
                    </Link>
                    {isLast ? '' : ' / '}
                  </>
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
