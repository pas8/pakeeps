import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { iconsArr } from 'components/Icons';
import { Grid, Chip, makeStyles } from '@material-ui/core';
import { nanoid } from 'nanoid';
import PreviewEventList from './components/PreviewEventList';
import { useCurrentEvents } from 'hooks/useCurrentEvents.hook';
import compareFunc from 'compare-func';
import { useFindCurrentEvents } from 'hooks/useFindCurrentEvents.hook';

const EventsPart = ({ globalEvents = [], events = [], timeFormat, timeAndDateFromat, ...previewEventListProps }) => {
  const sortedEvents = events.sort(compareFunc('value'));

  const currentEventsArr = useFindCurrentEvents(globalEvents, sortedEvents, timeFormat, timeAndDateFromat);
  const allPreviewEventListProps = {
    ...previewEventListProps,
    validatedCurrentEvents: events,
    currentEventsArr
  };
  
  return (
    <>
      <PreviewEventList {...allPreviewEventListProps} />
    </>
  );
};

EventsPart.propTypes = {
  events: PropTypes.array,
  globalEvents: PropTypes.array,
  timeAndDateFromat: PropTypes.string,
  timeFormat: PropTypes.string
};

export default EventsPart;
