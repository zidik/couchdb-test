import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = state => ({
  remoteDbStatus: 'TEST',
  editableUserIsInConflict: state.editableUser._conflicts !== undefined
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
