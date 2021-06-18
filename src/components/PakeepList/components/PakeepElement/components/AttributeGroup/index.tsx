import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';
import { connect, useDispatch } from 'react-redux';
import { reverse } from 'lodash';
import { toChangeGlobalLabelItem, toChangeGlobalLabels } from 'store/modules/App/actions';
import { ILabelElement } from 'store/modules/App/types';
import { FC } from 'react';
import { AttributeGroupPropsType } from './types';
const useStyles = makeStyles(theme => ({
  labelsContainerClass: { marginTop: theme.spacing(0.8) }
}));

const AttributeGroup: FC<AttributeGroupPropsType> = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  pakeepId,
  customColor,
  parentBackgrounColor,
  globalEvents,
  events,
  timeFormat,
  timeAndDateFromat
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChangeGlobalLabelItem = (changedLabel: ILabelElement) => {
    dispatch(toChangeGlobalLabelItem({ changedLabel }));
  };

  const labelPartProps = {
    labels,
    handleDeleteLabelFromPakeepFunc,
    pakeepId,
    handleChangeGlobalLabelItem,
    customColor,
    parentBackgrounColor
  };

  const eventsPartProps = { globalEvents, events, customColor, timeFormat, timeAndDateFromat };

  const isAttributeGroupOrderIsReverse = false;

  const partsArr = [
    { Component: EventsPart, props: eventsPartProps },
    { Component: LabelPart, props: labelPartProps }
  ];

  const validatedPartsArr = isAttributeGroupOrderIsReverse ? reverse(partsArr) : partsArr;

  return (
    <Grid spacing={1} container className={classes.labelsContainerClass}>
      {validatedPartsArr.map(({ Component, props }, idx) => (
        <Component {...props} key={idx} />
      ))}
    </Grid>
  );
};

export default AttributeGroup;
