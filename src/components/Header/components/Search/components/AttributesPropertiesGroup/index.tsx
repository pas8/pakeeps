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
import { useTakeIcon } from 'hooks/useTakeIcon.hook';

const AttributesPropertiesGroup: FC<
  DefaultSearchGroupPropsType & {
    arr: { color: string; title: string; iconName: string; id: string }[];
    defaultIconName: string;
  }
> = ({ title, arr, defaultFunc, defaultIconName }) => {
  const [isListHidden, setIsListHidden] = useState(true);

  const { palette } = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SearchGroupContainerWithTitle title={title} isListHidden={isListHidden} setIsListHidden={setIsListHidden}>
      {!isListHidden &&
        arr.map(({ title: itemTitle, color, id, iconName }, idx) => {
          if (!isArray(arr)) return null;

          const newColor = color !== DEFAULT ? useValidateColor(color) : palette.secondary.main;

          const onClick = () => {
            router.push('/');
            dispatch(
              toChangeTemporaryData({
                newTemporaryData: {
                  globalFolderId: id
                }
              })
            );
            defaultFunc();
          };

          const [customIcon] = useTakeIcon(iconName || defaultIconName);
          return (
            <SearchGroupItem
              customIcon={customIcon}
              title={itemTitle}
              key={`${title}_${itemTitle}_${idx}`}
              color={newColor}
              onClick={onClick}
            />
          );
        })}
    </SearchGroupContainerWithTitle>
  );
};

export default AttributesPropertiesGroup;
