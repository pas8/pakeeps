import { useMeasure } from 'react-use';
import { Grid, SwipeableDrawer } from '@material-ui/core';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuOpenStatus } from 'store/modules/App/selectors';
import { getPositionOfFolderViewWithPakeepView } from 'store/modules/Settings/selectors';
import { toChangeMenuOpenStatus, toSetDrawerWidth } from 'store/modules/App/actions';
import { menuOpenStatusDenotation } from 'models/denotation';
import Folders from 'components/Folders';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

const FolderLayout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { isSizeSmall } = useBreakpointNames();
  const positionOfFolderViewWithPakeepView = useSelector(getPositionOfFolderViewWithPakeepView);

  const menuOpenStatus = useSelector(getMenuOpenStatus);

  const isFolderExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;
  const isFolderOpen = menuOpenStatus === menuOpenStatusDenotation.OPEN;

  const positionsOfFolder = {
    isBottom: positionOfFolderViewWithPakeepView === 'bottom',
    isRight: positionOfFolderViewWithPakeepView === 'right',
    isLeft: positionOfFolderViewWithPakeepView === 'left'
  };

  const isFoldersHaveDraweView = isSizeSmall && (isFolderOpen || isFolderExtended);

  const handleCloseFoldersWithDrawerView = () => {
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus: menuOpenStatusDenotation.OPEN }));
  };

  const foldersProps = {
    handleCloseFoldersWithDrawerView,
    isFoldersHaveDraweView,
    isFolderExtended,
    positionsOfFolder,
    isFolderOpen
  };

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const NavContainer = isFoldersHaveDraweView ? SwipeableDrawer : Nav;
  const anchor = positionsOfFolder.isRight ? 'right' : 'left';

  const navContainerProps = isFoldersHaveDraweView
    ? { anchor, open: isFolderExtended, onClose: handleCloseFoldersWithDrawerView }
    : {};

  return (
    <Grid container>
      <Grid ref={ref}>
        {(isFolderExtended || isFolderOpen) && (
          //@ts-ignore
          <NavContainer {...navContainerProps}>
            <Folders {...foldersProps} />
          </NavContainer>
        )}
      </Grid>
      <Grid style={{ width: `calc(100% - ${width}px - 16px`, marginLeft: 16 }}>{children}</Grid>
    </Grid>
  );
};

export default FolderLayout;

const Nav: FC<any> = ({ children, ...props }) => <nav {...props}>{children}</nav>;
