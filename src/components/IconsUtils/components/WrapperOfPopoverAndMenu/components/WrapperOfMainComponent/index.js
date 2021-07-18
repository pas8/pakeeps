import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const WrapperOfMainComponent = ({ children, ...wrapperOfMainComponentProps }) => (
  <Grid {...wrapperOfMainComponentProps} aria-haspopup={true}>
    {children}
  </Grid>
);

WrapperOfMainComponent.propTypes = {
  children: PropTypes.node
};

export default WrapperOfMainComponent;
