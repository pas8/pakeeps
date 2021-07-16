import { useTheme } from '@material-ui/core';
import { isArray, map } from 'lodash';
import { FC, useState } from 'react';
import SearchGroupItem from '../GroupItem';
import { useRouter } from 'next/dist/client/router';
import { allPakeeepsSearchPropertyies, DEFAULT, pakeepFoldersKeyName } from 'models/denotation';
import { useDispatch } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { NamesOfSearchPropertyiesType } from 'store/modules/App/types';
import SearchGroupContainerWithTitle from '../ContainerWithTitle';
import { useValidateColor } from 'hooks/useValidateColor.hook';

const SearchGroup: FC<{ title: any; list: any; onClose: () => void }> = ({ title, list, onClose }) => {
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
          return <SearchGroupItem title={key} arr={arr} key={key} color={color} onClick={onClick} />;
        })}
    </SearchGroupContainerWithTitle>
  );
};

export default SearchGroup;
