import { Grid, InputBase, makeStyles, IconButton, Dialog, Button, Typography, Box, Slide } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { filter, isEmpty, map, mapValues, values,flatten } from 'lodash';
import { useClickAway } from 'react-use';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';

import { getGlobalEventsArr, getLabels, getPakeeps, getQuerySearchArr } from 'store/modules/App/selectors';
import { HeaderSearchPropsType, UseStylesOfHeaderSearchType } from 'components/Header/types';
import { DownSildeTransition } from 'components/SildeTransitions';
import { useAlpha } from 'hooks/useAlpha.hook';
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
    search: ({ isHeaderHavePaperColor, isSeaching, isQueryEmpty,isArrSearchArrEmpty }: UseStylesOfHeaderSearchType) => {
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

        borderBottomRightRadius: isSeaching && !isArrSearchArrEmpty  ? 0 : borderRadius,
        borderBottomLeftRadius: isSeaching  && !isArrSearchArrEmpty? 0 : borderRadius,
        width: isSeaching ? spacing(96) : spacing(42),
        color: isHeaderHavePaperColor
          ? palette.text.secondary
          : isSeaching
          ? palette.text.primary
          : palette.background.default,

        [breakpoints.down('sm')]: {
          border: 0,
          width: isSeaching ? '100%' : spacing(16)
        },

        '& .searchIconButton': {
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

    inputRoot: ({
      isHeaderHavePaperColor,
      isSeaching,
      isQueryEmpty,
      isArrSearchArrEmpty
    }: UseStylesOfHeaderSearchType) => ({
      color: 'inherit',
      padding: isSeaching && !isArrSearchArrEmpty ? spacing(0.6, 0) : '',
      width: '100%',
      '&  button': {
        marginRight: 2
      },

      '& .clearButton': {
        '& svg': {
          color: palette.text.hint
        },
        '&:hover svg': {
          color: palette.text.primary
        }
      },

      [breakpoints.down('sm')]: {
        position: 'relative',
        padding: spacing(0.2),

        // background: palette.background['default'],
        border: 0
      }
    }),

    inputInput: {
      ...subtitle2,
      fontSize: subtitle1.fontSize,
      padding: ({ isSeaching }: UseStylesOfHeaderSearchType) => spacing(0.8, 1, 0.8, isSeaching ? 1.4 : 0.4),
      transition: transitions.create('width')
      // [breakpoints.down('xs')]: {
      //   margin:spacing(0,-1)
      // }
      // [breakpoints.up('md')]: {
      //   width: '20ch'
      // }
    },
    menuContainer: ({ isHeaderHavePaperColor, isSeaching, isQueryEmpty }: UseStylesOfHeaderSearchType) => {
      const background = palette.background[isHeaderHavePaperColor ? 'default' : 'paper'];
      return {
        position: 'absolute',
        background,
        overflow: 'hidden',
        border: `1px solid ${palette.secondary.main}`,
        borderTop: 0,
        borderBottomRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,

        right: -1,
        left: -1,
        top: '100%',
        [breakpoints.down('sm')]: {
          position: 'relative',
          top: 0,
          background: palette.background.paper,

          border: 0,
          right: 0,
          left: 0
        },
        '& .queryHistoryIconButton': {
          padding: 4,
          '&:hover': {
            background: useAlpha(palette.background.default, 0.42)
          }
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

          [breakpoints.down('sm')]: {
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

            [breakpoints.down('sm')]: {
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

  const eventsSearchArr = events.filter(({ title }) => useCheckQuery(title));
  const labelsSearchArr = labels.filter(({ title }) => useCheckQuery(title));

  const attributesSearchPropertyiesArr = [
    { title: 'Events', arr: eventsSearchArr, defaultIconName: 'week' },
    { title: 'Labels', arr: labelsSearchArr, defaultIconName: 'label' }
  ];
  const isContainerIsDialog = isSizeSmall && isSeaching;

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
      <IconButton size={'small'} onClick={setInputFocus} className={'searchIconButton'}>
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

  const isArrSearchArrEmpty =
    !flatten( flatten( values(defaultPakeepSeacrhPropertyiesObj).map(el=> values(el)))).length && !flatten(attributesSearchPropertyiesArr.map(({arr})=>arr)).length && !isQueryEmpty;

  const classes = useStyles({
    isHeaderHavePaperColor: isHeaderHavePaperColor || isSizeSmall,
    isSeaching,
    isOnlySearchVisible,
    isQueryEmpty,
    isArrSearchArrEmpty
  });

 
  const Container: any = !isContainerIsDialog ? Grid : Dialog;

  const containerProps = isContainerIsDialog
    ? { open: true, fullScreen: true, TransitionComponent: DownSildeTransition }
    : {
        className: classes.search,
        container: true,
        ref,
        onFocus: () => setIsSeaching(true)
      };

  const handleDeleteSeachHistoryItem = (queryId: string) => {
    dispatch(toChangeQuerySearchArr({ querySearchArr: filter(querySearchArr, name => name !== queryId) }));
  };

  return (
    <Container {...containerProps}>
      <InputBase
        ref={inputRef}
        startAdornment={startAdornment}
        endAdornment={
          !!isSeaching && (
            <IconButton size={isSizeSmall ? 'medium' : 'small'} className={'clearButton'} onClick={handleCloseSearch}>
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
          root: clsx(classes.inputRoot),
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      {isSeaching && !isArrSearchArrEmpty && (
        <Grid className={classes.menuContainer} container={isSizeSmall}>
          {isQueryEmpty
            ? querySearchArr.map((caption, idx) => {
                if (!caption) return;
                return (
                  <Grid className={clsx(container)} container key={`querySearchArr_${caption}_${idx}`}>
                    <Button onClick={() => setQuery(caption)} className={'buttonContainer'}>
                    <Box ml={0.4}>
                    <Grid container justify={'center'} alignItems={'center'}>

                      {/* <IconButton size={'small'} > */}
                        <HistoryOutlinedIcon />
                      </Grid>

                      {/* </IconButton> */}
                      </Box>

                      <Grid container justify={'space-between'} alignItems={'center'}>
                      <Box ml={-0.4}>

                        <Typography component={'legend'}>{caption}</Typography>
                      </Box>

                      </Grid>
                      <Box mr={-0.4}>
                        <IconButton
                          size={'small'}
                          className={'queryHistoryIconButton'}
                          onClick={() => {
                            
                            handleDeleteSeachHistoryItem(caption)}}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
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
