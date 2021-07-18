import { Button } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { FC } from 'react';
import { ButtonOfUdatingSettingPropsType } from './types';

const ButtonOfUdatingSetting: FC<ButtonOfUdatingSettingPropsType> = ({ onClick, title }) => {
  return (
    <Button onClick={onClick} color={'primary'} variant={'outlined'} startIcon={<CloudUploadOutlinedIcon />}>
      {title}
    </Button>
  );
};

export default ButtonOfUdatingSetting;
