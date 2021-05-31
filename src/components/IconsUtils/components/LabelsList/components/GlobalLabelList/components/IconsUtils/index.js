import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButtonByPas from 'components/IconButton';

const IconsUtilsOfGlobalLabelListOflabelList = ({ onClickOfEditButton }) => (
  <Box mx={0.8}>
    <IconButtonByPas icon={EditOutlinedIcon} size={'small'}  onClick={onClickOfEditButton} />
  </Box>
);

IconsUtilsOfGlobalLabelListOflabelList.propTypes = {
  onClickOfEditButton: PropTypes.func
}

export default IconsUtilsOfGlobalLabelListOflabelList;
