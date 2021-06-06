import { Dialog } from '@material-ui/core'
import { Grid, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({}))

const DialogOfEditingDate = ({open,onClose}) => {
const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}>
      
    </Dialog>
  )
}

DialogOfEditingDate.propTypes = {}

export default DialogOfEditingDate