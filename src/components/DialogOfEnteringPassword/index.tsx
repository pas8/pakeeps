import {
  Dialog,
  DialogProps,
  DialogTitle,
  TextFieldProps,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  ModalProps
} from '@material-ui/core';
import InputVisibilityAdornment from 'components/InputVisibilityAdornment';
import { DialogOfEnteringPasswordPropsType } from 'models/types';
import { FC, KeyboardEventHandler, useState } from 'react';

const DialogOfEnteringPassword: FC<DialogOfEnteringPasswordPropsType> = ({
  open,
  onChange,
  value,
  onConfirm,
  onCancel
}) => {
  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = ({ code }) => {
    code === 'Enter' && onConfirm();
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleChangeVisibilityStatus = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const onClose: ModalProps['onClose'] = () => {
    onCancel();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Confirm, by entering your password'}</DialogTitle>
      <DialogContent>
        <TextField
          label={'Password'}
          variant={'outlined'}
          onKeyPress={onKeyPress}
          InputProps={{
            endAdornment:  (
              <InputVisibilityAdornment isPasswordVisible={isPasswordVisible} onClick={handleChangeVisibilityStatus} />
            )
          }}
          type={!isPasswordVisible ? 'password' : 'text'}
          placeholder={'Enter password...'}
          onChange={onChange}
          fullWidth
          value={value}
          name={'confirm your password'}
          required
        />
      </DialogContent>
      <DialogActions>
      
        <Button onClick={onCancel} >
          Cancel
        </Button>

        <Button color={'primary'} onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfEnteringPassword;
