import { Container, Typography } from '@material-ui/core';
import Header from 'components/Header';
import NewPaKeep from 'components/NewPakeep';
import { connect } from 'react-redux';

const Pakeeps = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <NewPaKeep />
      <Typography variant={'h1'}>pakeep</Typography>
    </Container>
  );
};

const mapStateToProps = ({ app: { data } }) => ({ data });

// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(Pakeeps);
