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
import CompletedIcon from '@material-ui/icons/EventAvailable';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { DialogTitle } from '../../components/Dialog';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { setOpenStatusAction } from './actions';
import { setOpenStatusAction as setConfirmOpenAction } from '../Confirmation/actions';
import makeSelectStatus from './selectors';
import Styles from './style';

const status = ['Cancelled', 'Pending', 'On-going', 'Completed'];

function statusIcon({ s, classes }) {
  switch (s) {
    case 'Cancelled':
      return <CancelledIcon className={classes.iconCancelled} />;
    case 'Pending':
      return <PendingIcon className={classes.iconPending} />;
    case 'On-going':
      return <OnSiteIcon className={classes.iconOnSite} />;
    case 'Completed':
      return <CompletedIcon className={classes.iconCompleted} />;
    default:
      return null;
  }
}

export class Status extends React.Component {
  handleListItemClick = value => {
    if (value === 'cancel') {
      this.props.setOpenStatus(false);
    } else {
      this.props.setOpenStatus(false);
      // This can open in SAGA when API is ready
      this.props.setConfirmOpen(true);
    }
  };

  render() {
    const { open, selectedFlight } = this.props.status;
    const { classes } = this.props;
    return (
      <div>
        <Dialog open={open}>
          <DialogTitle>
            <FormattedMessage {...messages.flt} /> {selectedFlight.flightNo}
          </DialogTitle>
          <Divider />
          <div>
            <List>
              {status.map(s => (
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(s)}
                  key={s}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      {statusIcon({ s, classes })}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={s} />
                </ListItem>
              ))}
              <Divider />
              <ListItem
                button
                onClick={() => this.handleListItemClick('cancel')}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ClearIcon />
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
  setConfirmOpen: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    setOpenStatus: open => dispatch(setOpenStatusAction(open)),
    setConfirmOpen: open => dispatch(setConfirmOpenAction(open)),
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
  withStyles(Styles),
)(Status);
