import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import clsx from 'clsx';
import { DEFAULT, PRIMARY, SECONDARY } from 'models/denotation';
import { EventItemPropsType, UseStylesOfEventItemType } from './types';

const useStyles = makeStyles(({ spacing, transitions, palette, shape: { borderRadius } }) => ({
  containerOfDateItem: ({
    customColor,
    color: eventColor,
    variant,
    parentBackgroundColor
  }: UseStylesOfEventItemType) => {
    const color = customColor.isUseDefault
      ? eventColor === DEFAULT
        ? palette.text.secondary
        : eventColor === PRIMARY
        ? palette.primary.main
        : eventColor === SECONDARY
        ? palette.secondary.main
        : eventColor
      : customColor?.hover;

    return {
      position: 'relative',
      padding: spacing(0.32, 0.8, 0.16, 0.8),
      margin: spacing(0.4, 0.4),
      border: '1px solid',
      borderColor: color,
      color:
        variant === DEFAULT
          ? parentBackgroundColor === DEFAULT
            ? palette.background.default
            : parentBackgroundColor
          : color,
      background: variant === DEFAULT ? (!!color ? color : palette.text.secondary) : '',
      borderRadius,
      '&:hover': {
        cursor: 'pointer',
        boxShadow: `0px 0px 4px 1px ${color}`
      }
    };
  },

  containerOfFirstVariantOfEventItemView: {
    '& svg': {
      fontSize: spacing(2.16),
      margin: spacing(0.2, 0.4, 0.4, 0)
    }
  },
  containeOfInputTextViewOfCaptionOfEventItem: {
    margin: spacing(0, 0.4),
    '& legend': {
      padding: spacing(0, 0.32, 0, 0.08)
    },
    '& .mainPart': {
      margin: spacing(-0.32, 0, 0, 0)
    }
  },

  iconContainer: {
    position: 'absolute',
    top: 0,
    left: spacing(0.8),
    bottom: 0,
    fontSize: spacing(2.16)
  }
}));

const EventItem: FC<EventItemPropsType> = ({
  icon,
  title,
  color,
  variant,
  customColor,
  value,
  onClick,
  parentBackgroundColor
}) => {
  const isFirstVariantOfEventItemView = true;
  const isInlineVariantOfEventItemView = true;

  const isInputTextViewOfCaptionOfEventItem = !true;
  const classes = useStyles({ customColor, color, variant, parentBackgroundColor });
  return (
    <Grid onClick={onClick}>
      {isInputTextViewOfCaptionOfEventItem ? (
        <fieldset
          className={clsx(
            classes.containerOfFirstVariantOfEventItemView,
            classes.containerOfDateItem,
            classes.containeOfInputTextViewOfCaptionOfEventItem
          )}
        >
          <legend>
            <Typography variant={'caption'}>{title}</Typography>
          </legend>

          <Grid container alignItems={'center'} className={'mainPart'}>
            {icon} <Typography variant={'body2'}>{value}</Typography>
          </Grid>
        </fieldset>
      ) : (
        <Grid className={classes.containerOfDateItem}>
          {isFirstVariantOfEventItemView ? (
            <Grid className={classes.containerOfFirstVariantOfEventItemView}>
              <Box mt={-0.2}>
                <Typography variant={'caption'}>{title}</Typography>
              </Box>

              <Grid container alignItems={'center'}>
                {icon} <Typography variant={'body2'}>{value}</Typography>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid className={classes.iconContainer} container alignItems={'center'}>
                {icon}
              </Grid>
              <Box ml={4}>
                <Grid>
                  <Typography variant={'caption'}>{title}</Typography>
                </Grid>
                <Grid>
                  <Typography variant={'body2'}>{value}</Typography>
                </Grid>
              </Box>
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default EventItem;
