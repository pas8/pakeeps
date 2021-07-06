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

export const useStyles = makeStyles(({ spacing, palette, typography: { subtitle2 } }) => ({
  container: ({ customColor }: UseStylesCustomColorType) => ({
    border: 0,
    color: customColor?.hover,
    borderBottomWidth: 2,
    borderColor: !customColor.isUseDefault ? useMix(customColor, 0.8) : palette?.mediumEmphasis?.main,
    borderStyle: 'solid',

    '& li:hover .MuiTouchRipple-root': {
      background: useAlpha(customColor.isUseDefault ? palette.secondary.main : customColor?.unHover, 0.42)
    },
    '& svg,p': {
      color: !customColor.isUseDefault ? customColor?.unHover : palette?.highEmphasis?.main
    },
    margin: spacing(0, 0, 0.4, 0),
    '& legend': {
      color: !customColor.isUseDefault ?  useMix(customColor, 0.8) : '',
      padding: spacing(0.8, 1.6, 0.8, 0)
    }
  }),
  defaultMenuListItem: {
    padding: spacing(1, 1),
    '& svg': {
      margin: spacing(0.4, 1.08, 0, 0.2)
    },
    '& p': {
      ...subtitle2
    },
    '& div': {
      postion: 'relative',
      zIndex: 100000000
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
        <MenuItem
          disableGutters
          onClick={onClick}
          className={classes.defaultMenuListItem}
          key={`DefaultMenuListOflabelList_${title}`}
        >
          <Grid container justify={'center'}>
            <Icon /> <ListItemText secondary={title} />
          </Grid>
        </MenuItem>
      ))}
    </Grid>
  );
};

export default DefaultMenuListOflabelList;
