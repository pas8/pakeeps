import { Grid, GridProps, makeStyles, Typography } from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';

const useStyles = makeStyles(
  ({ spacing, palette, breakpoints, shape: { borderRadius }, typography: { subtitle1, h6 } }) => ({
    container: ({ isOnlyTop }: any) => ({
      borderRadius: isOnlyTop ? 0 : borderRadius,
      padding: spacing(isOnlyTop ? 1.8 : 0.8, isOnlyTop ? 0 : 0.4, 0.4),
      borderColor: useAlpha(palette.text.primary, 0.2),
      display: 'flex',
      border: isOnlyTop ? '0px' : '1px',
      borderTop: '2px',
      borderStyle:isOnlyTop ? 'solid': 'solid' ,

      '& >  legend': {
        marginLeft: 16,
        padding: spacing(0, 0.8),
        '& >p': {
          ...subtitle1,
          fontSize: h6.fontSize
        }
      }
    })
  })
);

const FieldSetContainer: FC<{ title: string; isOnlyTop?: boolean } & GridProps> = ({
  children,
  title,
  isOnlyTop,
  ...gridProps
}) => {
  const classes = useStyles({ isOnlyTop });

  return (
    //@ts-ignore
    <Grid className={classes.container} component={'fieldset'} container {...gridProps}>
      <legend>
        <Typography color={'textSecondary'}>{title}</Typography>
      </legend>
      {children}
    </Grid>
  );
};

export default FieldSetContainer;
