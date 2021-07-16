import { fade, Grid, InputBase, makeStyles, useTheme, Menu, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { HeaderSearchPropsType, UseStylesOfHeaderSearchType } from 'components/Header/types';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPakeeps } from 'store/modules/App/selectors';
import { useClickAway } from 'react-use';
import { useFocus } from 'hooks/useFocus.hook';

const useStyles = makeStyles(({ shape: { borderRadius }, spacing, transitions, palette, breakpoints }) => ({
  search: ({ isHeaderHavePaperColor, isSeaching }: UseStylesOfHeaderSearchType) => {
    const backgroundColor = isHeaderHavePaperColor
      ? palette.background.default
      : isSeaching
      ? palette.background.paper
      : 'transparent';

    return {
      position: 'relative',
      borderRadius,
      backgroundColor,
      marginRight: spacing(2),
      marginLeft: 0,
      transition: transitions.create('width'),
      border: '1px solid',
      borderBottom: isHeaderHavePaperColor ? 0 : '1px solid',
      borderColor: isSeaching
        ? palette.secondary.main
        : !isHeaderHavePaperColor
        ? palette.background.paper
        : palette.background.default,
      borderBottomColor: palette.background.default,

      borderBottomRightRadius: isSeaching ? 0 : borderRadius,
      borderBottomLeftRadius: isSeaching ? 0 : borderRadius,
      width: isSeaching ? spacing(66) : spacing(36),
      color: isHeaderHavePaperColor
        ? palette.text.secondary
        : isSeaching
        ? palette.text.primary
        : palette.background.default,
      '&  button': {
        marginRight: 2,
        '& svg': {
          color: palette.text.hint
        },
        '&:hover svg': {
          color: palette.text.primary
        }
      }
    };
  },
  // searchIcon: {
  //   padding: spacing(0, 0.4, 0, 1.4)
  // },

  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: ({ isSeaching }: UseStylesOfHeaderSearchType) => spacing(0.8, 1, 0.8, isSeaching ? 1.4 : 0.4),
    transition: transitions.create('width')
    // [breakpoints.up('md')]: {
    //   width: '20ch'
    // }
  },
  menuContainer: ({ isHeaderHavePaperColor, isSeaching }: UseStylesOfHeaderSearchType) => {
    const background = palette.background[isHeaderHavePaperColor ? 'default' : 'paper'];
    return {
      position: 'absolute',
      background,
      border: `1px solid ${palette.secondary.main}`,
      borderTop: 0,
      borderBottomRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      right: -1,
      left: -1,
      top: '100%',
      height: '100px'
    };
  }
}));

const HeaderSearch: FC<HeaderSearchPropsType> = ({ isOnlySearchVisible, isSeaching, setIsSeaching }) => {
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const pakeeps = useSelector(getPakeeps);

  const classes = useStyles({ isHeaderHavePaperColor, isSeaching, isOnlySearchVisible });

  const [query, setQuery] = useState('');

  const filteredData = pakeeps.filter(({ title }) => {
    return title.toString().toLowerCase().includes(query.toLowerCase());
  });
  // console.log(filteredData);
  const handleChangeQuery: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setQuery(value);
  };
  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsSeaching(false);
  });

  const [inputRef, setInputFocus] = useFocus();

  return (
    <>
      <Grid className={classes.search} container ref={ref} onFocus={() => setIsSeaching(true)}>
        <InputBase
          ref={inputRef}
          startAdornment={
            !isSeaching && (
              <IconButton size={'small'} onClick={setInputFocus}>
                <SearchIcon />
              </IconButton>
            )
          }
          endAdornment={
            !!isSeaching && (
              <IconButton size={'small'} className={'clearButton'}>
                {' '}
                <CloseOutlinedIcon />{' '}
              </IconButton>
            )
          }
          placeholder="Search…"
          type={'text'}
          autoComplete={'off'}
          value={query}
          onChange={handleChangeQuery}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        {isSeaching && <Grid className={classes.menuContainer}></Grid>}
      </Grid>
    </>
  );
};

export default HeaderSearch;
