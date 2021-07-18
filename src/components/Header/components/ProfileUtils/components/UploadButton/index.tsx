import { FC } from 'react';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CloudDoneOutlinedIcon from '@material-ui/icons/CloudDoneOutlined';
import { useSelector } from 'react-redux';
import { getIsAllDataWasUploaded } from 'store/modules/App/selectors';

const UploadButton: FC = () => {
  const isAllDataWasUploaded = useSelector(getIsAllDataWasUploaded);

  return isAllDataWasUploaded ? <CloudDoneOutlinedIcon /> : <CloudUploadOutlinedIcon />;
};

export default UploadButton;
