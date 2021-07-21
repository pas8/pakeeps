import { FC } from 'react';
import ViewStreamOutlinedIcon from '@material-ui/icons/ViewStreamOutlined';
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';
import { useSelector } from 'react-redux';
import { getIsCurrentNumberOfPakeepColumnsIsOne } from 'store/modules/App/selectors';

const PakeepListViewChangerButton: FC = () => {
  const isCurrentNumberOfPakeepColumnsIsOne = useSelector(getIsCurrentNumberOfPakeepColumnsIsOne);


  return !isCurrentNumberOfPakeepColumnsIsOne ? <GridOnOutlinedIcon /> : <ViewStreamOutlinedIcon />;
};

export default PakeepListViewChangerButton;
