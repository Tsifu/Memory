import { connect } from 'react-redux';
import Game from './game';
import { fetchGiphy } from '../actions/giphy_action';

const mapStateToProps = state => ({
  giphy: state.giphy
});

const mapDispatchToProps = dispatch => ({
  fetchGiphy: () => dispatch(fetchGiphy())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
