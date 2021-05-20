import { Grid, makeStyles, Tabs, Tab, Drawer } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import PropTypes from 'prop-types';
import { useMeasure } from 'react-use';
import { useEffect } from 'react';
const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(10.32, 0, 0, 0),
    height: '100vh',
    // position: 'fixed',
    '& button:first-of-type': {
      borderTopRightRadius: 4
    },
    '& button:last-of-type': {
      borderBottomRightRadius: 4
    },
    '& .MuiTabs-indicator': {
      // height:'80%',
      width: 2,
      borderRadius: theme.spacing(0.8)
    },

    '& button': {
      textTransform: 'none',
      color: '#fff',
      minWidth: '40px',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
      // borderRadius:8,
      '&:focus': {
        opacity: 1
      },
      minHeight: 0,
      // marginTop: theme.spacing(1.4),
      // margin:theme.spacing(2,0),
      marginBottom: theme.spacing(0.8),
      padding: theme.spacing(1.48, 2.6),
      '& span': {
        flexDirection: 'row',
        '& svg': {
          fontSize: '1.8em'
          // margin: theme.spacing(0.8, 0.4, 0, 0)
        }
      }
    }
  }
}));

const Folders = ({ value, handleChange, folders, setMinWidthOfNav, isMenuOpen }) => {
  const classes = useStyles();
  const [ref, { width }] = useMeasure();

  useEffect(() => setMinWidthOfNav(width), [width]);
  console.log(width);

  const FoldersContainer = isMenuOpen ? Drawer : Grid;
  
  return (
    <FoldersContainer className={classes.container} open variant={'persistent'} anchor={'right'}>
      <Grid ref={ref}>
        <Tabs
          orientation={'vertical'}
          variant={'scrollable'}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth={false}
          aria-label={'Vertical folders'}
          // className={classes.tabs}
        >
          {folders.map(({ title, iconName }) => {
            const [icon] = useTakeIcon(iconName || 'infinity');
            return <Tab aria-label={title} icon={icon} />;
            // return <Tab icon={icon} aria-label={title} />;
          })}
        </Tabs>
      </Grid>
    </FoldersContainer>
  );
};

Folders.propTypes = {};

export default Folders;
