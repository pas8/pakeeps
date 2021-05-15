import { Grid, makeStyles, SvgIcon, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import MainBar from '../MainBar';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import LockButton from './components/LockButton';
import LabelTab from './components/LabelTab';
import PinIcon from 'components/Icons/components/PinIcon'
const useStyles = makeStyles(theme => ({
  upperPart: {
    maxHeight: theme.spacing(4.8)
  }
}));

const ViewLikeInTelegram = ({ handleDrawerOpen, isMenuOpen }) => {
  const classes = useStyles();

  return (
    <Grid container direction={'column'} >
      <Grid container direction={'row'} wrap={'nowrap'} className={classes.upperPart}>
        <Grid container alignItems={'center'}>
          <MainBar handleDrawerOpen={handleDrawerOpen} isMenuOpen={isMenuOpen} isSmallSize={!true} />
        </Grid>
        <Grid container alignItems={'flex-end'} direction={'row-reverse'}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <LockButton />
        </Grid>
      </Grid>
      <Grid item>
        <LabelTab />
      </Grid>
    </Grid>
  );
};

ViewLikeInTelegram.propTypes = {};

export default ViewLikeInTelegram;
