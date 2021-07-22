import { CircularProgress, Grid, makeStyles, Paper, Slide } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useMeasure } from 'react-use';
import { Skeleton } from '@material-ui/lab';
import { FC, useEffect, useState } from 'react';
import { getGlobalFolderId, getHeaderHeight } from 'store/modules/App/selectors';
import { size, sum, values } from 'lodash';
import { DEFAULT } from 'models/denotation';

import { HandleOpenMoreFoldersType } from 'models/types';
import { useValidateFolderColor } from 'hooks/useValidateFolderColor.hook';
import { useTakeFoldersPropertyies } from 'hooks/useTakeFoldersPropertyies.hook';
import { toChangeGlobalFolderId, toSetDrawerWidth } from 'store/modules/App/actions';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { ColorType } from 'store/modules/App/types';
import { FoldersTypeProps, HandleChangeFolderColorType, HandleChangeGlobalFolderIdType } from './types';

const FolderButtonGroupByPas = dynamic(() => import('./components/ButtonGroup'), {
  loading: () => <Skeleton variant={'rect'} width={40} height={'60%'} style={{marginLeft:10}} animation={"wave"}/>
});

const MoreMenuOfFolders = dynamic(() => import('./components/MoreMenu'), {
  loading: () => (
    <Paper style={{ width: 200, height: 400 }}>
      <CircularProgress color={'primary'} />
    </Paper>
  )
});

const useStyles = makeStyles(({ spacing, transitions, breakpoints, palette }) => ({
  container: ({ height, isFolderAfterIsEmpty, isFoldersHaveDraweView }: any) => ({
    display: 'flex',
    justifyContent: isFolderAfterIsEmpty || isFoldersHaveDraweView ? 'flex-start' : 'space-between',
    flexDirection: 'column',
    height: `calc(100vh - ${height}px)`
  })
}));

const Folders: FC<FoldersTypeProps> = ({
  isFolderOpen,
  positionsOfFolder,
  isFolderExtended,
  isFoldersHaveDraweView,
  ...defaultUseTakeFoldersArrProps
}) => {
  const { isSizeSmall, isSiveIsXs } = useBreakpointNames();
  const headerHeight = useSelector(getHeaderHeight);

  const dispatch = useDispatch();
  const globalFolderId = useSelector(getGlobalFolderId);

  const [notValidatedFolderColor, setFolderColor] = useState<ColorType>(DEFAULT);
  const folderColor = useValidateFolderColor(notValidatedFolderColor);

  const handleChangeFolderColor: HandleChangeFolderColorType = color => {
    setFolderColor(color);
  };

  const handleChangeGlobalFolderId: HandleChangeGlobalFolderIdType = globalFolderId => {
    dispatch(toChangeGlobalFolderId({ globalFolderId }));
  };

  const nullityOfMoreFoldersMenuCordinates = { top: 0, left: 0 };
  const [moreFoldersMenuCordinates, setMoreFoldersMenuCordinates] = useState(nullityOfMoreFoldersMenuCordinates);

  const isMoreFoldersMenuOpen = !!sum(values(moreFoldersMenuCordinates));

  const handleOpenMoreFolders: HandleOpenMoreFoldersType = ({ clientX: left, clientY: top }) => {
    setMoreFoldersMenuCordinates({ left, top });
  };

  const onClose = (e: any) => {
    setMoreFoldersMenuCordinates(nullityOfMoreFoldersMenuCordinates);
  };

  const [aditionalFoldersHeigthObj, setAditionalFoldersHeigthObj] = useState({});

  const { folderDimensions, folderOrderNames, foldersAfter, foldersBefore } = useTakeFoldersPropertyies({
    ...defaultUseTakeFoldersArrProps,
    aditionalFoldersHeigthObj,
    isFoldersHaveDraweView,
    handleOpenMoreFolders
  });

  const isFolderAfterIsEmpty = !size(foldersAfter);

  const isFolderViewWithPakeepViewAlignToCenter = false;

  const defaultFoldersProps = {
    handleChangeGlobalFolderId,
    handleChangeFolderColor
  };

  const [ref, { width: drawerWidth }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (isFoldersHaveDraweView) {
      dispatch(toSetDrawerWidth({ drawerWidth: 0 }));
      return;
    }
    dispatch(toSetDrawerWidth({ drawerWidth: drawerWidth }));
  }, [drawerWidth]);

  const moreMenuOfFoldersProps = {
    ...moreFoldersMenuCordinates,
    ...defaultFoldersProps,
    folderOrderNames,
    globalFolderId,
    foldersAfter,
    onClose
  };
  const classes = useStyles({
    height: headerHeight + folderDimensions.container.paddingBottom,
    isFolderAfterIsEmpty,
    isFoldersHaveDraweView
  });

  return (
    <Grid ref={ref}>
      <Grid
      // container
      // justify={isFolderViewWithPakeepViewAlignToCenter ? 'center' : 'flex-start'}
      // wrap={'nowrap'}
      // direction={positionsOfFolder.isBottom ? 'row' : 'column'}
      >
        <Slide
          in={true}
          mountOnEnter
          unmountOnExit
          direction={positionsOfFolder.isBottom ? 'down' : positionsOfFolder.isRight ? 'left' : 'right'}
        >
          <Grid className={classes.container}>
            {folderOrderNames.map(id => {
              const folder = isSizeSmall ? { ...foldersBefore, ...foldersAfter }[id] : foldersBefore[id];

              if (!folder) return null;
              const key = `FOLDER_BUTTON_GROUP_BY_PAS_${id}`;

              const folderButtonGroupByPasProps = {
                setAditionalFoldersHeigthObj,
                aditionalFoldersHeigthObj,
                isFoldersHaveDraweView,
                ...defaultFoldersProps,
                folderDimensions,
                isFolderExtended,
                globalFolderId,
                isFolderOpen,
                folderColor,
                folder,
                key
              };

              return <FolderButtonGroupByPas {...folderButtonGroupByPasProps} />;
            })}
          </Grid>
        </Slide>
      </Grid>
      {isMoreFoldersMenuOpen && <MoreMenuOfFolders {...moreMenuOfFoldersProps} />}
    </Grid>
  );
};

export default Folders;
