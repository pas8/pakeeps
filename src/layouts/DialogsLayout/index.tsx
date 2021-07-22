import { FC } from 'react';
import { Backdrop, CircularProgress, Slide,Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { toChangeDefaultLayoutDialogProps } from 'store/modules/App/actions';
import { DialogLayoutName } from 'models/unums';
import { getDefaultDialogPropsOfTemporaryData } from 'store/modules/App/selectors';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { DialogsLayoutPropsType } from './types';

export const DialogLoadingComponent = () => {
  return (
    <Backdrop open>
      <CircularProgress color={'primary'} />
    </Backdrop>
  );
};

const DialogOfAddingNewGlobalEvent = dynamic(
  () =>
    import(
      'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/DialogOfAddingNewGlobalEvent/components/ForLazyLoading'
    ),
  {
    loading: () => <DialogLoadingComponent />
  }
);

const DialogOfAddNewLabel = dynamic(
  () => import('components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel'),
  {
    loading: () => <DialogLoadingComponent />
  }
);

const EditingDialogOfPakeepElement = dynamic(
  () => import('components/PakeepList/components/EditingDialogOfPakeepElement'),
  {
    loading: () => <DialogLoadingComponent />
  }
);

const DialogsLayout: FC<DialogsLayoutPropsType> = ({ children }) => {
  const defaultDialogProps = useSelector(getDefaultDialogPropsOfTemporaryData);
  if (defaultDialogProps === DialogLayoutName.NONE) return <> {children} </>;

  const dispatch = useDispatch();

  const dialogComponentsArr = [
    { Component: DialogOfAddingNewGlobalEvent, name: DialogLayoutName.EVENTS },
    { Component: DialogOfAddNewLabel, name: DialogLayoutName.LABELS },
    { Component: EditingDialogOfPakeepElement, name: DialogLayoutName.PAKEEPS }
  ];

  return (
    <>
      {children}
      {dialogComponentsArr.map(({ Component, name }, idx) => {
        const findedItem = defaultDialogProps.find(({ name: globalName }) => globalName === name);

        if (!findedItem) return null;

        const onClose = () => {
          dispatch(toChangeDefaultLayoutDialogProps({ props: { name, isShouldBeClosed: true } }));
        };

        const defaultMenuLayoutElementProps = {
          ...findedItem,
          onClose,
          customColor: findedItem.customColor || customColorPlaceholder
        };

        return (
          <Slide direction={'up'} in={true} key={`dialogComponentsArr_${name}_${idx}`}>
            <Grid>
            <Component {...defaultMenuLayoutElementProps} />
            </Grid>
          </Slide>
        );
      })}
    </>
  );
};

export default DialogsLayout;
