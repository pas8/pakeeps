import { OnClickOfFolderButtonType, UseFindCorrectFolderFuncType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useRouter } from 'next/dist/client/router';

export const useFindCorrectFolderFunc: UseFindCorrectFolderFuncType = ({
  property,
  handleChangeFolderColor,
  handleChangeGlobalFolderId,
  color,
  id,
  handelOpenAdditionalMenu
}) => {
  const router = useRouter();

  const folderProperties = {
    isPropertyDefault: AdditionalFolderPropertyNames.DEFAULT === property.value,
    isPropertyIsOnClick: AdditionalFolderPropertyNames.ON_CLICK === property.value,
    isPropertyHaveAdditionalArr: AdditionalFolderPropertyNames.ADDITIONAL_ARR === property.value,
    isPropertyIsRoute: AdditionalFolderPropertyNames.ROUTE === property.value,
    isPropertyIsDefaultAndRoute: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE === property.value
  };
  const onClick: OnClickOfFolderButtonType = e => {
    handleChangeFolderColor(color);

    if (folderProperties.isPropertyDefault) return handleChangeGlobalFolderId(id);
    else if (folderProperties.isPropertyHaveAdditionalArr)
      return handelOpenAdditionalMenu && handelOpenAdditionalMenu(id);
    else if (folderProperties.isPropertyIsOnClick) return !!property?.onClick && property?.onClick(e);
    else if (folderProperties.isPropertyIsRoute) return router.push(property?.route!);
    else if (folderProperties.isPropertyIsDefaultAndRoute) {
      router.push(property?.route!);
      return handleChangeGlobalFolderId(id);
    }
  };

  return onClick;
};
