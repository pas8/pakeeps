import {
  TimelineItem,
  Timeline,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot
} from '@material-ui/lab';
import { makeStyles, Typography, Paper, Grid } from '@material-ui/core';
import CustomColor from 'components/ColorPicker/components/CustomColor';
import { useState } from 'react';
import CenteredGrid from 'components/CenteredGrid';

const useStyles = makeStyles(theme => ({
  container: {
    '& .MuiTimelineItem-missingOppositeContent:before': { flex: 0 }
  },
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const DialogContentOfAddingCustomColorToColorLayouts = ({ customColorsInHexFormat }) => {
  const [lastSelectedColor, setLastSelectedColor] = useState(customColorsInHexFormat);
  const [transparencyStatus, setTransparencyStatus] = useState(false);

  const [colorPatterState, setColorPatterState] = useState();

  const classes = useStyles();
  const customColorProps = { setColor: setLastSelectedColor, color: lastSelectedColor, transparencyStatus };

  const dialogContentColorsArr = [{ title: 'Main color', prevueColor: customColorsInHexFormat }];

  return (
    <Grid className={classes.container} container>
      <Grid item>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Eat
                </Typography>
                <Typography>Because you need strength</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
      <Paper item elevation={8} >
        <CenteredGrid>
          <CustomColor {...customColorProps} />
        </CenteredGrid>
      </Paper>
    </Grid>
  );
};

export default DialogContentOfAddingCustomColorToColorLayouts;
