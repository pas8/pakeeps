import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { FC } from 'react';
import CloseButtonWithIcon from './components/CloseButtonWithIcon';
import SaveButtonWithIcon from './components/SaveButtonWithIcon';
import { ActionsButtonGroupPropsType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    '& svg': {
      margin: spacing(0, 0, 0.2, -0.42)
    }
  }
}));

const ActionsButtonGroup: FC<ActionsButtonGroupPropsType> = ({
  colorOfSaveButton: notValidatedColorOfSaveButton,
  onSave,
  colorOfCloseButton: notValidatedColorOfCloseButton,
  onClose
}) => {
  const classes = useStyles();
  const {
    palette: { primary, text }
  } = useTheme();
  const colorOfSaveButton = notValidatedColorOfSaveButton || primary.main;
  const colorOfCloseButton = notValidatedColorOfCloseButton || text.hint;
  return (
    <Grid className={classes.container} container wrap={'nowrap'} justify={'flex-end'}>
      <CloseButtonWithIcon colorOfCloseButton={colorOfCloseButton} onClose={onClose} />
      <SaveButtonWithIcon colorOfSaveButton={colorOfSaveButton} onSave={onSave} />
    </Grid>
  );
};

export default ActionsButtonGroup;
