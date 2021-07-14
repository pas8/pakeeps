import { Grid, makeStyles, Slide } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { getGlobalFolderId, getHeaderHeight } from 'store/modules/App/selectors';
import { size, sum, values } from 'lodash';
import { DEFAULT } from 'models/denotation';
import { HandleOpenMoreFoldersType } from 'models/types';
import { useValidateFolderColor } from 'hooks/useValidateFolderColor.hook';
import { useTakeFoldersArr } from 'hooks/useTakeFoldersArr.hook';
import { toChangeGlobalFolderId, toSetDrawerWidth } from 'store/modules/App/actions';
import { ColorType } from 'store/modules/App/types';
import { FoldersTypeProps, HandleChangeFolderColorType, HandleChangeGlobalFolderIdType } from './types';
import FolderButtonGroupByPas from './components/ButtonGroup';
import MoreMenuOfFolders from './components/MoreMenu';
import { useMeasure } from 'react-use';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

const useStyles = makeStyles(({ spacing, transitions, breakpoints, palette }) => ({
  container: ({ height, isFolderAfterIsEmpty }: any) => ({
    display: 'flex',
    justifyContent: isFolderAfterIsEmpty ? 'flex-start' : 'space-between',
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
  const { isSizeSmall } = useBreakpointNames();
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

  const { folderDimensions, folderOrderNames, foldersAfter, foldersBefore } = useTakeFoldersArr({
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
    if (isSizeSmall) {
      dispatch(toSetDrawerWidth({ drawerWidth: 0 }));
      return;
    }

    dispatch(toSetDrawerWidth({ drawerWidth: drawerWidth }));
  }, [drawerWidth, isSizeSmall]);

  const moreMenuOfFoldersProps = {
    ...moreFoldersMenuCordinates,
    ...defaultFoldersProps,
    folderOrderNames,
    globalFolderId,
    foldersAfter,
    onClose
  };
  const classes = useStyles({ height: headerHeight + folderDimensions.container.paddingBottom, isFolderAfterIsEmpty });

  return (
    <Grid ref={ref}>
      <Grid
        // container
        justify={isFolderViewWithPakeepViewAlignToCenter ? 'center' : 'flex-start'}
        wrap={'nowrap'}
        direction={positionsOfFolder.isBottom ? 'row' : 'column'}
      >
        <Slide
          in={true}
          mountOnEnter
          unmountOnExit
          direction={positionsOfFolder.isBottom ? 'down' : positionsOfFolder.isRight ? 'left' : 'right'}
        >
          <Grid className={classes.container}>
            {folderOrderNames.map(id => {
              const folder = foldersBefore[id];
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
