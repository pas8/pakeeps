import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import AvatarEditorByPas from 'components/AvatarEditor';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';
import { toChangeAvatarProperties } from 'store/modules/App/actions';
import { AvatarEditorStateType, DialogOfEditingAvatarPropsType } from './types';

const DialogOfEditingAvatar: FC<DialogOfEditingAvatarPropsType> = ({
  image,
  isDialogOpen: isOpen,
  setIsDialogOpen: setIsOpen
}) => {
  const onClose = () => setIsOpen(false);

  const dispatch = useDispatch();

  const [avatarEditorState, setAvatarEditorState] = useState<AvatarEditorStateType>({
    image,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    width: 280,
    height: 280,
    disableCanvasRotation: false,
    isTransparent: true,
    backgroundColor: 'transparent'
  });

  useEffect(() => {
    setIsOpen(!!image);
    setAvatarEditorState(state => ({ ...state, image }));
  }, [image]);
  const [editor, setEditor] = useState<any>(null);

  const onSave = () => {
    const url = editor.getImageScaledToCanvas().toDataURL();
    const { borderRadius, backgroundColor } = avatarEditorState;

    dispatch(toChangeAvatarProperties({ avatarProperties: { backgroundColor, borderRadius, url } }));
    onClose()
  };

  const [primaryColor, , , mediumEmphCOlor] = useThemeColors();

  const avatarEditorByPasProps = { setEditor, avatarEditorState, setAvatarEditorState };
  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={'md'} onClose={onClose}>
      <DialogTitle>Avatar editing</DialogTitle>
      <DialogContent>
        <AvatarEditorByPas {...avatarEditorByPasProps} />
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
