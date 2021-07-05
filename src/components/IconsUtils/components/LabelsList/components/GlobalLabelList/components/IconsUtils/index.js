import { Box, SvgIcon } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButtonByPas from 'components/IconButton';
// const EditLabelIcon = () => {
//   return (
//     <SvgIcon viewBox="0 0 24 24">
//       <path
//         d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z"
//       />
//       {/* <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /> */}
//       {/* <path  d="M9 22C8.45 22 8 21.55 8 21V18H4C2.9 18 2 17.11 2 16V4C2 2.89 2.9 2 4 2H20C21.11 2 22 2.9 22 4V16C22 17.11 21.11 18 20 18H13.9L10.2 21.71C10 21.9 9.75 22 9.5 22H9M10 16V19.08L13.08 16H20V4H4V16H10M15.84 8.2L14.83 9.21L12.76 7.18L13.77 6.16C13.97 5.95 14.31 5.94 14.55 6.16L15.84 7.41C16.05 7.62 16.06 7.96 15.84 8.2M8 11.91L12.17 7.72L14.24 9.8L10.08 14H8V11.91Z" /> */}
//     </SvgIcon>
//   );
// };

const IconsUtilsOfGlobalLabelListOflabelList = ({ onClickOfEditButton, customColor }) => (
  <Box mx={0.4}>
    <IconButtonByPas icon={EditOutlinedIcon} size={'small'} onClick={onClickOfEditButton} customColor={customColor} fillOpacity={0.6}/>
  </Box>
);

IconsUtilsOfGlobalLabelListOflabelList.propTypes = { onClickOfEditButton: PropTypes.func };

export default IconsUtilsOfGlobalLabelListOflabelList;
