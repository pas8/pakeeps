import clsx from 'clsx';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';

import { useAlpha } from 'hooks/useAlpha.hook';
import { useFindCorrectFolderFunc } from 'hooks/useFindCorrectFolderFunc.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useFindFolderItemPropertyies } from 'hooks/useFindFolderItemPropertyies';
import { getAdditionalMenuState, getHeaderHeight } from 'store/modules/App/selectors';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import FolderItem from './components/FolderItem';
import {
  FolderButtonGroupByPasPropsType,
  HandelOpenAdditionalMenuType,
  USeStylesOfFolderButtonGroupByPasType
} from './types';

const useStyles = makeStyles(
  ({ palette: { secondary, text }, shape: { borderRadius }, typography: { button, subtitle2 }, spacing }) => ({
    containerWithOutDrawerViewItem: ({
      folderDimensions: {
        container,
        buttonGroup: { marginBottom }
      },
      isButtonIsOpenMore
    }: USeStylesOfFolderButtonGroupByPasType) => ({
      marginBottom: isButtonIsOpenMore ? 0 : marginBottom,
      ...container
    }),
    container: ({
      folderDimensions: {
        buttonGroup: { marginBottom, labelHeight },
        buttonItem: { defaultWidth, height, extendedWidth }
      },
      folderColor,
      isFolderOpen,
      isFolderExtended,
      isButtonIsOpenMore
    }: USeStylesOfFolderButtonGroupByPasType) => ({
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
        border: '2px solid',
        borderColor: useAlpha(text.primary, 0.2),
        borderBottomWidth: 0
      },
      '&  .buttonWrapperOfFolderItem': {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 0,
        minWidth: 0,
        minHeight: 0,
        '& a': {
          display: 'block',
          position: 'absolute',
          inset: 0,
          fontSize: 10000000
        },
        '&:hover  .textUnderlinedOnHover': {
          textDecoration: 'underline'
        }
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

        '&:hover': {
          borderColor: text.secondary,
          '& svg,p': {
            color: text.primary
          }
        }
      },
      '& .folderWithOutDrawerViewItem': {
        border: '2px solid',
        borderColor: useAlpha(text.primary, 0.2),
        borderBottomColor: 'transparent'
      },

      '& .folderItemWithAdditionalArrowButtonVisible': {
        borderBottom: 0,
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
        '& .MuiTouchRipple-root': {
          background: useAlpha(folderColor, 0.2)
        },
        borderColor: `${useAlpha(folderColor, 1)} !important`
      },
      '& .additionalFolder': {
        border: '2px solid',
        borderColor: useAlpha(text.primary, 0.2),
        borderRightColor: folderColor,
        borderLeftColor: folderColor,
        borderStyle: 'dashed',
        ' &:hover': {
          borderStyle: 'solid'
        },
        '& p': {
          padding: spacing(0, 0, 0, 1.8),
          ' & a': {
            ...subtitle2,
            textTransform: 'lowercase',
            '&:hover': {
              textDecoration: 'underline'
            }
          }
        }
      },
      '& .lastAdditionalFolder': {
        borderBottomColor: folderColor
      }
    }),
    containerWithDrawerViewItem: ({ folderDimensions: { container } }: USeStylesOfFolderButtonGroupByPasType) => ({
      // ...container
      overflow: 'hidden',
      '& legend': {
        padding: spacing(2.4, 0, 1.8, 1.4),
        borderWidth: 0,
        borderTopWidth: 2
      },
      '& .folderItem': {
        height: spacing(6),
        '& button': {
          borderRadius: 0,
          padding: spacing(0)
        }
      }
    })
  })
);
const FolderButtonGroupByPas: FC<FolderButtonGroupByPasPropsType> = ({
  folder,
  folderDimensions,
  setAditionalFoldersHeigthObj,
  isFoldersHaveDraweView,
  aditionalFoldersHeigthObj,
  isFolderOpen,
  isFolderExtended,
  folderColor,
  globalFolderId,
  ...defaultUseFindCorrectFolderFuncProps
}) => {
  const isButtonIsOpenMore = folder.id === 'OPEN_MORE';
  const dispatch = useDispatch();

  const classes = useStyles({
    folderDimensions,
    isFolderOpen,
    isFolderExtended,
    folderColor,
    isButtonIsOpenMore,
  });

  const additionalMenuState = useSelector(getAdditionalMenuState);

  const handelOpenAdditionalMenu: HandelOpenAdditionalMenuType = additionalMenuState => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { additionalMenuState } }));
  };

  if (!folder.arr.length) return null;

  return (
    <Grid
      container
      className={clsx(
        classes.container,
        isFoldersHaveDraweView ? classes.containerWithDrawerViewItem : classes.containerWithOutDrawerViewItem
      )}
      direction={'column'}
    >
      {!!folder?.label && !!isFolderExtended && (
        <Typography component={'legend'}>
          <p> {folder.label}</p>
        </Typography>
      )}

      {folder.arr.map(({ iconName, id, ...defaultFolderItemProps }, idx) => {
        const [icon] = useTakeIcon(iconName);

        const folderItemPropertyies = useFindFolderItemPropertyies(id, idx, globalFolderId, folder.arr.length);
        const isAdditionalButtonsVisible =
          id === additionalMenuState.id && !!defaultFolderItemProps.property.additionalArr;

        const correctFolderFuncPropertyies = useFindCorrectFolderFunc({
          ...defaultUseFindCorrectFolderFuncProps,
          isAdditionalButtonsVisible,
          ...defaultFolderItemProps,
          handelOpenAdditionalMenu,
          id
        });
        const key = `folder_item_${id}-${idx}`;

        const isAdditionalArrowButtonVisible =
          folderItemPropertyies.isSelected && isFolderExtended && !!defaultFolderItemProps.property.additionalArr;

        const folderItemProps = {
          ...correctFolderFuncPropertyies,
          isAdditionalArrowButtonVisible,
          setAditionalFoldersHeigthObj,
          isAdditionalButtonsVisible,
          ...defaultFolderItemProps,
          ...folderItemPropertyies,
          isFoldersHaveDraweView,
          additionalMenuState,
          label: folder.label,
          isButtonIsOpenMore,
          isFolderExtended,
          folderDimensions,
          icon,
          key,
          id
        };

        return <FolderItem {...folderItemProps} />;
      })}
    </Grid>
  );
};

export default FolderButtonGroupByPas;
