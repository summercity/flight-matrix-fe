/**
 *
 * Status
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

import PendingIcon from '@material-ui/icons/AirplanemodeActive';
import CancelledIcon from '@material-ui/icons/AirplanemodeInactive';
import OnSiteIcon from '@material-ui/icons/LocalGasStation';
import CompletedIcon from '@material-ui/icons/CheckBox';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { setOpenStatusAction } from './actions';
import makeSelectStatus from './selectors';

const status = ['Cancelled', 'Pending', 'On-going', 'Completed'];

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

function statusIcon(s) {
  switch (s) {
    case 'Cancelled':
      return <CancelledIcon />;
    case 'Pending':
      return <PendingIcon />;
    case 'On-going':
      return <OnSiteIcon />;
    case 'Completed':
      return <CompletedIcon />;
    default:
      return null;
  }
}

export class Status extends React.Component {
  handleClose = () => {
    console.log('close');
  };

  handleListItemClick = value => {
    if (value === 'cancel') {
      this.props.setOpenStatus(false);
    }
  };

  render() {
    const { open } = this.props.status;
    const { classes } = this.props;
    return (
      <div>
        <Dialog onClose={this.handleClose} open={open}>
          <DialogTitle>
            <FormattedMessage {...messages.flt} /> GK 080
          </DialogTitle>
          <div>
            <List>
              {status.map(s => (
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(s)}
                  key={s}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>{statusIcon(s)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={s} />
                </ListItem>
              ))}
              <ListItem
                button
                onClick={() => this.handleListItemClick('cancel')}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItem>
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

Status.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  setOpenStatus: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
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

const withReducer = injectReducer({ key: 'status', reducer });
const withSaga = injectSaga({ key: 'status', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Status);
