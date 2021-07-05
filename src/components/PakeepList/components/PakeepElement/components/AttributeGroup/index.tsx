import { reverse } from 'lodash';
import { FC, memo } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import LabelPart from './components/LabelPart';
import EventsPart from './components/EventsPart';
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
  events
}) => {
  const classes = useStyles();

  const labelPartProps = {
    labels,
    handleDeleteLabelFromPakeepFunc,
    pakeepId,
    customColor,
    parentBackgrounColor
  };

  const eventsPartProps = { events, customColor };

  const isAttributeGroupOrderIsReverse = false;

  const partsArr = [
    { Component: EventsPart, props: eventsPartProps },
    { Component: LabelPart, props: labelPartProps }
  ];

  const validatedPartsArr = isAttributeGroupOrderIsReverse ? reverse(partsArr) : partsArr;

  return (
    <Grid spacing={1} container className={classes.labelsContainerClass}>
      {validatedPartsArr.map(({ Component, props }, idx) => (
        //@ts-ignore
        <Component {...props} key={idx} />
      ))}
    </Grid>
  );
};

export default memo(AttributeGroup);
