import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toChangeDefaultLayoutDialogProps } from 'store/modules/App/actions';
import { DialogOfAddingNewGlobalEvent } from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/DialogOfAddingNewGlobalEvent';
import DialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel';
import { DialogLayoutName } from 'models/unums';
import { getDefaultDialogPropsOfTemporaryData } from 'store/modules/App/selectors';
import { DialogsLayoutPropsType } from './types';
import EditingDialogOfPakeepElement from 'components/PakeepList/components/EditingDialogOfPakeepElement';
import { customColorPlaceholder } from 'components/AccountAvatar';

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
        return <Component {...defaultMenuLayoutElementProps} key={`dialogComponentsArr_${name}_${idx}`} />;
      })}
    </>
  );
};

export default DialogsLayout;
