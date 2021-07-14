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
import LockButton from 'components/Header/components/ViewLikeInTelegram/components/LockButton';

const useStyles = makeStyles(
  ({ palette: { secondary, text }, shape: { borderRadius }, typography: { button }, spacing }) => ({
    container: ({
      folderDimensions: {
        container,
        buttonGroup: { marginBottom, labelHeight },
        buttonItem: { defaultWidth, height, extendedWidth }
      },
      folderColor,
      isFolderOpen,
      isFolderExtended,
      isButtonIsOpenMore
    }: USeStylesOfFolderButtonGroupByPasType) => ({
      ...container,
      marginBottom: isButtonIsOpenMore ? 0 : marginBottom,

      '& legend': {
        display: 'flex',
        alignItems: 'center',
        ' & p': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        height: labelHeight,
        color: text.hint,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        minWidth: defaultWidth,

        maxWidth: isFolderExtended ? extendedWidth : defaultWidth,
        padding: spacing(0, 0.8, 0, 0.8),
        border: '1px solid',
        borderColor: useAlpha(text.primary, 0.2),
        borderBottomWidth: 0
      },
      '&  .buttonWrapperOfFolderItem': {
        position: 'relative',
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
          paddingRight: spacing(0.8),
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

      '& .folderItemWithAdditionalArrowButtonVisible': {
        '& p': {
          // margin:10,
          paddingRight: `${spacing(4)}px !important`
        }
      },

      '& .lastFolderItem': {
        margin: 0,
        borderBottomColor: useAlpha(text.primary, 0.2),

        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius
      },
      '& .firstFolderItem': {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius
      },

      '& .dashedFolderItem': {
        borderRadius: 0,
        borderTopStyle: !isFolderExtended ? 'solid' : 'dashed',
        '&:hover': {
          borderTopStyle: 'solid'
        }
      },
      '& .folderArrHaveOnlyOneItem': {
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius
      },
      '& .additionalArrowButton': {
        position: 'absolute',
        right: 0
      },
      '& .selectedFolderItem': {
        '& svg,p': {
          color: `${folderColor} !important`
        },
        borderStyle: 'solid',

        background: useAlpha(folderColor, 0.2),
        borderColor: `${useAlpha(folderColor, 1)} !important`
      }
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
  const isButtonIsOpenMore = folder.id === 'OPEN_MORE';

  const classes = useStyles({ folderDimensions, isFolderOpen, isFolderExtended, folderColor, isButtonIsOpenMore });

  const [additionalMenuId, setAdditionalMenuId] = useState('');
  const handelOpenAdditionalMenu: HandelOpenAdditionalMenuType = id => {
    setAdditionalMenuId(id);
  };
  if (!folder.arr.length) return null;

  return (
    <Grid container className={classes.container} direction={'column'}>
      {!!folder?.label && !!isFolderExtended && (
        <Typography component={'legend'}>
          <p> {folder.label}</p>
        </Typography>
      )}

      {folder.arr.map(({ iconName, id, title, ...defaultFolderItemProps }, idx) => {
        const [icon] = useTakeIcon(iconName);

        const { isFirst, isFolderArrHaveOnlyOneItem, isLast, isSelected } = useFindFolderItemPropertyies(
          id,
          idx,
          globalFolderId,
          folder.arr.length
        );
        // console.log(additionalMenuId,defaultFolderItemProps.property.additionalArr)

        const onClick = useFindCorrectFolderFunc({
          ...defaultUseFindCorrectFolderFuncProps,
          ...defaultFolderItemProps,
          handelOpenAdditionalMenu,
          id
        });
        // console.log(defaultFolderItemProps.property.additionalArr);

        const isAdditionalArrowButtonVisible = isFolderExtended && defaultFolderItemProps.property.additionalArr;

        return (
          <Grid item key={`folder_${id}`}>
            <Grid
              container
              className={clsx(
                'folderItem',
                isFolderArrHaveOnlyOneItem ? 'folderArrHaveOnlyOneItem' : '',
                isSelected ? 'selectedFolderItem' : '',
                isLast ? 'lastFolderItem' : '',
                isAdditionalArrowButtonVisible ? 'folderItemWithAdditionalArrowButtonVisible' : '',
                isFirst ? (!!folder.label && isFolderExtended ? 'dashedFolderItem' : 'firstFolderItem') : ''
              )}
              alignItems={'center'}
            >
              <Button className={'buttonWrapperOfFolderItem'} onClick={onClick}>
                <Grid container justify={isFolderExtended ? 'flex-start' : 'center'} wrap={'nowrap'}>
                  {icon}
                  {isFolderExtended && <Typography>{title}</Typography>}
                  {isAdditionalArrowButtonVisible && (
                    <Grid className={'additionalArrowButton'}>
                      {!!additionalMenuId ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}
                    </Grid>
                  )}
                </Grid>
              </Button>
            </Grid>
          </Grid>
        );
      })}
      {/* <Grid item>
        <Grid container className={clsx('folderItem')} alignItems={'center'}>
          <Button className={'buttonWrapperOfFolderItem'}>
            <Grid container justify={isFolderExtended ? 'flex-start' : 'center'} wrap={'nowrap'}>
              <LockButton />
            </Grid>
          </Button>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default FolderButtonGroupByPas;
