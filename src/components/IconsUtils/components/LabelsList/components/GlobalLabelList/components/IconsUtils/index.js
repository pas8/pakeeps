import { Box, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const IconsUtilsOfGlobalLabelListOflabelList = ({ onClickOfEditButton }) => (
  <Box mx={0.8}>
    <IconButton onClick={onClickOfEditButton}>
      <EditOutlinedIcon />
    </IconButton>
  </Box>
);

IconsUtilsOfGlobalLabelListOflabelList.propTypes = {};

export default IconsUtilsOfGlobalLabelListOflabelList;
