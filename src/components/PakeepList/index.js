import PropTypes from 'prop-types';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  handleSetPreviusOrderNames,
  handlePakeepsOrderNamesThunk,
  handleSetOrderNamesOfPinnedPakeepsThunk
} from 'store/modules/App/operations';
import dynamic from 'next/dynamic';
import {
  getCurrentFolderPropertyIdx,
  getFolders,
  getIsUsePreviuosOrder,
  getPakeeps,
  getPakeepsOrderNames,
  getPinnedPakeepsOrderNames
} from 'store/modules/App/selectors';
import { flatten } from 'lodash';

const WrapperOfContainerOfPakeepList = dynamic(() => import('./components/WrapperOfContainer'), {
  loading: () => (
    <Grid style={{ height: '80vh', width: '100%' }} container alignItems={'center'} justify={'center'}>
      <CircularProgress />
    </Grid>
  ),
  ssr: false
});

const PakeepList = ({
  pakeeps,
  pakeepsOrderNames,
  currentFolderPropertyIdx,
  folders,
  handleSetPreviusOrderNames,
  isUsePreviuosOrder = false
}) => {
  const flattenFolder = flatten(folders);

  const folderProperty = flattenFolder[currentFolderPropertyIdx]?.property;
  const folderId = flattenFolder[currentFolderPropertyIdx]?.id;

  const wrapperOfContainerOfPinnedPakeepListProps = {};
  const wrapperOfContainerOfAllPakeepListProps = {
    pakeepListContainerProps: {}
  };

  return (
    <>
      <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfAllPakeepListProps} />
      <WrapperOfContainerOfPakeepList {...wrapperOfContainerOfPinnedPakeepListProps} />
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
  isUsePreviuosOrder: getIsUsePreviuosOrder(isUsePreviuosOrder),
  folders: getFolders(folders)
});
const mapDispatchToProps = dispatch => ({
  handleSetPreviusOrderNames: orderNames => dispatch(handleSetPreviusOrderNames(orderNames)),
  handlePakeepsOrderNamesThunk: newOrder => dispatch(handlePakeepsOrderNamesThunk(newOrder)),
  handleSetOrderNamesOfPinnedPakeepsThunk: newOrder => dispatch(handleSetOrderNamesOfPinnedPakeepsThunk(newOrder))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepList);
