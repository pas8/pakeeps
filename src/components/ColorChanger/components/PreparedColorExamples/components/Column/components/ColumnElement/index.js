import PropTypes from 'prop-types';
import { colors, Grid, makeStyles, Paper } from '@material-ui/core';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import clsx from 'clsx';
import _ from 'lodash';
import CenteredGrid from 'components/CenteredGrid';
import { colord } from 'colord';
import { nanoid } from 'nanoid';

const useStyles = makeStyles(theme => ({
  elementOfGridColorPicker: {
    width: theme.spacing(16 * 0.42),
    height: theme.spacing(16 * 0.42),
    margin: theme.spacing(0.4),
    overflow: 'hidden',
    border: '1px solid rgba(42,42,42,1)',

    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen
    }),
    cursor: 'pointer',
  },
  extendedElementOfGridColorPicker: {
    width: theme.spacing((8 * 0.8) / 2),
    height: theme.spacing((8 * 0.8) / 2),

    // margin: theme.spacing(0.2),
    // borderRadius: 0,
  },
  containerOfExtendedElementOfGridColorPicker: {
    margin: theme.spacing(1.4),
    borderRadius: '10px'
  },
  elementOfGridColorPickerWithBorder: {
    borderColor: ({ isColorLight }) => (isColorLight ? 'rgba(8,8,8,1)' : 'rgba(255,255,255,1)'),
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    }),
    '& svg': {
      color: ({ isColorLight }) => (isColorLight ? 'rgba(8,8,8,1)' : 'rgba(255,255,255,1)')
    }
  }
  // iconUtilsContainer: {
  //   '& .MuiSvgIcon-root': { width: theme.spacing(2 / (0.8 - 0.1)) }
  // },
}));
const ColumnElementOfPreparedColorExamples = ({ handleSetColor, isExtended, color, colorName },idx) => {
  const isColorLight = colord(color).brightness() >= 0.8;
  const classes = useStyles({ isColorLight });

  const namesOfPartsOfGridElement = [
    ['A100', 'A200'],
    ['A400', 'A700']
  ];

  const correctNamesOfPartsOfGridElementArr = _.flattenDeep(namesOfPartsOfGridElement);
  const isExtendedElementColorCorrect = correctNamesOfPartsOfGridElementArr.some(
    name => colors[colorName][name] === color
  );

  const staticExtendedElement = (
    <Paper className={classes.elementOfGridColorPicker}>
      {namesOfPartsOfGridElement.map(row => (
        <Grid container>
          {row.map(name => {
            const colorOfElementOfPartsOfGridElementProps = colors[colorName][name];
            const onClick = () => handleSetColor(colorOfElementOfPartsOfGridElementProps);

            const elementOfPartsOfGridElementProps = {
              onClick,
              style: { background: colorOfElementOfPartsOfGridElementProps },
              className: classes.extendedElementOfGridColorPicker,
              key:idx
            };

            return <Grid {...elementOfPartsOfGridElementProps} />;
          })}
        </Grid>
      ))}
    </Paper>
  );

  const selectedElement = (correctStatus, color, onClickOfSelectElement) => {
    const defaultOnClick = () => handleSetColor(color);
    const onClick = onClickOfSelectElement ?? defaultOnClick;

    const selectedElementPaperContainerProps = {
      style: { backgroundColor: color,border:`1px solid ${color}`},
      className: clsx(
        classes.elementOfGridColorPicker,
        correctStatus ? classes.elementOfGridColorPickerWithBorder : null
      ),
      elevation: 8,
      onClick
    };
    return (
      <Paper {...selectedElementPaperContainerProps}>
        <CenteredGrid>{correctStatus && <DoneOutlineOutlinedIcon />}</CenteredGrid>
      </Paper>
    );
  };

  const nonExtendedElementColor = colors[colorName][500];
  const isNonExtendedElementColorCorrect = color === nonExtendedElementColor;

  const nonExtendedElement = selectedElement(isNonExtendedElementColorCorrect, nonExtendedElementColor);

  const extendedElement = isExtendedElementColorCorrect
    ? selectedElement(true, color, () => handleSetColor(false))
    : staticExtendedElement;

  const elementOfGridColorPicker = isExtended ? extendedElement : nonExtendedElement;

  return elementOfGridColorPicker;
};

ColumnElementOfPreparedColorExamples.propTypes = {
  color: PropTypes.any,
  colorName: PropTypes.string,
  handleSetColor: PropTypes.func,
  isExtended: PropTypes.bool
};

export default ColumnElementOfPreparedColorExamples;
