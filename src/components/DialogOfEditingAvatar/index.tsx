import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import AvatarEditorByPas from 'components/AvatarEditor';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';
import { toChangeAvatarProperties } from 'store/modules/App/actions';
import { AvatarEditorStateType, DialogOfEditingAvatarPropsType } from './types';

const DialogOfEditingAvatar: FC<DialogOfEditingAvatarPropsType> = ({ image }) => {
  const [isOpen, setIsOpen] = useToggle(!!image);
  const onClose = () => setIsOpen(false);

  const dispatch = useDispatch();

  const [avatarEditorState, setAvatarEditorState] = useState<AvatarEditorStateType>({
    image,
    position: { x: 0.5, y: 0.5 },
    scale: 0.8,
    rotate: 0,
    borderRadius: 0,
    width: 420,
    height: 420,
    disableCanvasRotation: false,
    isTransparent: true,
    backgroundColor: 'red'
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
  };

  const [primaryColor, , , mediumEmphCOlor] = useThemeColors();

  const avatarEditorByPasProps = { setEditor, avatarEditorState, setAvatarEditorState };
  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={'md'}>
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
