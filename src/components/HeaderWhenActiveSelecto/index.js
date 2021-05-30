import { AppBar, Grid, makeStyles } from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import { themeColors } from 'components/theme';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import PropTypes from 'prop-types';
import { useMeasure } from 'react-use';

const useStyles = makeStyles(theme => ({}));

const HeaderWhenActiveSelecto = ({selectedPakeepsId}) => {
  const classes = useStyles();

  const [ref, { width: widthOfContainer }] = useMeasure();

  const [customColor] = useGetReadableColor(themeColors.primaryMain);
// console.log(selectedPakeepsId)
  const iconsUtilsProps = {
    widthOfContainer,
    id: 'f',
    labels: [],
    iconsCloser: true,
    customColor,
    arrOfButtonNamesWhichSholudBeHidden:['picture','edit','checkbox','width','share']
  };

  return (
    <AppBar ref={ref}>
      <IconsUtils {...iconsUtilsProps} />
    </AppBar>
  );
};

HeaderWhenActiveSelecto.propTypes = {};

export default HeaderWhenActiveSelecto;
