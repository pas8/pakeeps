import { Grid, IconButton, makeStyles, SwipeableDrawer } from '@material-ui/core';
import Folders from 'components/Folders';
import { usePakeepFolders } from 'hooks/usePakeepFolders.hook';
import PropTypes from 'prop-types';
import { useState, useEffect, ReactEventHandler, FC } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
  getMenuOpenStatus,
  getDrawerWidth,
  getLabels,
  getGlobalEventsArr,
  getGlobalFolderId
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
  toChangeGlobalFolderId,
  toChangeMenuOpenStatus,
  toSetDrawerWidth
} from 'store/modules/App/actions';
import { DrawerWidthType, FoldersType, GlobalFolderIdType } from 'store/modules/App/types';
import { HandleChangeOfFolders } from 'components/Folders/types';
import { menuOpenStatusDenotation } from 'models/denotation';
import { useRouter } from 'next/dist/client/router';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

const useStyles = makeStyles(({ palette }) => ({
  container: ({ IsBottom, IsRight }: AllElementsIsBooleanType) => ({
    // justifyContent: IsBottom && 'center',
    '& nav': IsBottom
      ? {
          zIndex: 92,
          position: 'fixed',
          bottom: 0
        }
      : {
          position: 'fixed',
          bottom: 0,
          top: 0,
          [IsRight ? 'right' : 'left']: 0
        }
  }),
  arrowButton: ({ IsBottom, IsRight }: AllElementsIsBooleanType) => ({
    zIndex: 96,
    position: 'fixed',
    bottom: IsBottom ? 0 : '50%',
    [IsRight ? 'right' : 'left']: IsBottom ? '50%' : 0,
    transform: `rotate(${IsBottom ? 270 : IsRight ? 180 : 0}deg)`,
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

  const { isSizeSmall } = useBreakpointNames();

  const handleDrawerWidth = (drawerWidth: number) => {
    dispatch(toSetDrawerWidth({ drawerWidth }));
  };

  const menuOpenStatus = useSelector(getMenuOpenStatus);

  const isFolderExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;
  const isFolderOpen = menuOpenStatus === menuOpenStatusDenotation.OPEN;

  const drawerWidth = useSelector(getDrawerWidth);

  const positionOfFolderViewWithPakeepView = useSelector(getPositionOfFolderViewWithPakeepView);

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
    handleDrawerWidth,
    isFoldersHaveDraweView,
    isFolderExtended,
    // drawerWidth,
    positionsOfFolder,
    isFolderOpen
  };

  const classes = useStyles(positionsOfFolder);

  const NavContainer = isFoldersHaveDraweView ? SwipeableDrawer : Nav;
  const anchor = positionsOfFolder.isRight ? 'right' : 'left';

  const navContainerProps = isFoldersHaveDraweView
    ? { anchor, open: isFolderExtended, onClose: handleCloseFoldersWithDrawerView }
    : {};

  return (
    <Grid
      container
      className={classes.container}
      wrap={'nowrap'}
      alignItems={'center'}
      direction={positionsOfFolder.isBottom ? 'column-reverse' : 'row'}
    >
      {
        //@ts-ignore
        <NavContainer
          {...navContainerProps}
          style={{
            minWidth: drawerWidth,
            marginLeft: positionsOfFolder.isBottom ? 0 : 0,
            display: 'flex',
            // width:'100%',
            marginRight: positionsOfFolder.isRight ? 10 : 0
          }}
        >
          <Folders {...foldersProps} />
        </NavContainer>
      }

      <Grid
        item
        style={{
          width: '100%',
          marginLeft: positionsOfFolder.isLeft ? drawerWidth + 10 : 0,
          marginRight: positionsOfFolder.isRight ? drawerWidth + 10 : 0,
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
