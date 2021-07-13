import { Grid, makeStyles, Slide, useTheme } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useMeasure, usePrevious, useSize, useWindowSize } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import _, { flatten, mapValues, startsWith } from 'lodash';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useAlpha } from 'hooks/useAlpha.hook';
import { getGlobalFolderId, getHeaderHeight } from 'store/modules/App/selectors';
import { FoldersTypeProps, HandleChangeFolderColorType, HandleChangeGlobalFolderIdType } from './types';
import MoreMenuOfFolders from './components/MoreMenu';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';
import { useRouter } from 'next/dist/client/router';

import { useValidateColor } from 'hooks/useValidateColor.hook';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

import { DEFAULT, PRIMARY, SECONDARY } from 'models/denotation';
import { useValidateFolderColor } from 'hooks/useValidateFolderColor.hook';
import FolderButtonGroupByPas from './components/ButtonGroup';
import { useTakeFoldersArr } from 'hooks/useTakeFoldersArr.hook';
import { toChangeGlobalFolderId } from 'store/modules/App/actions';
import { ColorType, GlobalFolderIdType } from 'store/modules/App/types';

const Folders: FC<FoldersTypeProps> = ({
  isFolderOpen,
  positionsOfFolder,
  isFolderExtended,
  ...defaultUseTakeFoldersArrProps
  // ...defaultFolderButtonGroupByPasProps
}) => {
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

  const headerHeight = useSelector(getHeaderHeight);

  const { ref, allFolders, folderDimensions, folderOrderNamesBefore, folderOrderNamesAfter } = useTakeFoldersArr({
    ...defaultUseTakeFoldersArrProps
  });

  const { isSizeSmall } = useBreakpointNames();

  const isFolderViewWithPakeepViewAlignToCenter = false;
  return (
    <Grid container>
      <Grid
        container
        ref={ref}
        justify={isFolderViewWithPakeepViewAlignToCenter ? 'center' : 'flex-start'}
        wrap={'nowrap'}
        direction={positionsOfFolder.isBottom ? 'row' : 'column'}
        // className={classes.containerOfFolderWithPakeepsView}
      >
        <Slide
          in={isFolderOpen || isFolderExtended}
          mountOnEnter
          unmountOnExit
          direction={positionsOfFolder.isBottom ? 'down' : positionsOfFolder.isRight ? 'left' : 'right'}
        >
          <Grid>
            {folderOrderNamesBefore.map(id => {
              const folder = allFolders[id];
              if (!folder) return null;
              const key = `FOLDER_BUTTON_GROUP_BY_PAS_${id}`;

              const folderButtonGroupByPasProps = {
                handleChangeGlobalFolderId,
                handleChangeFolderColor,
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
    </Grid>
  );
};

export default Folders;
