import { FC } from 'react';
import { Box } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButtonByPas from 'components/IconButton';
import { IconsUtilsOfGlobalLabelListOflabelListPropsType } from '../LabelElement/types';

const IconsUtilsOfGlobalLabelListOflabelList: FC<IconsUtilsOfGlobalLabelListOflabelListPropsType> = ({
  onClickOfEditButton,
  customColor
}) => (
  <Box mx={0.4}>
    <IconButtonByPas
      icon={EditOutlinedIcon}
      size={'small'}
      onClick={onClickOfEditButton}
      customColor={customColor}
      fillOpacity={0.6}
    />
  </Box>
);

export default IconsUtilsOfGlobalLabelListOflabelList;
