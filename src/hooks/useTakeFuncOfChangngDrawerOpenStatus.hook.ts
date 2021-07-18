import { menuOpenStatusDenotation } from 'models/denotation';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { getMenuOpenStatus } from 'store/modules/App/selectors';

export const useTakeFuncOfChangngDrawerOpenStatus = (): (() => void) => {
  const dispatch = useDispatch();
  const menuOpenStatus = useSelector(getMenuOpenStatus);
  const isFolderExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;

  const handleChangeDrawerOpenStatus = () => {
    const menuOpenStatus = isFolderExtended ? menuOpenStatusDenotation.OPEN : menuOpenStatusDenotation.EXTENDED;
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus }));
  };

  return handleChangeDrawerOpenStatus;
};
