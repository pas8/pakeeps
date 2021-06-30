import { Link, Typography } from '@material-ui/core';
import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/dist/client/router';
import { capitalize, filter, map, split, values } from 'lodash';
import { FC } from 'react';
import NextLink from 'next/link';
const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  hide: {
    display: 'none'
  },
  typography: {
    flexGrow: 1
  }
}));

const MainBar: FC<any> = ({ handleDrawerOpen, isMenuOpen, isSmallSize }) => {
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

  return (
    <>
      <Tooltip title={'Open Menu'}>
        <IconButton
          aria-label={'open drawer'}
          onClick={handleDrawerOpen}
          edge={'start'}
          className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
        >
          <MenuIcon />
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
  );
};

export default MainBar;
