import { Grid, InputBase, makeStyles, IconButton, Dialog, Button, Typography, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { filter, isEmpty, map, mapValues } from 'lodash';
import { useClickAway } from 'react-use';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';

import { getGlobalEventsArr, getLabels, getPakeeps, getQuerySearchArr } from 'store/modules/App/selectors';
import { HeaderSearchPropsType, UseStylesOfHeaderSearchType } from 'components/Header/types';
import { useFocus } from 'hooks/useFocus.hook';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { getIsHeaderHavePaperColor } from 'store/modules/Settings/selectors';
import { NamesOfSearchPropertyiesType } from 'store/modules/App/types';
import PakeepPropertiesSearchGroup from './components/PakeepPropertiesGroup';
import AttributesPropertiesGroup from './components/AttributesPropertiesGroup';
import { toChangeQuerySearchArr } from 'store/modules/App/actions';
import { useStylesOfSearchGroupContainerWithTitle } from './components/ContainerWithTitle';

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
          width: isSeaching ? '100%' : spacing(16)
        }
      };
    },
    // searchIcon: {
    //   padding: spacing(0, 0.4, 0, 1.4)
    // },

    inputRoot: ({ isHeaderHavePaperColor }: any) => ({
      color: 'inherit',
      width: '100%',
      '&  button': {
        marginRight: 2,
        '& svg': {
          color: isHeaderHavePaperColor ? palette.text.hint : palette.background.paper
        },
        '&:hover svg': {
          color: isHeaderHavePaperColor ? palette.text.primary : palette.background.default
        }
      },

      [breakpoints.down('xs')]: {
        position: 'relative',
        padding:spacing(0.2),
        background: palette.background.paper,
        border: 0,
      }
    }),
    inputInput: {
      ...subtitle2,
      fontSize: subtitle1.fontSize,
      padding: ({ isSeaching }: UseStylesOfHeaderSearchType) => spacing(0.8, 1, 0.8, isSeaching ? 1.4 : 0.4),
      transition: transitions.create('width'),
      // [breakpoints.down('xs')]: {
      //   margin:spacing(0,-1)
      // }
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
        [breakpoints.down('xs')]: {
          position: 'relative',
          top: 0,
          background: palette.background.paper,

          border: 0,
          right: 0,
          left: 0
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

          [breakpoints.down('xs')]: {
            background: palette.background.paper
          },
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

            background: palette.background.default,

            [breakpoints.down('xs')]: {
              background: palette.background.paper
            }
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
  const dispatch = useDispatch();

  const { isSizeSmall, isSiveIsXs } = useBreakpointNames();

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

  const handleCloseSearch = () => {
    setQuery('');
    !isSizeSmall && handleSetSeachingStatusIsFalse();
  };
  const classes = useStyles({
    isHeaderHavePaperColor: isHeaderHavePaperColor || isSizeSmall,
    isSeaching,
    isOnlySearchVisible,
    isQueryEmpty
  });

  const eventsSearchArr = events.filter(({ title }) => useCheckQuery(title));
  const labelsSearchArr = labels.filter(({ title }) => useCheckQuery(title));

  const attributesSearchPropertyiesArr = [
    { title: 'Events', arr: eventsSearchArr, defaultIconName: 'week' },
    { title: 'Labels', arr: labelsSearchArr, defaultIconName: 'label' }
  ];
  const isContainerIsDialog = isSiveIsXs && isSeaching;

  const Container: any = !isContainerIsDialog ? Grid : Dialog;

  const containerProps = isContainerIsDialog
    ? { open: true, fullScreen: true }
    : {
        className: classes.search,
        container: true,
        ref,
        onFocus: () => setIsSeaching(true)
      };

  const startAdornment = isSizeSmall ? (
    !isSeaching ? null : (
      <IconButton
        onClick={() => {
          handleCloseSearch();
          handleSetSeachingStatusIsFalse();
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    )
  ) : (
    !isSeaching && (
      <IconButton size={ 'small'} onClick={setInputFocus}>
        <SearchIcon />
      </IconButton>
    )
  );

  const querySearchArr = useSelector(getQuerySearchArr);

  const defaultFunc = () => {
    dispatch(toChangeQuerySearchArr({ querySearchArr: [query, ...filter(querySearchArr, name => name !== query)] }));
    handleSetSeachingStatusIsFalse();
  };
  const { container } = useStylesOfSearchGroupContainerWithTitle();
  return (
    <Container {...containerProps}>
      <InputBase
        ref={inputRef}
        startAdornment={startAdornment}
        endAdornment={
          !!isSeaching && (
            <IconButton size={isSizeSmall ? 'medium' :'small'} className={'clearButton'} onClick={handleCloseSearch}>
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
      {isSeaching && (
        <Grid className={classes.menuContainer} container={isSizeSmall}>
          {isQueryEmpty
            ? querySearchArr.map((caption, idx) => {
                return (
                  <Grid className={container} container key={`querySearchArr_${caption}_${idx}`}>
                    <Button onClick={() => setQuery(caption)} className={'buttonContainer'}>
                      <HistoryOutlinedIcon />
                        <Grid container justify={'space-between'} alignItems={'center'}>
                      <Box py={1}>

                          <Typography component={'legend'}>{caption}</Typography>
                      </Box>
                          
                        </Grid>
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                );
              })
            : map(defaultPakeepSeacrhPropertyiesObj, (list, key) => {
                if (isEmpty(list)) return null;
                return <PakeepPropertiesSearchGroup list={list} title={key} key={key} defaultFunc={defaultFunc} />;
              })}

          {attributesSearchPropertyiesArr.map((el, idx) => {
            if (!el.arr.length) return null;
            const key = `attributesSearchPropertyiesArr-${el.title}-${idx}`;

            return <AttributesPropertiesGroup {...el} key={key} defaultFunc={defaultFunc} />;
          })}
        </Grid>
      )}
    </Container>
  );
};

export default HeaderSearch;
