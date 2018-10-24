import { connect } from 'react-redux';
import Component from './component';
import { selectedUserIsInConflict } from './selectors';

const mapStateToProps = (state, { onInstallRequest, canBeInstalled }) => ({
  remoteDbStatus: 'TEST',
  selectedUserIsInConflict: selectedUserIsInConflict(state),
  onInstallRequest,
  canBeInstalled
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
