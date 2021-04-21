import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

//! workaround
const DynamicComponentWithNoSSR = dynamic(() => import('components/NewPakeep'), {
  ssr: false
});

const Pakeeps = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <DynamicComponentWithNoSSR />
      {/* <Typography variant={'h1'}>pakeep</Typography> */}
    </Container>
  );
};

const mapStateToProps = ({ app: { data } }) => ({ data });

// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(Pakeeps);
