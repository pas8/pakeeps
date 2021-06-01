import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButtonByPas from 'components/IconButton';

const IconsUtilsOfGlobalLabelListOflabelList = ({ onClickOfEditButton ,customColor}) => (
  <Box mx={0.4}>
    <IconButtonByPas icon={EditOutlinedIcon} size={'small'}  onClick={onClickOfEditButton} customColor={customColor} />
  </Box>
);

IconsUtilsOfGlobalLabelListOflabelList.propTypes = {  onClickOfEditButton: PropTypes.func}

export default IconsUtilsOfGlobalLabelListOflabelList;
