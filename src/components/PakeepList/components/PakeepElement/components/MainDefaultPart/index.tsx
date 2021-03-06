import { FC } from 'react';
import { Grid, makeStyles, Paper, IconButton, Typography, Checkbox } from '@material-ui/core';
import compareFunc from 'compare-func';
import { colord } from 'colord';

import PinOutlinedIcon from 'components/Icons/components/PinOutlinedIcon';
import PinIcon from 'components/Icons/components/PinIcon';
import { useAlpha } from 'hooks/useAlpha.hook';
import { MainDefaultPartOfPakeepElementPropsType, UseStylesOfMainDefaultPartOfPakeepElementType } from './types';

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  titleClass: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingRight: spacing(0.8),
    marginTop: spacing(1.4),
    marginBottom: spacing(0.8)
  },
  containerOfPinIconClass: ({ customColor }: UseStylesOfMainDefaultPartOfPakeepElementType) => ({
    position: 'absolute',
    top: spacing(0.8),
    right: spacing(0.2),
    color: !customColor.isUseDefault ? customColor.unHover : palette.text.hint,

    '&:hover': {
      background: colord(!customColor.isUseDefault ? customColor.hover : palette.text.secondary)
        .alpha(0.16)
        .toHex(),
      color: !customColor.isUseDefault ? customColor.hover : palette.text.hint
    }
  }),
  mainPartContainer: ({ customColor }: UseStylesOfMainDefaultPartOfPakeepElementType) => ({
    '& .MuiCheckbox-root': {
      position: 'absolute',
      '& svg': {
        width: '0.92em',
        height: '0.92em'
      },
      top: -8,
      left: -10,
      color: !customColor.isUseDefault ? customColor.unHover : palette.text.hint,
      '&:hover .MuiTouchRipple-root': {
        background: useAlpha(!customColor.isUseDefault ? customColor.unHover! : palette.text.hint, 0.2)
      }
    }
  }),
  checkBoxesItemContainer: {
    marginBottom: spacing(0.8),
    position: 'relative',
    '& p': {
      padding: spacing(0, 0.6, 0, 3.6)
      // textIndent: 28
      // '&::first-line': {
      // marginLeft: 100
      // }
    },
    '& .accomplished': {
      textDecoration: 'line-through'
    }
  }
}));

const MainDefaultPartOfPakeepElement: FC<MainDefaultPartOfPakeepElementPropsType> = ({
  children,
  isPinIconButtonHidden,
  className,
  onClickOfPinIconButton,
  text,
  isCheckBoxes,
  checkBoxes,
  title,
  customColor,
  onClick
}) => {
  const classes = useStyles({ customColor });

  return (
    <Paper variant={'outlined'} className={className}>
      {!isPinIconButtonHidden && (
        <IconButton className={classes.containerOfPinIconClass} onClick={onClickOfPinIconButton}>
          {customColor ? <PinIcon /> : <PinOutlinedIcon />}
        </IconButton>
      )}
      <Grid onClick={onClick}>
        <Grid className={classes.titleClass}>
          <Typography variant={'h5'}>{title}</Typography>
        </Grid>
        <Grid className={classes.mainPartContainer} container>
          {isCheckBoxes ? (
            <>
              {checkBoxes &&
                checkBoxes.sort(compareFunc('isAccomplished')).map(({ id, value, isAccomplished }) => {
                  return (
                    <Grid
                      container
                      key={`mainDefaultPartOfPakeepElement-${id}`}
                      className={classes.checkBoxesItemContainer}
                    >
                      <Checkbox checked={isAccomplished} />
                      <Typography
                        className={isAccomplished ? 'accomplished' : 'notAccomplished'}
                        variant={'body2'}
                        component={'p'}
                      >
                        {value}
                      </Typography>
                    </Grid>
                  );
                })}
            </>
          ) : (
            <Typography variant={'body2'} component={'p'}>
              {text}
            </Typography>
          )}
        </Grid>
      </Grid>
      {children}
    </Paper>
  );
};

export default MainDefaultPartOfPakeepElement;
