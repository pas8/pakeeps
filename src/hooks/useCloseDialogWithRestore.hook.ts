import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import { isEqual } from 'lodash';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { usePrevious, useToggle } from 'react-use';
import { UseCloseDialogWithRestoreType } from 'models/types';
import { SnackbarSeverityNames } from 'models/unums';

export const useCloseDialogWithRestore: UseCloseDialogWithRestoreType = ({
  nullityState,
  setState,
  state,
  snackBarMessage,
  onClose
}) => {
  const [isDialogOpen, setIsDialogOpen] = useToggle(true);
  const [isAwaited, setAwaitedStatus] = useToggle(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const previuosState = usePrevious(state);

  const handleRestoreLastGlobalEvent = () => {
    if (!previuosState) return;

    !isEqual(nullityState, previuosState) && setState(previuosState);
    setIsDialogOpen(true);
    setAwaitedStatus(false);
    closeSnackbar();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setState(nullityState);
    if (isEqual(nullityState, state)) return setAwaitedStatus(true);

    enqueueSnackbar({
      message: snackBarMessage,
      severity: SnackbarSeverityNames.WARNING,
      buttonText: 'Restore',
      onClick: handleRestoreLastGlobalEvent,
      icon: RestoreOutlinedIcon
    });
    setTimeout(() => {
      setAwaitedStatus(false);
      setAwaitedStatus(true);
      setAwaitedStatus(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isDialogOpen && isAwaited) {
      setIsDialogOpen(true);
      onClose();
      console.log(';');
    }
  }, [isDialogOpen, isAwaited]);

  return { isDialogOpen, handleCloseDialog };
};
