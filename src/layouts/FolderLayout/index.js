import { Grid, IconButton, makeStyles } from '@material-ui/core';
import Folders from 'components/Folders';
import { useFolders } from 'hooks/useFolders.hook';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  handleFoldersThunk,
  handleCurrentFolderPropertyIdxThunk,
  handleDrawerWidthThunk
} from 'store/modules/App/operations';
import {
  getCurrentFolderPropertyIdx,
  getFolders,
  getMenuOpenStatus,
  getDrawerWidth,
  getLabels,
  getDefaultFolderArr
} from 'store/modules/App/selectors';
import {
  getIsFolderViewWithPakeepViewAlignToCenter,
  getNavigationViewLike,
  getPositionOfFolderViewWithPakeepView
} from 'store/modules/Settings/selectors';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

const useStyles = makeStyles(({palette}) => ({
  container: ({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight }) => ({
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
  arrowButton: ({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight }) => ({
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

const FolderLayout = ({
  children,
  handleFoldersThunk,
  currentFolderPropertyIdx,
  handleCurrentFolderPropertyIdxThunk,
  folders,
  isMenuOpen,
  handleDrawerWidthThunk,
  drawerWidth,
  navigationViewLike,
  labels,
  positionOfFolderViewWithPakeepView,
  isFolderViewWithPakeepViewAlignToCenter,
  defaultFolderArr
}) => {
  const positionOfFolderViewWithPakeepViewIsBottom = positionOfFolderViewWithPakeepView === 'bottom';
  const positionOfFolderViewWithPakeepViewIsRight = positionOfFolderViewWithPakeepView === 'right';
  const positionOfFolderViewWithPakeepViewIsLeft = positionOfFolderViewWithPakeepView === 'left';

  const foldersArr = useFolders( { labels, defaultFolderArr });
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const marginValue = 8;

  const handleChange = (e, idx) => handleCurrentFolderPropertyIdxThunk(idx);
  const handleHideFolder = () => setIsFolderOpen(false);

  const [margin, setMargin] = useState(0);
  const [isSizeOfFoldersMoreThanSize, setIsSizeOfFoldersMoreThanSize] = useState(false);

  const foldersProps = {
    handleChange,
    folders,
    value: currentFolderPropertyIdx,
    handleDrawerWidthThunk,
    isMenuOpen,
    isFolderOpen,
    handleHideFolder,
    navigationViewLike,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter,
    setMargin,
    isSizeOfFoldersMoreThanSize,
    setIsSizeOfFoldersMoreThanSize
  };

  useEffect(() => handleFoldersThunk(foldersArr), [labels,defaultFolderArr]);
  useEffect(() => !isFolderOpen && drawerWidth !== 0 && handleDrawerWidthThunk(0), [isFolderOpen, drawerWidth]);

  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight });

  return (
    <Grid
      container
      className={classes.container}
      wrap={'nowrap'}
      alignItems={'center'}
      direction={positionOfFolderViewWithPakeepViewIsBottom ? 'column-reverse' : 'row'}
    >
      {!isFolderOpen && (
        <Grid className={classes.arrowButton}>
          <IconButton onClick={() => setIsFolderOpen(true)} size={'small'}>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Grid>
      )}
      <nav
        style={{
          minWidth: drawerWidth,
          marginLeft: isSizeOfFoldersMoreThanSize && positionOfFolderViewWithPakeepViewIsBottom && margin,
          display: 'flex',
          // width:'100%',
          marginRight: positionOfFolderViewWithPakeepViewIsRight ? marginValue : 0
        }}
      >
        <Folders {...foldersProps} />
      </nav>
      <Grid
        item
        style={{
          width: '100%',
          marginLeft: positionOfFolderViewWithPakeepViewIsLeft && drawerWidth + marginValue,
          marginRight: positionOfFolderViewWithPakeepViewIsRight && drawerWidth + marginValue,
          transition: 'all 0.4s ease 0s'
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

FolderLayout.propTypes = {
  children: PropTypes.any,
  currentFolderPropertyIdx: PropTypes.number,
  defaultFolderArr: PropTypes.array,
  drawerWidth: PropTypes.number,
  folders: PropTypes.array,
  handleCurrentFolderPropertyIdxThunk: PropTypes.func,
  handleDrawerWidthThunk: PropTypes.func,
  handleFoldersThunk: PropTypes.func,
  isFolderViewWithPakeepViewAlignToCenter: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  labels: PropTypes.array,
  navigationViewLike: PropTypes.any,
  positionOfFolderViewWithPakeepView: PropTypes.string
}

const mapStateToProps = ({
  app: {  currentFolderPropertyIdx, folders, isMenuOpen, drawerWidth, labels, defaultFolderArr },
  settings: { navigationViewLike, positionOfFolderViewWithPakeepView, isFolderViewWithPakeepViewAlignToCenter }
}) => ({
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders),
  defaultFolderArr: getDefaultFolderArr(defaultFolderArr),
  labels: getLabels(labels),
  isMenuOpen: getMenuOpenStatus(isMenuOpen),
  drawerWidth: getDrawerWidth(drawerWidth),

  navigationViewLike: getNavigationViewLike(navigationViewLike),
  positionOfFolderViewWithPakeepView: getPositionOfFolderViewWithPakeepView(positionOfFolderViewWithPakeepView),
  isFolderViewWithPakeepViewAlignToCenter: getIsFolderViewWithPakeepViewAlignToCenter(
    isFolderViewWithPakeepViewAlignToCenter
  )
});

const mapDispatchToProps = dispatch => ({
  handleFoldersThunk: foldersArr => dispatch(handleFoldersThunk(foldersArr)),
  handleDrawerWidthThunk: width => dispatch(handleDrawerWidthThunk(width)),
  handleCurrentFolderPropertyIdxThunk: idx => dispatch(handleCurrentFolderPropertyIdxThunk(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderLayout);
