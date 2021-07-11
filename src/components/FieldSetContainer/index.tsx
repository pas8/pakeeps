import { Grid, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  container: {
    borderRadius,
    padding: spacing(0.8),
    '& legend': {
      padding: spacing(0, 0.8)
    }
  }
}));

const FieldSetContainer: FC<{ title: string }> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} component={'fieldset'}>
      <legend>
        <Typography variant={'subtitle1'} color={'textSecondary'}>
          {title}
        </Typography>
      </legend>
      {children}
    </Grid>
  );
};

export default FieldSetContainer;
