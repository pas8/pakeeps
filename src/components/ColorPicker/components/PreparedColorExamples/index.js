import { useEffect, useState } from 'react';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import {
  Box,
  Button,
  ButtonGroup,
  colors,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { themeColors } from 'components/theme';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import WrapperOfPopoverAndMenu from 'components/IconsUtils/components/WrapperOfPopoverAndMenu';
import IconButtonByPas from 'components/IconButton';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import clsx from 'clsx';
import { colord } from 'colord';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import ColorFormatIcon from 'components/Icons/components/ColorFormatIcon';
import _ from 'lodash';
import { useCopyToClipboard } from 'react-use';
import compareFunc from 'compare-func';
import CenteredGrid from 'components/CenteredGrid';

const useStyles = makeStyles(theme => ({
  container: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.complex
    }),
    paddingBottom: theme.spacing(0.4),
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '80vw'
    },
    overflowX: 'hidden'
  },
  elementOfGridColorPicker: {
    width: theme.spacing(16 * 0.42),
    height: theme.spacing(16 * 0.42),
    margin: theme.spacing(0.8),
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0)',
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen
    }),
    cursor: 'pointer'
  },
  containerOfElementOfGridColorPicker: {
    margin: theme.spacing(1.8)
  },
  extendedElementOfGridColorPicker: {
    width: theme.spacing((8 * 0.8) / 2),
    height: theme.spacing((8 * 0.8) / 2)
    // margin: theme.spacing(0.2),
    // borderRadius: 0,
  },
  containerOfExtendedElementOfGridColorPicker: {
    margin: theme.spacing(1.4),
    borderRadius: '10px'
  },
  elementOfGridColorPickerWithBorder: {
    borderColor: 'rgba(255,255,255,1)',
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  iconUtilsContainer: {
    '& .MuiSvgIcon-root': { width: theme.spacing(2 / (0.8 - 0.1)) }
  },
  iconUtilsContainerGradientStatusIsTrue: {
    '& button': { transform: 'scale(1.1)' },
    // padding:theme.spacing(0.8),

    padding: theme.spacing(1.4, 0.8),
    borderLeft: '2px solid rgba(255, 255, 255,0.4)'
    // '& .MuiSvgIcon-root': { width: theme.spacing(10) },

    // '& .MuiSvgIcon-root': { width: theme.spacing(4) }
  }

}));

const PreparedColorExamples = ({color, isExtended,handleSetColor}) => {
  const classes = useStyles();
console.log(isExtended)
  const colorsArr = [
    [{ colorName: 'deepOrange' }, { colorName: 'orange' }, { colorName: 'amber' }, { colorName: 'yellow' }],
    [{ colorName: 'lime' }, { colorName: 'lightGreen' }, { colorName: 'green' }, { colorName: 'teal' }],
    [{ colorName: 'cyan' }, { colorName: 'lightBlue' }, { colorName: 'blue' }, { colorName: 'indigo' }],
    [{ colorName: 'deepPurple' }, { colorName: 'purple' }, { colorName: 'pink' }, { colorName: 'red' }]
  ];
  return (
    <>
      {colorsArr.map(arr => {
        const gridRow = arr.map(({ colorName }) => {
          // console.log(colors[colorName.500])

          const namesOfPartsOfGridElement = [
            ['A100', 'A200'],
            ['A400', 'A700']
          ];
          // console.log(namesOfPartsOfGridElement.some(el => colors[colorName][el] === color));
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
                      onClick: onClick,
                      style: { background: colorOfElementOfPartsOfGridElementProps },
                      className: classes.extendedElementOfGridColorPicker
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
              style: { backgroundColor: color },
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
        });

        return (
          <Grid item>
            <Grid container>{gridRow}</Grid>
          </Grid>
        );
      })}
    </>
  );
};

PreparedColorExamples.propTypes = {};

export default PreparedColorExamples;
