import { Grid, IconButton, makeStyles } from '@material-ui/core';
import Folders from 'components/Folders';
import { useFolders } from 'hooks/useFolders.hook';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect, useRef } from 'react';
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
  getDefaultFolderArr
} from 'store/modules/App/selectors';
import {
  getIsFolderViewWithPakeepViewAlignToCenter,
  getNavigationViewLike,
  getPositionOfFolderViewWithPakeepView
} from 'store/modules/Settings/selectors';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { AllElementsIsBooleanType, LayoutChildrenType } from 'models/types';
import { toChangeFolders, toSetCurrentFolderPropertyIdx, toSetDrawerWidth } from 'store/modules/App/actions';
import { DrawerWidthType, FoldersType } from 'store/modules/App/types';
import { HandleChangeOfFolders } from 'components/Folders/types';

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
  const defaultFolderArr = useSelector(getDefaultFolderArr);

  const isMenuOpen = useSelector(getMenuOpenStatus);
  const drawerWidth = useSelector(getDrawerWidth);

  const positionOfFolderViewWithPakeepView = useSelector(getPositionOfFolderViewWithPakeepView);
  const isFolderViewWithPakeepViewAlignToCenter = useSelector(getIsFolderViewWithPakeepViewAlignToCenter);

  const positionOfFolderViewWithPakeepViewIsBottom = positionOfFolderViewWithPakeepView === 'bottom';
  const positionOfFolderViewWithPakeepViewIsRight = positionOfFolderViewWithPakeepView === 'right';
  const positionOfFolderViewWithPakeepViewIsLeft = positionOfFolderViewWithPakeepView === 'left';

  const foldersArr = useFolders({ labels, defaultFolderArr });
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const marginValue = 8;

  const handleChange: HandleChangeOfFolders = (__, idx) => {
    handleCurrentFolderPropertyIdx(idx);
  };
  const handleHideFolder = () => setIsFolderOpen(false);

  const [margin, setMargin] = useState(0);
  const [isSizeOfFoldersMoreThanSize, setIsSizeOfFoldersMoreThanSize] = useState(false);

  const foldersProps = {
    handleChange,
    value: currentFolderPropertyIdx,
    handleDrawerWidth,
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

  useEffect(() => handleChangeFolders(foldersArr), [labels, defaultFolderArr]);
  // useEffect(() => (!isFolderOpen && drawerWidth !== 0 ? handleDrawerWidth(0) : null), [isFolderOpen, drawerWidth]);

  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight });

const ref = useRef<HTMLDivElement>(null)

// useEffect(()=>{



  // offsetHeight
// 

// },[ref.current?.offsetHeight])

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
         ref={ref}
        style={{
          minWidth: drawerWidth,
          marginLeft: isSizeOfFoldersMoreThanSize && positionOfFolderViewWithPakeepViewIsBottom ? margin : 0,
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
