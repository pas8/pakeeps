import { useTheme } from '@material-ui/core';
import { isArray, map } from 'lodash';
import { FC, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';

import { allPakeeepsSearchPropertyies, DEFAULT, pakeepFoldersKeyName } from 'models/denotation';
import { DefaultSearchGroupPropsType } from 'components/Header/types';
import { useValidateColor } from 'hooks/useValidateColor.hook';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { NamesOfSearchPropertyiesType } from 'store/modules/App/types';
import SearchGroupItem from '../GroupItem';
import SearchGroupContainerWithTitle from '../ContainerWithTitle';

const PakeepPropertiesSearchGroup: FC<DefaultSearchGroupPropsType & { list: any }> = ({ title, list, onClose }) => {
  const [isListHidden, setIsListHidden] = useState(true);

  const { palette } = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SearchGroupContainerWithTitle title={title} isListHidden={isListHidden} setIsListHidden={setIsListHidden}>
      {!isListHidden &&
        map(list, (arr, key: NamesOfSearchPropertyiesType) => {
          if (!isArray(arr)) return null;

          const isPropertyPakeepColor =
            title === allPakeeepsSearchPropertyies.backgroundColor || title === allPakeeepsSearchPropertyies.color;

          const color = isPropertyPakeepColor && title !== DEFAULT ? useValidateColor(key) : palette.secondary.main;

          const onClick = () => {
            router.push('/');
            dispatch(
              toChangeTemporaryData({
                newTemporaryData: {
                  searchPropertyies: { name: title, value: key },
                  globalFolderId: pakeepFoldersKeyName.SEARCH
                }
              })
            );
            onClose();
          };
          return <SearchGroupItem title={key} label={`${arr.length}`} key={key} color={color} onClick={onClick} />;
        })}
    </SearchGroupContainerWithTitle>
  );
};

export default PakeepPropertiesSearchGroup;
