import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  Grid,
  IconButton,
  DialogContent,
  makeStyles
} from '@material-ui/core';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import CloseIcon from '@material-ui/icons/Close';

import { AttributeDialogContainerPropsType } from './types';
import { useCloseDialogWithRestore } from 'hooks/useCloseDialogWithRestore.hook';
import { FC } from 'react';
import { UseStylesCustomColorType } from 'models/types';
import { useAlpha } from 'hooks/useAlpha.hook';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({ customColor }: UseStylesCustomColorType) => ({
    '& .MuiDialog-paper': {
      background: customColor?.isUseDefault ? '' : customColor?.bgUnHover,

      '& .MuiDialogTitle-root, .MuiStepper-root,.MuiDialogActions-root, ': {
        background: customColor?.isUseDefault ? '' : customColor?.bgUnHover,
        color: customColor?.isUseDefault ? palette.text.primary : customColor?.hover
      },

      '& .MuiStepper-root': {
        padding: spacing(0.4, 2.8)
      },
      '& .arrowCloseButton': {
        marginLeft: -16,
        color: customColor?.isUseDefault ? palette.text.primary : customColor?.hover,

        '&:hover .MuiTouchRipple-root': {
          background: customColor?.isUseDefault ? '' : useAlpha(customColor?.hover)
        }
      }
    }
  })
}));

const AttributeDialogContainer: FC<AttributeDialogContainerPropsType> = ({
  previewComponent,
  steperProps,
  onSave,
  title,
  customColor,
  colorOfSaveButton,
  colorOfCloseButton,
  ...defaultPropsOfUseCloseDialogWithRestore
}) => {
  const { isSiveIsXs, isSiveIsSm } = useBreakpointNames();
  const { container } = useStyles({ customColor });

  const { handleCloseDialog, isDialogOpen } = useCloseDialogWithRestore<
    typeof defaultPropsOfUseCloseDialogWithRestore.nullityState
  >({ ...defaultPropsOfUseCloseDialogWithRestore });

  const actionsButtonGroupProps = {
    onSave,
    colorOfSaveButton,
    onClose: handleCloseDialog,
    colorOfCloseButton
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      fullScreen={isSiveIsXs}
      fullWidth={isSiveIsSm}
      className={container}
    >
      <DialogTitle>
        <Typography variant={'h6'}>
          {isSiveIsXs && (
            <IconButton onClick={handleCloseDialog} className={'arrowCloseButton'}>
              <ArrowBackIcon />
            </IconButton>
          )}
          {title}
        </Typography>
      </DialogTitle>
      {isSiveIsXs && (
        <Box mx={2.4} mt={-1.4} mb={2.4} display={'flex'}>
          {previewComponent}
        </Box>
      )}
      <SteperOfDialogOfAddNewLabel {...steperProps} />
      <DialogActions style={{ position: isSiveIsXs ? 'absolute' : 'relative', bottom: 0, left: 0, right: 0 }}>
        <Grid container alignItems={'flex-end'} justify={isSiveIsXs ? 'flex-end' : 'space-between'}>
          {!isSiveIsXs && previewComponent}
          <Grid container>
            <ActionsButtonGroup {...actionsButtonGroupProps} isAplyAsDialogAction />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AttributeDialogContainer;
