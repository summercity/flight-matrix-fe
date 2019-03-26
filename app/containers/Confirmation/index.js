/**
 *
 * Confirmation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectConfirmation from './selectors';
import { setOpenStatusAction } from './actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

/* eslint-disable react/prefer-stateless-function */
export class Confirmation extends React.Component {
  handleClose = () => {
    this.props.setOpenStatus(false);
  };

  render() {
    const { open } = this.props.confirmation;
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <FormattedMessage {...messages.header} />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <FormattedMessage {...messages.msg} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Confirmation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  setOpenStatus: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  confirmation: makeSelectConfirmation(),
});

function mapDispatchToProps(dispatch) {
  return {
    setOpenStatus: open => dispatch(setOpenStatusAction(open)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'confirmation', reducer });
const withSaga = injectSaga({ key: 'confirmation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Confirmation);
