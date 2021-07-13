import { Grid, Slide } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useState } from 'react';
import { getGlobalFolderId } from 'store/modules/App/selectors';
import { DEFAULT } from 'models/denotation';
import { useValidateFolderColor } from 'hooks/useValidateFolderColor.hook';
import { useTakeFoldersArr } from 'hooks/useTakeFoldersArr.hook';
import { toChangeGlobalFolderId } from 'store/modules/App/actions';
import { ColorType } from 'store/modules/App/types';
import { FoldersTypeProps, HandleChangeFolderColorType, HandleChangeGlobalFolderIdType } from './types';
import FolderButtonGroupByPas from './components/ButtonGroup';

const Folders: FC<FoldersTypeProps> = ({
  isFolderOpen,
  positionsOfFolder,
  isFolderExtended,
  ...defaultUseTakeFoldersArrProps
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

  const { folderDimensions, folderOrderNames, foldersAfter, foldersBefore } = useTakeFoldersArr({
    ...defaultUseTakeFoldersArrProps
  });

  const isFolderViewWithPakeepViewAlignToCenter = false;
  return (
    <Grid>
      <Grid
        container
        justify={isFolderViewWithPakeepViewAlignToCenter ? 'center' : 'flex-start'}
        wrap={'nowrap'}
        direction={positionsOfFolder.isBottom ? 'row' : 'column'}
      >
        <Slide
          in={isFolderOpen || isFolderExtended}
          mountOnEnter
          unmountOnExit
          direction={positionsOfFolder.isBottom ? 'down' : positionsOfFolder.isRight ? 'left' : 'right'}
        >
          <Grid>
            {folderOrderNames.map(id => {
              const folder = foldersBefore[id];
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
