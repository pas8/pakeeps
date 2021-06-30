import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import AvatarEditorByPas from 'components/AvatarEditor';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMeasure, useToggle, useWindowSize } from 'react-use';
import { toChangeAvatarProperties } from 'store/modules/App/actions';
import { AvatarEditorStateType, DialogOfEditingAvatarPropsType } from './types';

const DialogOfEditingAvatar: FC<DialogOfEditingAvatarPropsType> = ({
  image,
  isDialogOpen: isOpen,
  setIsDialogOpen: setIsOpen
}) => {
  const onClose = () => setIsOpen(false);

  const dispatch = useDispatch();

  const [ref, { width }] = useMeasure();
  const { isSizeSmall } = useBreakpointNames();

  const [avatarEditorState, setAvatarEditorState] = useState<AvatarEditorStateType>({
    width: 280,
    height: 280,
    image,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 4,
    disableCanvasRotation: false,
    isTransparent: true,
    backgroundColor: 'transparent'
  });
  useEffect(() => {
    const unit = width - 48;
    !!isSizeSmall && !!width && setAvatarEditorState(state => ({ ...state, width: unit, height: unit }));
  }, [isSizeSmall, width]);


  useEffect(() => {
    setIsOpen(!!image);
    setAvatarEditorState(state => ({ ...state, image }));
  }, [image]);
  const [editor, setEditor] = useState<any>(null);

  const onSave = () => {
    const url = editor.getImageScaledToCanvas().toDataURL();
    const { borderRadius, backgroundColor } = avatarEditorState;

    dispatch(toChangeAvatarProperties({ avatarProperties: { backgroundColor, borderRadius, url } }));
    onClose();
  };

  const [primaryColor, , , mediumEmphCOlor] = useThemeColors();

  const avatarEditorByPasProps = { setEditor, avatarEditorState, setAvatarEditorState };
  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={isSizeSmall ? 'xs' : 'md'} onClose={onClose}>
      <DialogTitle>Avatar editing</DialogTitle>
      <DialogContent ref={ref}>
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
