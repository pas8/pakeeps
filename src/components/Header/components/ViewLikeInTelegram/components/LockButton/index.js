import { Grid, makeStyles, IconButton } from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  lockContainer: {
    margin: theme.spacing(-0.2, 0.6, 0.2, 0.6),
    perspective: '1000px',
    position: 'relative'
  },
  animate: {
    animation: '$mui-ripple-enter 400ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  box: {
    // borderWidth: 2.8,
    height: 14,
    width: 16,
    borderRadius: theme.spacing(0.32),
    // borderColor: 'white',
    // borderStyle: 'solid',
    background: 'white'
  },
  animateBox: {
    animation: '$box 400ms cubic-bezier(0.4, 0, 0.2, 1)',
    height: 14 + 1,
    width: 18,

  },

  '@keyframes box': {
    // '0%': {
    //   height: 16,
    //   width: 16,
    // },
    '42%': {
      height: 8,
      transform: 'rotate(4deg)'
    },
    '80%': {
      height: 14
    },
    '100%': {
      height: 16
    }
  },

  arch: {
    transform: 'translate(92%)',
    height: 10,
    width: 12,
    borderWidth: 2.8,
    borderRadius: theme.spacing(0.8),
    borderColor: 'white',
    borderStyle: 'solid',
    borderBottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex
    })
  },
  archAnimate: {
    transformStyle: 'preserve-3d',
    height: 10 - 1,

    transform: 'translateX(24%) rotateY(180deg)',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex,
      delay: theme.transitions.duration.shorter
    })
  },

  '@keyframes mui-ripple-enter': {
    '0%': {
      transform: 'rotate(0deg)'
      // margin: theme.spacing(0.2, 0.8, 0.2, 0.8)
    },
    '42%': {
      transform: 'rotate(-24deg)'
      // margin: theme.spacing(1, 0.8, 0.2, 0.8)
    },
    '80%': {
      transform: 'rotate(8deg)'
      // margin: theme.spacing(0, 0.8, 0.8, 0.8)
    },
    '100%': {
      transform: 'rotate(0deg)'
    }
  },
  points: {
    position: 'absolute',
    top: theme.spacing(0.6),
    left: theme.spacing(0.2),
    '& div': {
      height: theme.spacing(0),
      width: theme.spacing(0),
      borderRadius: '8%',
      backgroundColor: 'white'
    }
  },
  animatePoints: {
    '& div:nth-child(1)': {
      animation: '$animatePointsDiv1  600ms 0ms '
    },
    '& div:nth-child(2)': {
      animation: '$animatePointsDiv2 500ms 100ms '
    },
    '& div:nth-child(3)': {
      animation: '$animatePointsDiv3  400ms 200ms '
    },
    '& div:nth-child(4)': {
      animation: '$animatePointsDiv4  300ms 100ms '
    }
  },

  '@keyframes animatePointsDiv1': {
    '0%': {
      height: theme.spacing(0.1),
      width: theme.spacing(0.2)
    },
    '60%': {
      height: theme.spacing(0.4),
      width: theme.spacing(0.62),
      transform: 'translateX(-4px)   translateY(-6px)  rotate(80deg)'
    }
  },
  '@keyframes animatePointsDiv2': {
    '0%': {
      height: theme.spacing(0.1),
      width: theme.spacing(0.42)
    },
    '80%': {
      height: theme.spacing(0.6),
      width: theme.spacing(0.2),
      transform: 'translateX(-8px)  translateY(-4px)  rotate(45deg)'
    }
  },
  '@keyframes animatePointsDiv3': {
    '0%': {
      height: theme.spacing(0.2),
      width: theme.spacing(0.42)
    },
    '100%': {
      height: theme.spacing(0.2),
      width: theme.spacing(0.42),
      transform: 'translateX(-8px)  translateY(0px) rotate(15deg)'
    }
  },
  '@keyframes animatePointsDiv4': {
    '0%': {
      height: theme.spacing(0.4),
      width: theme.spacing(0.2)
    },
    '20%': {
      height: theme.spacing(0.2),
      width: theme.spacing(0.42),
      transform: 'translateX(-8px)  translateY(-8px) rotate(-15deg)'
    }
  },
  circle: {
    height: 6,
    width: 6,
    backgroundColor: '#424242',
    borderRadius: '50%'
  }
}));

const LockButton = () => {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const handleState = () => setState(e => !e);

  return (
    <IconButton onClick={handleState}>
      <Grid
        item
        alignItems={'center'}
        direction={'column'}
        className={clsx(classes.lockContainer, state && classes.animate)}
      >
        <Grid className={clsx(classes.points, state && classes.animatePoints)}>
          <Grid />
          <Grid />
          <Grid />
          <Grid />
        </Grid>
        <Grid className={clsx(classes.arch, state && classes.archAnimate)} item></Grid>
        <Grid
          alignItems={'center'}
          justify={'center'}
          className={clsx(classes.box, state && classes.animateBox)}
          container
          item
        >
          <Grid className={classes.circle}></Grid>
        </Grid>
      </Grid>
    </IconButton>
  );
};

LockButton.propTypes = {};

export default LockButton;
