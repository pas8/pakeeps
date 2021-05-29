import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { handleSetPreviusOrderNames, handleSetOrderNamesOfPinnedPakeepsThunk } from 'store/modules/App/operations';
import dynamic from 'next/dynamic';
import {
  getCurrentFolderPropertyIdx,
  getFolders,
  getIsUsePreviuosOrder,
  getPakeeps,
  getPakeepsOrderNames,
  getPinnedPakeepsOrderNames
} from 'store/modules/App/selectors';
import { difference, filter, flatten } from 'lodash';
import WrapperOfContainerOfPakeepList from './components/WrapperOfContainer';
import { useRef, useState } from 'react';
import SelectofFPakeepListContainer from './components/WrapperOfContainer/components/Container/components/Selecto';
// const WrapperOfContainerOfPakeepList = dynamic(() => import(), {
//   loading: () => (
//     <Grid style={{ height: '80vh', width: '100%' }} container alignItems={'center'} justify={'center'}>
//       <CircularProgress />
//     </Grid>
//   ),
//   ssr: false
// });

const PakeepList = ({
  pakeeps,
  pakeepsOrderNames,
  currentFolderPropertyIdx,
  folders,
  pinnedPakeepsOrderNames,
  handleSetPreviusOrderNames,
  handleSetOrderNamesOfPinnedPakeepsThunk
}) => {
  const [isPakeepDragging, setIsPakeepDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const flattenFolder = flatten(folders);
  const folderProperty = flattenFolder[currentFolderPropertyIdx]?.property;
  const folderId = flattenFolder[currentFolderPropertyIdx]?.id;

  const isFolderPropertyIsAll = folderProperty === 'ALL';
  const pinnedPakeeps = filter(pakeeps, ({ isPinned }) => !!isPinned);
  // console.log(pinnedPakeepsOrderNames)

  const defaultPakeepListContainerProps = {
    folderProperty,
    folderId,
    isSelecting
  };

  const wrapperOfContainerOfPinnedPakeepListProps = {
    columnOfPakeepListContainerProps: { ...defaultPakeepListContainerProps, isPakeepDragContextPinned: isFolderPropertyIsAll },
    pakeeps: pinnedPakeeps,
    setIsPakeepDragging,
    pakeepsOrderNames: pinnedPakeepsOrderNames,
    handleSetPreviusOrderNamesFunc: handleSetOrderNamesOfPinnedPakeepsThunk
  };

  const wrapperOfContainerOfAllPakeepListProps = {
    columnOfPakeepListContainerProps: { ...defaultPakeepListContainerProps, isPakeepDragContextPinned: false },
    setIsPakeepDragging,
    pakeeps,
    pakeepsOrderNames,
    handleSetPreviusOrderNamesFunc: handleSetPreviusOrderNames
  };
  const scrollerRef = useRef(null);

  const selectofFPakeepListContainerProps = {
    scrollerRef,
    setSelectedIds,
    setIsSelecting
  };
  return (
    <>
      <Grid ref={scrollerRef} className={'selectoContainer'}>
        {isFolderPropertyIsAll && <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfPinnedPakeepListProps} />}

        <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfAllPakeepListProps} />
        {!isPakeepDragging && <SelectofFPakeepListContainer {...selectofFPakeepListContainerProps} />}
      </Grid>
    </>
  );
};

PakeepList.propTypes = {
  changePakeepColumnsDataThunk: PropTypes.func,
  changeTwoPakeepColumnsDataThunk: PropTypes.func,
  columnOrder: PropTypes.shape({
    slice: PropTypes.func
  }),
  columns: PropTypes.any,
  labels: PropTypes.any,
  pakeeps: PropTypes.any
};

const mapStateToProps = ({
  app: { pakeeps, pakeepsOrderNames, currentFolderPropertyIdx, folders, isUsePreviuosOrder, pinnedPakeepsOrderNames }
}) => ({
  pakeeps: getPakeeps(pakeeps),
  pakeepsOrderNames: getPakeepsOrderNames(pakeepsOrderNames),
  pinnedPakeepsOrderNames: getPinnedPakeepsOrderNames(pinnedPakeepsOrderNames),
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders)
});
const mapDispatchToProps = dispatch => ({
  handleSetPreviusOrderNames: orderNames => dispatch(handleSetPreviusOrderNames(orderNames)),
  // handlePakeepsOrderNamesThunk: newOrder => dispatch(handlePakeepsOrderNamesThunk(newOrder)),
  handleSetOrderNamesOfPinnedPakeepsThunk: orderNames => dispatch(handleSetOrderNamesOfPinnedPakeepsThunk(orderNames))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
