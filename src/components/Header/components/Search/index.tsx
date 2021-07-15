import { fade, InputBase, makeStyles, useTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { HeaderSearchPropsType } from 'components/Header/types';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { FC } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  search: ({ isHeaderHavePaperColor }: { isHeaderHavePaperColor: boolean }) => ({
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      width: 'calc(100% + 100px)'

    },
    '&:focus': {
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto'
  }),
  searchIcon: {
    padding: theme.spacing(0, 0.4, 0, 1.4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const HeaderSearch: FC<HeaderSearchPropsType> = ({ isOnlySearchVisible, isSeaching, setIsSeaching }) => {
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);

  const classes = useStyles({ isHeaderHavePaperColor });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default HeaderSearch;
