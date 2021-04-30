import { Button, DialogActions, Typography, withStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';
import GradientOutlinedIcon from '@material-ui/icons/GradientOutlined';

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))(ToggleButtonGroup);



// const dialogActionButtonUtilsArr =[

// {icon:FilterVintageOutlinedIcon,onClick:null,value}

// ]

const DialogActionsOfAddingCustomColorToColorLayouts = () => {
  return (
    <DialogActions>
      <StyledToggleButtonGroup
        size="small"
        value={'left'}
        exclusive
        // onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FilterVintageOutlinedIcon/>
        </ToggleButton>
        <ToggleButton value="right" aria-label="left aligned">
          <GradientOutlinedIcon/>
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Button>
        <Typography variant={'subtitle1'}> Disagree</Typography>
      </Button>
      <Button color={'primary'} autoFocus>
        <Typography variant={'subtitle1'}> Agree</Typography>
      </Button>
    </DialogActions>
  );
};

export default DialogActionsOfAddingCustomColorToColorLayouts;
