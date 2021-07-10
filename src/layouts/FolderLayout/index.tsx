import { Grid, IconButton, makeStyles, SwipeableDrawer } from '@material-ui/core';
import Folders from 'components/Folders';
import { usePakeepFolders } from 'hooks/usePakeepFolders.hook';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect, useRef, ReactEventHandler, FC } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
// import {
//   handleChangeFolders,
//   handleCurrentFolderPropertyIdx,
//   handleDrawerWidth
// } from 'store/modules/App/operations';
import {
  getCurrentFolderPropertyIdx,
  getFolders,
  getMenuOpenStatus,
  getDrawerWidth,
  getLabels,
  getDefaultFolderArr,
  getGlobalEventsArr
} from 'store/modules/App/selectors';
import {
  getIsFolderViewWithPakeepViewAlignToCenter,
  getNavigationViewLike,
  getPositionOfFolderViewWithPakeepView
} from 'store/modules/Settings/selectors';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { AllElementsIsBooleanType, LayoutChildrenType } from 'models/types';
import {
  toChangeFolders,
  toChangeMenuOpenStatus,
  toSetCurrentFolderPropertyIdx,
  toSetDrawerWidth
} from 'store/modules/App/actions';
import { DrawerWidthType, FoldersType } from 'store/modules/App/types';
import { HandleChangeOfFolders } from 'components/Folders/types';
import { menuOpenStatusDenotation } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';

const useStyles = makeStyles(({ palette }) => ({
  container: ({
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight
  }: AllElementsIsBooleanType) => ({
    // justifyContent: positionOfFolderViewWithPakeepViewIsBottom && 'center',
    '& nav': positionOfFolderViewWithPakeepViewIsBottom
      ? {
          zIndex: 92,
          position: 'fixed',
          bottom: 0
        }
      : {
          position: 'fixed',
          bottom: 0,
          top: 0,
          [positionOfFolderViewWithPakeepViewIsRight ? 'right' : 'left']: 0
        }
  }),
  arrowButton: ({
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight
  }: AllElementsIsBooleanType) => ({
    zIndex: 96,
    position: 'fixed',
    bottom: positionOfFolderViewWithPakeepViewIsBottom ? 0 : '50%',
    [positionOfFolderViewWithPakeepViewIsRight ? 'right' : 'left']: positionOfFolderViewWithPakeepViewIsBottom
      ? '50%'
      : 0,
    transform: `rotate(${
      positionOfFolderViewWithPakeepViewIsBottom ? 270 : positionOfFolderViewWithPakeepViewIsRight ? 180 : 0
    }deg)`,
    '& svg': {
      color: palette?.mediumEmphasis?.main,
      '&:hover': {
        color: palette?.highEmphasis?.main
      }
    }
  })
}));

const FolderLayout = ({ children }: LayoutChildrenType) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [br] = useCustomBreakpoint();

  const isVerySmall = br === 'xs' || br === 'sm';

  const handleDrawerWidth = (drawerWidth: number) => {
    dispatch(toSetDrawerWidth({ drawerWidth }));
  };

  const handleCurrentFolderPropertyIdx = (currentFolderPropertyIdx: number) => {
    dispatch(toSetCurrentFolderPropertyIdx({ currentFolderPropertyIdx }));
  };

  const handleChangeFolders = (folders: FoldersType) => {
    dispatch(toChangeFolders({ folders }));
  };

  const currentFolderPropertyIdx = useSelector(getCurrentFolderPropertyIdx);
  const labels = useSelector(getLabels);
  const events = useSelector(getGlobalEventsArr);
  const defaultFolderArr = useSelector(getDefaultFolderArr);

  const menuOpenStatus = useSelector(getMenuOpenStatus);

  const isMenuOpen = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;
  const isFolderOpen = menuOpenStatus === menuOpenStatusDenotation.OPEN || isMenuOpen;

  const drawerWidth = useSelector(getDrawerWidth);

  const positionOfFolderViewWithPakeepView = useSelector(getPositionOfFolderViewWithPakeepView);
  const isFolderViewWithPakeepViewAlignToCenter = useSelector(getIsFolderViewWithPakeepViewAlignToCenter);

  const positionOfFolderViewWithPakeepViewIsBottom = positionOfFolderViewWithPakeepView === 'bottom';
  const positionOfFolderViewWithPakeepViewIsRight = positionOfFolderViewWithPakeepView === 'right';
  const positionOfFolderViewWithPakeepViewIsLeft = positionOfFolderViewWithPakeepView === 'left';

  const foldersArr = usePakeepFolders({ events, labels, defaultFolderArr });

  const marginValue = 8;

  const handleChange: HandleChangeOfFolders = (__, idx) => {
    handleCurrentFolderPropertyIdx(idx);
  };

  const handleHideFolder = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.HIDDEN }));
    handleDrawerWidth(0);
  };

  const [margin, setMargin] = useState(0);
  const [isSizeOfFoldersMoreThanSize, setIsSizeOfFoldersMoreThanSize] = useState(false);

  const isFoldersHaveDraweView = isVerySmall && isMenuOpen;

  const handleCloseFoldersWithDrawerView = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.OPEN }));
  };

  const foldersProps = {
    handleChange,
    handleCloseFoldersWithDrawerView,
    value: currentFolderPropertyIdx,
    handleDrawerWidth,
    isFoldersHaveDraweView,
    isMenuOpen,
    isFolderOpen,
    handleHideFolder,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter,
    setMargin,
    isSizeOfFoldersMoreThanSize,
    setIsSizeOfFoldersMoreThanSize
  };

  useEffect(() => {
    handleChangeFolders(foldersArr);
  }, [labels, defaultFolderArr, events]);
  // useEffect(() => (!isFolderOpen && drawerWidth !== 0 ? handleDrawerWidth(0) : null), [isFolderOpen, drawerWidth]);

  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight });

  const NavContainer = isFoldersHaveDraweView ? SwipeableDrawer : Nav;

  const anchor = positionOfFolderViewWithPakeepViewIsRight ? 'right' : 'left';

  const onOpen: ReactEventHandler<any> = e => console.log('onOpen');

  const navContainerProps = isFoldersHaveDraweView
    ? { anchor, open: isMenuOpen, onClose: handleCloseFoldersWithDrawerView, onOpen }
    : {};

  return (
    <Grid
      container
      className={classes.container}
      wrap={'nowrap'}
      alignItems={'center'}
      direction={positionOfFolderViewWithPakeepViewIsBottom ? 'column-reverse' : 'row'}
    >
      {/* {!isFolderOpen && (
        <Grid className={classes.arrowButton}>
          <IconButton onClick={() => setIsFolderOpen(true)} size={'small'}>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Grid>
      )} */}
      {
        //@ts-ignore
        <NavContainer
          {...navContainerProps}
          style={{
            minWidth: drawerWidth,
            marginLeft: isSizeOfFoldersMoreThanSize && positionOfFolderViewWithPakeepViewIsBottom ? margin : 0,
            display: 'flex',
            // width:'100%',
            marginRight: positionOfFolderViewWithPakeepViewIsRight ? marginValue : 0
          }}
        >
          <Folders {...foldersProps} />
        </NavContainer>
      }
      <Grid
        item
        style={{
          width: '100%',
          marginLeft: positionOfFolderViewWithPakeepViewIsLeft ? drawerWidth + marginValue : 0,
          marginRight: positionOfFolderViewWithPakeepViewIsRight ? drawerWidth + marginValue : 0,
          transition: 'all 0.4s ease 0s'
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default FolderLayout;

const Nav: FC<any> = ({ children, ...props }) => <nav {...props}>{children}</nav>;
