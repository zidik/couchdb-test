import { connect } from 'react-redux';
import Component from './component';
import { selectedUserIsInConflict } from './selectors';

const mapStateToProps = (state, { onInstallClick }) => ({
  remoteDbStatus: 'TEST',
  selectedUserIsInConflict: selectedUserIsInConflict(state),
  onInstallClick
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
