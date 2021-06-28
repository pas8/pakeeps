import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import AvatarEditorByPas from 'components/AvatarEditor';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useEffect } from 'react';
import { useToggle } from 'react-use';
import { DialogOfEditingAvatarPropsType } from './types';

const DialogOfEditingAvatar: FC<DialogOfEditingAvatarPropsType> = ({ image, onSave }) => {
  const [isOpen, setIsOpen] = useToggle(!!image);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(!!image);
  }, [image]);

  const [primaryColor, , , mediumEmphCOlor] = useThemeColors();

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Avatar editing</DialogTitle>
      <DialogContent>
        <AvatarEditorByPas image={image} />
      </DialogContent>
      <DialogActions>
        <ActionsButtonGroup
          colorOfCloseButton={mediumEmphCOlor!}
          colorOfSaveButton={primaryColor!}
          onSave={onSave}
          onClose={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogOfEditingAvatar;
