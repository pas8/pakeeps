import clsx from 'clsx';
import { useMeasure, usePrevious } from 'react-use';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { FolderItemPropsType } from '../../types';
import { AdditionalFolderPropertyNames } from 'models/unums';

const FolderItem: FC<FolderItemPropsType> = ({
  isAdditionalArrowButtonVisible,
  setAditionalFoldersHeigthObj,
  isAdditionalButtonsVisible,
  isFolderArrHaveOnlyOneItem,
  aditionalFoldersHeigthObj,
  isFoldersHaveDraweView,
  additionalMenuState,
  isButtonIsOpenMore,
  folderDimensions,
  isFolderExtended,
  isSelected,
  property,
  isFirst,
  onClick,
  isLast,
  title,
  label,
  route,
  icon,
  id
}) => {
  const [ref, { height: notValidatedHeight }] = useMeasure<HTMLDivElement>();

  // const height =
  // isFirst && isFolderExtended && !!label
  //   ? notValidatedHeight + folderDimensions.buttonGroup.labelHeight
  //   : isLast && !isButtonIsOpenMore
  //   ? notValidatedHeight + folderDimensions.buttonGroup.marginBottom
  //   : notValidatedHeight;

  // const previousHeight = usePrevious(height);

//   useEffect(() => {
   

// console.log(';')
//     height !== 0 &&
//       height !== aditionalFoldersHeigthObj[id] &&
//       previousHeight !== height &&
//       setAditionalFoldersHeigthObj(state => ({ ...state, [id]: height }));
//   }, [notValidatedHeight, previousHeight, isFolderExtended, isLast, isFirst, folderDimensions, isButtonIsOpenMore]);

  const CustomComponent = property.customComponent;

  const isFolderHaveCustomComponent =
    property.value === AdditionalFolderPropertyNames.CUSTOM_COMPONENT && !!CustomComponent;
  return (
    <Grid ref={ref}>
      <Grid item>
        <Grid
          container
          className={
            isFoldersHaveDraweView
              ? clsx('folderItem', 'folderWithDrawerViewItem', isSelected ? 'selectedFolderWithDrawerViewItem' : '')
              : clsx(
                  'folderItem',
                  'folderWithOutDrawerViewItem',
                  isFolderArrHaveOnlyOneItem ? 'folderArrHaveOnlyOneItem' : '',
                  isSelected ? 'selectedFolderItem' : '',
                  isLast ? 'lastFolderItem' : '',
                  isAdditionalButtonsVisible ? 'folderItemWithAdditionalArrowButtonVisible' : '',
                  isFirst ? (!!label && isFolderExtended ? 'dashedFolderItem' : 'firstFolderItem') : ''
                )
          }
          alignItems={'center'}
        >
          <Button className={clsx('buttonWrapperOfFolderItem')} onClick={onClick}>
            {isFolderHaveCustomComponent ? (
              <Grid
                container
                wrap={'nowrap'}
                alignItems={'center'}
                justify={isFolderExtended ? 'flex-start' : 'center'}
              >
                <Grid className={'containerOfCustomComponent'}>
                  <CustomComponent />
                </Grid>
                {isFolderExtended && <Typography>{title}</Typography>}
              </Grid>
            ) : (
              <>
                {isFolderExtended && route && <Link href={route}>{title}</Link>}
                <Grid
                  container
                  justify={isFolderExtended ? 'flex-start' : 'center'}
                  wrap={'nowrap'}
                  alignItems={'center'}
                >
                  <Grid className={'iconContainer'}>
                    <Grid container justify={'center'} alignItems={'center'}>
                      {icon}
                    </Grid>
                  </Grid>

                  {isFolderExtended && (
                    <Typography className={isFolderExtended && route ? 'textUnderlinedOnHover' : ''}>
                      {title}
                    </Typography>
                  )}
                  {isAdditionalArrowButtonVisible && (
                    <Grid className={'additionalArrowButton'}>
                      {!!additionalMenuState.id ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Button>
        </Grid>
      </Grid>

      {isAdditionalButtonsVisible &&
        property.additionalArr?.map(({ route, title }, idx) => {
          const isLast = property?.additionalArr?.length === idx + 1;
          return (
            <Grid
              key={`FolderItem_${id}_${idx}`}
              className={clsx('folderItem', 'additionalFolder', isLast ? 'lastAdditionalFolder' : '')}
              container
              alignItems={'center'}
            >
              <Typography component={'p'}>
                # <Link href={route}>{title}</Link>
              </Typography>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default FolderItem;
