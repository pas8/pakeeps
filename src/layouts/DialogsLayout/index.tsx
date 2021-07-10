import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'react-use';

import { toChangeTemporaryData } from 'store/modules/App/actions';
import { DialogOfAddingNewGlobalEvent } from 'components/PakeepList/components/PakeepElement/components/AttributeGroup/components/EventsPart/components/DialogOfAddingNewGlobalEvent';
import DialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel';
import { DialogLayoutName } from 'models/unums';
import { nullityDefaultDialogProps } from 'store/modules/App/reducers';
import { getDefaultDialogPropsOfTemporaryData } from 'store/modules/App/selectors';
import { DialogsLayoutPropsType } from './types';

const DialogsLayout: FC<DialogsLayoutPropsType> = ({ children }) => {
  const dialogProps = useSelector(getDefaultDialogPropsOfTemporaryData);
  const { dialogName, ...defaultMenuProps } = dialogProps;

  const dispatch = useDispatch();

  const previuosDefaultMenuProps = usePrevious(dialogProps);

  const handleOpenDialog = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { defaultDialogProps: previuosDefaultMenuProps } }));
  };

  const onClose = () => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { defaultDialogProps: nullityDefaultDialogProps } }));
  };

  const defaultMenuLayoutElementProps = { ...defaultMenuProps, onClose, handleOpenDialog };

  const menuesComponentsArr = [
    { Component: DialogOfAddingNewGlobalEvent, props: defaultMenuLayoutElementProps, name: DialogLayoutName.EVENTS },
    { Component: DialogOfAddNewLabel, props: defaultMenuLayoutElementProps, name: DialogLayoutName.LABELS }
  ];

  const menuesHidden = dialogName === DialogLayoutName.NONE;
  return (
    <>
      {children}
      {!menuesHidden &&
        menuesComponentsArr.map(({ Component, props, name }, idx) => {
          if (name !== dialogName) return null;

          return <Component {...props} key={`menuesComponentsArr-${name}-${idx}`} open />;
        })}
    </>
  );
};

export default DialogsLayout;
