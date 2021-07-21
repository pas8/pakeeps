import { find, values } from 'lodash';
import { useSelector } from 'react-redux';
import {
  ALL,
  attributesName,
  denotationOfDefaultPakeepPropetiesOfFolders,
  pakeepPropertyiesNames
} from 'models/denotation';
import { UseTakePakeepListPlaceholdersOfFolderPropertyiesType } from 'models/types';
import { AttributeGroupNames } from 'models/unums';
import { getGlobalFolderId, getLabels, getPakeeps, getGlobalEventsArr } from 'store/modules/App/selectors';

export const useTakePakeepListPlaceholdersOfFolderPropertyies: UseTakePakeepListPlaceholdersOfFolderPropertyiesType =
  () => {
    const folderId = useSelector(getGlobalFolderId);
    const pakeeps = useSelector(getPakeeps);
    const labels = useSelector(getLabels);
    const events = useSelector(getGlobalEventsArr);

    const findedGlobalLabelItem = find(labels, ({ id }) => id === folderId);
    const findedGlobalEventItem = find(events, ({ id }) => id === folderId);

    const useFindCorrectPlaceholderPropertyies = (property: keyof typeof pakeepPropertyiesNames) => {
      const arrLength = pakeeps.filter(el => !!el[property]).length;
      const result = !!arrLength
        ? false
        : {
            ...denotationOfDefaultPakeepPropetiesOfFolders[property],
            title: `Your ${denotationOfDefaultPakeepPropetiesOfFolders[property].title} pakeeps appear here`
          };

      return result;
    };

    const useFindCorrectPlaceholderOfAttributeGruop = (property: AttributeGroupNames) => {
      const arr = pakeeps.filter(el => {
        if (property === AttributeGroupNames.EVENT) return !!el[property].map(({ id }) => id).includes(folderId);
        return !!el[property].includes(folderId);
      });

      const findedItem = property === AttributeGroupNames.EVENT ? findedGlobalEventItem : findedGlobalLabelItem;

      const result =
        !!arr.length && !findedItem
          ? false
          : {
              iconName: findedItem?.iconName || property === AttributeGroupNames.EVENT ? 'view' : 'label',
              color: findedItem?.color,
              title: `Your pakeeps with ${property}_${findedItem?.title}  appear here`
            };

      return result;
    };

    if (folderId === ALL && !pakeeps.length) return { iconName: 'infinity', title: 'All your pakeeps appers here' };

    const propertyFolderId = folderId as keyof typeof pakeepPropertyiesNames;

    if (values(pakeepPropertyiesNames).includes(propertyFolderId))
      return useFindCorrectPlaceholderPropertyies(propertyFolderId);
    if (!!findedGlobalLabelItem) return useFindCorrectPlaceholderOfAttributeGruop(AttributeGroupNames.LABEL);

    if (!!findedGlobalEventItem) return useFindCorrectPlaceholderOfAttributeGruop(AttributeGroupNames.EVENT);

    return false;
  };
