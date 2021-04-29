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

const useStyles = makeStyles(theme => ({
  container:{ 

  '& .MuiTimelineItem-missingOppositeContent:before' :{ flex:0}
    
  
  },
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }

}));

const DialogContentOfAddingCustomColorToColorLayouts = () => {
  const classes = useStyles();

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
      <Grid item>

        few
      </Grid>
    </Grid>
  );
};

export default DialogContentOfAddingCustomColorToColorLayouts;
