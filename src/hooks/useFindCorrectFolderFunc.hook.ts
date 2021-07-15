import { OnClickOfFolderButtonType, UseFindCorrectFolderFuncType } from 'models/types';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useRouter } from 'next/dist/client/router';

export const useFindCorrectFolderFunc: UseFindCorrectFolderFuncType = ({
  property,
  handleChangeFolderColor,
  handleChangeGlobalFolderId,
  color,
  isAdditionalButtonsVisible,
  id,
  handelOpenAdditionalMenu
}) => {
  const router = useRouter();

  const arrLength = !!property.additionalArr?.length ? property.additionalArr?.length : 0;

  const folderProperties = {
    isPropertyDefault: AdditionalFolderPropertyNames.DEFAULT === property.value,
    isPropertyIsOnClick: AdditionalFolderPropertyNames.ON_CLICK === property.value,
    isPropertyIsCustomComponent: AdditionalFolderPropertyNames.CUSTOM_COMPONENT === property.value,
    isPropertyIsRoute: AdditionalFolderPropertyNames.ROUTE === property.value,
    isPropertyIsDefaultAndRoute: AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE === property.value
  };
  const defaultOnClick: OnClickOfFolderButtonType = e => {
    // !!arrLength && handelOpenAdditionalMenu && handelOpenAdditionalMenu({ id, arrLength });

    handleChangeFolderColor(color);

    if (folderProperties.isPropertyDefault || folderProperties.isPropertyIsDefaultAndRoute)
      return handleChangeGlobalFolderId(id);
    else if (folderProperties.isPropertyIsOnClick || folderProperties.isPropertyIsCustomComponent)
      return !!property?.onClick && property?.onClick(e);
  };
  const routeOnClick: OnClickOfFolderButtonType = e => {
    handleChangeFolderColor(color);
    e.preventDefault();
    const routesIsNotTheSame = property?.route! !== router.pathname;

    const nullityOfAdditionMenu = { id: '', arrLength: 0 };

    const additionalMenuProperties =
      isAdditionalButtonsVisible || routesIsNotTheSame ? nullityOfAdditionMenu : { id, arrLength };

    if (!!handelOpenAdditionalMenu) {
      !!arrLength && handelOpenAdditionalMenu(additionalMenuProperties);
      routesIsNotTheSame && handelOpenAdditionalMenu(nullityOfAdditionMenu);
    }
    router.push(property?.route!);
    handleChangeGlobalFolderId(id);
  };

  const routePropertyies =
    (folderProperties.isPropertyIsRoute || folderProperties.isPropertyIsDefaultAndRoute) && !!property?.route
      ? {
          route: property?.route,
          onClick: routeOnClick
        }
      : { onClick: defaultOnClick, route: false as false };

  return routePropertyies;
};
