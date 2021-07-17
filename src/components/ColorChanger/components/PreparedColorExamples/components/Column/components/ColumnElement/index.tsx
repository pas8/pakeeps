import { FC } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { colors, Grid, makeStyles, Paper } from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CenteredGrid from 'components/CenteredGrid';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import {
  ColumnElementOfPreparedColorExamplesPropsType,
  UseStylesOfColumnElementOfPreparedColorExamplesType
} from 'components/ColorChanger/components/PreparedColorExamples/types';
import { colord } from 'colord';

const DARK_COLOR = 'rgba(8,8,8,1)';
const WHITE_COLOR = 'rgba(255,255,255,1)';

const useStyles = makeStyles(({ spacing, transitions, shape: { borderRadius } }) => ({
  elementOfGridColorPicker: {
    width: spacing(16 * 0.42),
    height: spacing(16 * 0.42),
    margin: spacing(0.4),
    overflow: 'hidden',
    border: '1px solid',
    borderColor: ({ isColorLight, isBgColorLight, customColor }: UseStylesOfColumnElementOfPreparedColorExamplesType) =>
      isBgColorLight && !!customColor ? customColor?.bgUnHover : isColorLight ? DARK_COLOR : WHITE_COLOR,

    transition: transitions.create('border', {
      easing: transitions.easing.easeIn,
      duration: transitions.duration.leavingScreen
    }),
    cursor: 'pointer'
  },
  extendedElementOfGridColorPicker: {
    width: spacing((8 * 0.8) / 2),
    height: spacing((8 * 0.8) / 2)

    // margin: spacing(0.2),
    // borderRadius: 0,
  },
  containerOfExtendedElementOfGridColorPicker: {
    margin: spacing(1.4),
    borderRadius
  },
  elementOfGridColorPickerWithBorder: {
    transition: transitions.create('border', {
      easing: transitions.easing.easeIn,
      duration: transitions.duration.enteringScreen
    }),
    '& svg': {
      color: ({ isColorLight }: UseStylesOfColumnElementOfPreparedColorExamplesType) =>
        isColorLight ? DARK_COLOR : WHITE_COLOR
    }
  }
  // iconUtilsContainer: {
  //   '& .MuiSvgIcon-root': { width: spacing(2 / (0.8 - 0.1)) }
  // },
}));
const ColumnElementOfPreparedColorExamples: FC<ColumnElementOfPreparedColorExamplesPropsType> = ({
  handleSetColor,
  isExtended,
  color:notValidColor,
  colorName,
  customColor
}) => {
  const color = colord(notValidColor).toHex()
  const isColorLight = useIsColorLight(color);
  const isBgColorLight = useIsColorLight(customColor?.hover);

  const classes = useStyles({ isColorLight, customColor, isBgColorLight });
  const namesOfPartsOfGridElement = [, ['A100', 'A200'], ['A400', 'A700']];

  const correctNamesOfPartsOfGridElementArr = _.flattenDeep(namesOfPartsOfGridElement);

  const isExtendedElementColorCorrect = correctNamesOfPartsOfGridElementArr.some(
    //@ts-ignore
    name => colors[colorName][name] === color
  );

  const staticExtendedElement = (
    <Paper className={classes.elementOfGridColorPicker}>
      {namesOfPartsOfGridElement.map((row, index) => (
        <Grid container key={`namesOfPartsOfGridElementContainer-${index}`}>
          {row?.map((name, idx) => {
            //@ts-ignore
            const colorOfElementOfPartsOfGridElementProps = colors[colorName][name];
            const onClick = () => handleSetColor(colorOfElementOfPartsOfGridElementProps);

            const elementOfPartsOfGridElementProps = {
              onClick,
              style: {
                background: colorOfElementOfPartsOfGridElementProps
              },

              className: clsx(classes.extendedElementOfGridColorPicker),
              key: `namesOfPartsOfGridElement-row-${idx}`
            };

            return <Grid {...elementOfPartsOfGridElementProps} />;
          })}
        </Grid>
      ))}
    </Paper>
  );

  const selectedElement = (correctStatus: boolean, color: string, onClickOfSelectElement?: () => void) => {
    const defaultOnClick = () => handleSetColor(color);
    const onClick = onClickOfSelectElement ?? defaultOnClick;

    const selectedElementPaperContainerProps = {
      style: {
        backgroundColor: color,
        border: `1px solid ${isBgColorLight && !!customColor ? customColor?.bgUnHover : color}`
        // boxShadow: `0 0 2px 1px ${colord(customColor?.bgUnHover).alpha(0.4).toHex()}`
      },
      className: clsx(
        classes.elementOfGridColorPicker,
        correctStatus ? classes.elementOfGridColorPickerWithBorder : null
      ),
      elevation: isBgColorLight ? 0 : 8,
      onClick
    };
    return (
      <Paper {...selectedElementPaperContainerProps}>
        <CenteredGrid>{correctStatus && <DoneOutlineOutlinedIcon />}</CenteredGrid>
      </Paper>
    );
  };
  //@ts-ignore
  const nonExtendedElementColor = colors[colorName][500];
  const isNonExtendedElementColorCorrect = color === nonExtendedElementColor;

  const nonExtendedElement = selectedElement(isNonExtendedElementColorCorrect, nonExtendedElementColor);

  const extendedElement = isExtendedElementColorCorrect
    ? selectedElement(true, color, () => handleSetColor(''))
    : staticExtendedElement;

  const elementOfGridColorPicker = isExtended ? extendedElement : nonExtendedElement;

  return elementOfGridColorPicker;
};

export default ColumnElementOfPreparedColorExamples;
