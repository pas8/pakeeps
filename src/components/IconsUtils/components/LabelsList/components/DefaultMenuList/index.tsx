import { makeStyles, MenuItem, ListItemText, FormControl, FormLabel, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import IconButtonByPas from 'components/IconButton';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useMix } from 'hooks/useMix.hook';
import { UseStylesCustomColorType } from 'models/types';
import { FC } from 'react';
import { DefaultMenuListOflabelListPropsType } from './types';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({ customColor }: UseStylesCustomColorType) => ({
    border: 0,
    color: customColor?.hover,
    borderBottomWidth: 2,
    borderColor: customColor ? useMix(customColor, 0.8) : palette?.mediumEmphasis?.main,
    borderStyle: 'solid',

    '& li:hover .MuiTouchRipple-root': {
      background: useAlpha(customColor.isUseDefault ? palette.secondary.main : customColor?.unHover)
    },
    '& svg,p': {
      color: customColor ? customColor?.unHover : palette?.highEmphasis?.main
    },
    margin: spacing(0, 0, 0.4, 0),
    '& legend': {
      color: customColor && useMix(customColor, 0.8),
      padding: spacing(0.8, 1.6, 0.8, 0)
    }
  }),
  defaultMenuListItem: {
    padding: spacing(1, 1),
    fontSize: '10px',
    '& svg': {
      margin: spacing(0, 1.08, 0, 0.2)
    }
  }
}));

const DefaultMenuListOflabelList: FC<DefaultMenuListOflabelListPropsType> = ({
  defaultMenuListArr,
  customColor,
  arrowButtonFunc
}) => {
  const classes = useStyles({ customColor });

  return (
    <Grid className={classes.container}>
      <Grid container alignItems={'center'}>
        <IconButtonByPas
          icon={ArrowBackOutlinedIcon}
          onClick={arrowButtonFunc}
          customColor={customColor}
          size={'small'}
        />

        <FormLabel component={'legend'}>All Utils</FormLabel>
      </Grid>
      {defaultMenuListArr.map(({ title, Icon, onClick }) => (
        <MenuItem disableGutters onClick={onClick} className={classes.defaultMenuListItem} key={nanoid()}>
          <Icon /> <ListItemText secondary={title} />
        </MenuItem>
      ))}
    </Grid>
  );
};

export default DefaultMenuListOflabelList;
