import { Grid, makeStyles } from '@material-ui/core';
// import { useSetScrollName } from 'hooks/useSetScrollName';
// import { debounce } from 'lodash';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { handleScrollDirectionName } from 'store/modules/App/operations';

const useStyles = makeStyles(theme => ({}));

// const ScrollLayout = ({ children, scrollDirectionName, handleScrollDirectionName }) => {
  const ScrollLayout = ({ children,  }) => {
  const classes = useStyles();

  //  useSetScrollName(handleScrollDirectionName)

  return <Grid container>{children}</Grid>;
};

ScrollLayout.propTypes = {
  children: PropTypes.node,
  // scrollDirectionName: PropTypes.string,
  // handleScrollDirectionName: PropTypes.func
};

// const mapStateToProps = ({ app: { scrollDirectionName } }) => ({ scrollDirectionName });
// const mapDispatchToProps = dispatch => ({
//   handleScrollDirectionName: data => dispatch(handleScrollDirectionName(data))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ScrollLayout);
export default ScrollLayout
