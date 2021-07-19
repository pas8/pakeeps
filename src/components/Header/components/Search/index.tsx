import { Grid, InputBase, makeStyles, IconButton, Typography, Button, Chip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _, { chain, groupBy, isEmpty, map, mapValues, pickBy, toPairs } from 'lodash';
import { useClickAway } from 'react-use';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import KeyboardReturnOutlinedIcon from '@material-ui/icons/KeyboardReturnOutlined';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getGlobalEventsArr, getLabels, getPakeeps } from 'store/modules/App/selectors';
import { HeaderSearchPropsType, SearchDataType, UseStylesOfHeaderSearchType } from 'components/Header/types';
import { useFocus } from 'hooks/useFocus.hook';
import { NamesOfSearchPropertyiesType } from 'store/modules/App/types';
import PakeepPropertiesSearchGroup from './components/PakeepPropertiesGroup';
import SearchGroupContainerWithTitle from './components/ContainerWithTitle';
import AttributesPropertiesGroup from './components/AttributesPropertiesGroup';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

const useStyles = makeStyles(
  ({
    shape: { borderRadius },
    spacing,
    transitions,
    palette,
    breakpoints,
    typography: { subtitle2, subtitle1, caption, body2, h6 }
  }) => ({
    search: ({ isHeaderHavePaperColor, isSeaching, isQueryEmpty }: UseStylesOfHeaderSearchType) => {
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
        borderBottom: isHeaderHavePaperColor && !isQueryEmpty ? 1 : '1px solid',
        borderColor: isSeaching
          ? palette.secondary.main
          : !isHeaderHavePaperColor
          ? palette.background.paper
          : palette.background.default,
        borderBottomColor: !isQueryEmpty && isSeaching ? palette.secondary.main : palette.background.default,

        borderBottomRightRadius: isSeaching && !isQueryEmpty ? 0 : borderRadius,
        borderBottomLeftRadius: isSeaching && !isQueryEmpty ? 0 : borderRadius,
        width: isSeaching ? spacing(96) : spacing(42),
        color: isHeaderHavePaperColor
          ? palette.text.secondary
          : isSeaching
          ? palette.text.primary
          : palette.background.default,

        [breakpoints.down('sm')]: {
          border: 0,
          width: isSeaching ? '100%' : 'auto'
        },

        '&  button': {
          marginRight: 2,
          '& svg': {
            color: isHeaderHavePaperColor ? palette.text.hint : palette.background.paper
          },
          '&:hover svg': {
            color: isHeaderHavePaperColor ? palette.text.primary : palette.background.default
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
      ...subtitle2,
      fontSize: subtitle1.fontSize,
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
        [breakpoints.down('sm')]: {
          position: 'relative'
        },

        '& .containerOfSearchGroup': {
          padding: spacing(0.4, 0),

          '& legend': {
            ...h6,
            // ...subtitle2,
            fontSize: subtitle1.fontSize,
            padding: spacing(0, 0, 0, 0.8),

            textTransform: 'capitalize'
          }
        },
        '& .containerOfSearchItem': {
          // MuiChip-root

          padding: spacing(1.2, 0.2, 1.2, 1.2),
          borderRadius: 0,
          margin: 0,
          '& .MuiChip-root': {
            ...caption,
            height: 24,
            marginRight: 8
          },
          width: '100%',
          '& p': {
            overflow: 'hidden',
            textTransform: 'capitalize',
            maxWidth: spacing(42),
            color: palette.text.secondary,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          },
          '& button': {
            ...caption,
            textTransform: 'lowercase',

            padding: spacing(0, 0.8),
            '& svg': {
              // fontSize:'1em',
              marginLeft: -6,
              color: palette.text.secondary
            },
            display: 'none',

            background: palette.background.default
          },
          '&:hover button': {
            display: 'flex',
            wrap: 'no-wrap'
          },
          '&:hover': {
            background: palette.secondary.main,
            '& p, .MuiChip-root': {
              fontWeight: 600,
              maxWidth: spacing(32),
              color: palette.getContrastText(palette.text.secondary)
            },
            '& .MuiChip-root': {
              borderColor: palette.getContrastText(palette.text.secondary)
            },
            '& button,svg': {
              color: palette.secondary.main,
              borderColor: 'transparent'
            }
          }
        }
      };
    }
  })
);

const HeaderSearch: FC<HeaderSearchPropsType> = ({ isOnlySearchVisible, isSeaching, setIsSeaching }) => {
  const isHeaderHavePaperColor = useSelector(getIsHeaderHavePaperColor);
  const pakeeps = useSelector(getPakeeps);
  const events = useSelector(getGlobalEventsArr);
  const labels = useSelector(getLabels);

  const [query, setQuery] = useState('');
  const ref = useRef(null);

  const nullityOfFilteredPakeepData = { title: {}, text: {}, backgroundColor: {}, color: {} } as {
    [Property in NamesOfSearchPropertyiesType]: { [key: string]: string[] };
  };

  const useCheckQuery = (value: string | string[]) => {
    return value.toString().toLowerCase().includes(query.toLowerCase());
  };

  const defaultPakeepSeacrhPropertyiesObj = pakeeps.reduce((sum, { title, text, color, backgroundColor, id }) => {
    const obj = { title, text, color, backgroundColor };

    const notFilteredSearhDataObj = mapValues(obj, (value, key: NamesOfSearchPropertyiesType) => {
      const queryValue = useCheckQuery(value) ? value.toString() : '';

      if (!queryValue || !sum[key]) return sum[key];
      if (!sum[key][queryValue]) return { ...sum[key], [queryValue]: [id] };
      return { ...sum[key][queryValue], [queryValue]: [...sum[key][queryValue], id] };
    });

    return { ...sum, ...notFilteredSearhDataObj };
  }, nullityOfFilteredPakeepData);

  const handleChangeQuery: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setQuery(value);
  };
  const handleSetSeachingStatusIsFalse = () => {
    setIsSeaching(false);
  };

  useClickAway(ref, () => {
    handleSetSeachingStatusIsFalse();
  });

  const [inputRef, setInputFocus] = useFocus();

  const isQueryEmpty = !query;
  const classes = useStyles({ isHeaderHavePaperColor, isSeaching, isOnlySearchVisible, isQueryEmpty });

  const handleCloseSearch = () => {
    setQuery('');
    handleSetSeachingStatusIsFalse();
  };

  // const queryValue = ? value.toString() : '';

  const { isSizeSmall } = useBreakpointNames();
  // const labelsSearchObj =
  // const searchData = { ...defaultPakeepSeacrhPropertyiesObj };

  const eventsSearchArr = events.filter(({ title }) => useCheckQuery(title));
  const labelsSearchArr = labels.filter(({ title }) => useCheckQuery(title));

  const attributesSearchPropertyiesArr = [
    { title: 'Events', arr: eventsSearchArr, defaultIconName: 'week' },
    { title: 'Labels', arr: labelsSearchArr, defaultIconName: 'label' }
  ];

  return (
    <>
      <Grid className={classes.search} container ref={ref} onFocus={() => setIsSeaching(true)}>
        <InputBase
          ref={inputRef}
          startAdornment={
            isSizeSmall ?  !isSeaching ?(
              <></>
            ) :  <>fuck</>: !isSeaching &&  ( 
              <IconButton size={'small'} onClick={setInputFocus}>
                <SearchIcon />
              </IconButton>
            )
          }
          endAdornment={
            !!isSeaching && (
              <IconButton size={'small'} className={'clearButton'} onClick={handleCloseSearch}>
                <CloseOutlinedIcon />
              </IconButton>
            )
          }
          placeholder={'Search…'}
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
        {isSeaching && !isQueryEmpty && (
          <Grid className={classes.menuContainer} container={isSizeSmall}>
            {map(defaultPakeepSeacrhPropertyiesObj, (list, key) => {
              if (isEmpty(list)) return null;
              return (
                <PakeepPropertiesSearchGroup
                  list={list}
                  title={key}
                  key={key}
                  onClose={handleSetSeachingStatusIsFalse}
                />
              );
            })}

            {attributesSearchPropertyiesArr.map((el, idx) => {
              if (!el.arr.length) return null;
              const key = `attributesSearchPropertyiesArr-${el.title}-${idx}`;

              return <AttributesPropertiesGroup {...el} key={key} onClose={handleSetSeachingStatusIsFalse} />;
            })}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default HeaderSearch;
