import clsx from 'clsx';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { AdditionalFolderPropertyNames } from 'models/unums';
import { useRouter } from 'next/dist/client/router';
import { FC, MouseEvent, MouseEventHandler, useState } from 'react';
import { FolderButtonGroupByPasPropsType, USeStylesOfFolderButtonGroupByPasType } from './types';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FolderAdditionalArrPropertyType } from 'store/modules/App/types';

const useStyles = makeStyles(
  ({ palette: { secondary, text }, shape: { borderRadius }, typography: { h6, button } }) => ({
    container: ({
      folderDimensions: {
        buttonGroup: { marginBottom },
        buttonItem: { defaultWidth, height }
      },
      folderColor
    }: USeStylesOfFolderButtonGroupByPasType) => ({
      marginBottom,
      '& .folderItem': {
        '& svg': {
          ...h6
        },
        '& p': {
          ...button
        },
        minWidth: defaultWidth,
        height,
        borderRadius,
        border: '1px solid',
        borderColor: useAlpha(text.primary, 0.2)
      },
      '& .selectedFolderItem': {
        borderColor: `${useAlpha(folderColor, 0.2)} !important`
      },
      '& .lastFolderItem': {
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px '
      },
      '& .firstFolderItem': {
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px '
      },
      '& .folderArrHaveOnlyOneItem': { borderRadius }
    })
  })
);
const FolderButtonGroupByPas: FC<FolderButtonGroupByPasPropsType> = ({
  folder,
  folderDimensions,
  isFolderOpen,
  isFolderExtended,
  folderColor,
  globalFolderId,
  handleChangeGlobalFolderId,
  handleChangeFolderColor
}) => {
  const classes = useStyles({ folderDimensions, isFolderOpen, isFolderExtended, folderColor });
  const router = useRouter();

  const [additionalMenuState, setAdditionalMenuState] = useState({
    top: 0,
    left: 0,
    arr: [] as FolderAdditionalArrPropertyType
  });

  const handelOpenAdditionalMenuState = (
    { clientX: left, clientY: top }: MouseEvent<HTMLElement>,
    arr: FolderAdditionalArrPropertyType
  ) => {
    setAdditionalMenuState({ left, top, arr });
  };

  return (
    <Grid container className={classes.container}>
      {folder.arr.map(({ color, iconName, id, property, title }, idx) => {
        const [icon] = useTakeIcon(iconName);

        const isSelected = id === globalFolderId;
        const isLast = folder.arr.length === idx + 1;
        const isFirst = idx === 0;
        const isFolderArrHaveOnlyOneItem = folder.arr.length === 1;

        console.log(property.value);
        const isPropertyDefault = AdditionalFolderPropertyNames.DEFAULT === property.value;
        const isPropertyIsOnClick = AdditionalFolderPropertyNames.ON_CLICK === property.value;
        const isPropertyHaveAdditionalArr = AdditionalFolderPropertyNames.ADDITIONAL_ARR === property.value;
        const isPropertyIsRoute = AdditionalFolderPropertyNames.ROUTE === property.value;
        const isPropertyIsDefaultAndRoute = AdditionalFolderPropertyNames.DEFAULT_AND_ROUTE === property.value;

        const onClick: MouseEventHandler<HTMLElement> = e => {
          handleChangeFolderColor(color);

          if (isPropertyDefault) return handleChangeGlobalFolderId(id);
          else if (isPropertyHaveAdditionalArr) return handelOpenAdditionalMenuState(e, property?.additionalArr!);
          else if (isPropertyIsOnClick) return !!property?.onClick && property?.onClick(e);
          else if (isPropertyIsRoute) return router.push(property?.route!);
          else if (isPropertyIsDefaultAndRoute) {
            router.push(property?.route!);
            return handleChangeGlobalFolderId(id);
          }
        };

        return (
          <Grid item key={`folder_${id}`}>
            <Grid
              container
              className={clsx(
                'folderItem',
                isFolderArrHaveOnlyOneItem ? 'folderArrHaveOnlyOneItem' : '',
                isSelected ? 'selectedFolderItem' : '',
                isLast ? 'lastFolderItem' : '',
                isFirst ? 'firstFolderItem' : ''
              )}
              justify={isFolderExtended ? 'flex-start' : 'center'}
              alignItems={'center'}
              onClick={onClick}
            >
              {icon}
              {isFolderExtended && <Typography>{title}</Typography>}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FolderButtonGroupByPas;
