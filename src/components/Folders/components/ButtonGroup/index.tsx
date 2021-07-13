import clsx from 'clsx';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { FC, useState } from 'react';
import {
  FolderButtonGroupByPasPropsType,
  HandelOpenAdditionalMenuType,
  USeStylesOfFolderButtonGroupByPasType
} from './types';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useFindCorrectFolderFunc } from 'hooks/useFindCorrectFolderFunc.hook';
import { useFindFolderItemPropertyies } from 'hooks/useFindFolderItemPropertyies';

const useStyles = makeStyles(
  ({ palette: { secondary, text }, shape: { borderRadius }, typography: { button }, spacing }) => ({
    container: ({
      folderDimensions: {
        buttonGroup: { marginBottom },
        buttonItem: { defaultWidth, height, extendedWidth }
      },
      folderColor,
      isFolderOpen,
      isFolderExtended
    }: USeStylesOfFolderButtonGroupByPasType) => ({
      marginBottom,

      '&  .buttonWrapperOfFolderItem': {
        width: '100%',
        height: '100%',
        padding: 0,
        minWidth: 0,
        minHeight: 0
      },
      '& .folderItem': {
        minWidth: defaultWidth,
        maxWidth: isFolderExtended ? extendedWidth : defaultWidth,
        '& svg,p': {
          color: text.hint
        },
        '&  svg': {
          margin: isFolderExtended ? spacing(0, 0.8, 0, 1.2) : 0
        },
        '& p': {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          ...button
        },
        // maxWidth: isFolderExtended ? 'auto' : defaultWidth,
        height,
        borderRadius: 0,
        border: '2px solid',
        borderColor: useAlpha(text.primary, 0.2),
        borderBottomColor: 'transparent',

        '&:hover': {
          borderColor: text.secondary,
          '& svg,p': {
            color: text.primary
          }
        }
      },
      '& .selectedFolderItem': {
        '& svg,p': {
          color: `${folderColor} !important`
        },
        background: useAlpha(folderColor, 0.2),
        borderColor: `${useAlpha(folderColor, 1)} !important`
      },
      '& .lastFolderItem': {
        borderBottomColor: useAlpha(text.primary, 0.2),

        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius
      },
      '& .firstFolderItem': {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius
      },
      '& .folderArrHaveOnlyOneItem': { borderRadius }
    })
  })
);
const FolderButtonGroupByPas: FC<FolderButtonGroupByPasPropsType> = ({
  folder,
  folderDimensions,
  setAditionalFoldersHeigthObj,
  aditionalFoldersHeigthObj,
  isFolderOpen,
  isFolderExtended,
  folderColor,
  globalFolderId,

  ...defaultUseFindCorrectFolderFuncProps
}) => {
  const classes = useStyles({ folderDimensions, isFolderOpen, isFolderExtended, folderColor });

  const [additionalMenuId, setAdditionalMenuId] = useState('');

  const handelOpenAdditionalMenu: HandelOpenAdditionalMenuType = id => {
    setAdditionalMenuId(id);
  };
  if (!folder.arr.length) return null;

  return (
    <Grid container className={classes.container} direction={'column'}>
      {folder.arr.map(({ iconName, id, title, ...defaultFolderItemProps }, idx) => {
        const [icon] = useTakeIcon(iconName);

        const { isFirst, isFolderArrHaveOnlyOneItem, isLast, isSelected } = useFindFolderItemPropertyies(
          id,
          idx,
          globalFolderId,
          folder.arr.length
        );

        const onClick = useFindCorrectFolderFunc({
          ...defaultUseFindCorrectFolderFuncProps,
          ...defaultFolderItemProps,
          handelOpenAdditionalMenu,
          id
        });

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
              alignItems={'center'}
            >
              <Button className={'buttonWrapperOfFolderItem'} onClick={onClick}>
                <Grid container justify={isFolderExtended ? 'flex-start' : 'center'} wrap={'nowrap'}>
                  {icon}
                  {isFolderExtended && <Typography>{title}</Typography>}
                </Grid>
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FolderButtonGroupByPas;
