/**
 *
 * SideNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/BlurLinear';
import ScheduleIcon from '@material-ui/icons/EventNote';
// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import { setOpenStatusAction } from './actions';
import makeSelectSideNav from './selectors';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

/* eslint-disable react/prefer-stateless-function */
export class SideNav extends React.Component {
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleOpen = open => () => {
    this.props.setOpenStatus(open);
  };

  handleNavigation = () => {
    this.props.setOpenStatus(false);
  };

  render() {
    const { classes } = this.props;
    const { open } = this.props.sideNav;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link to="/">
            <ListItem button key={1}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link to="/recurring/schedules">
            <ListItem button key={2}>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="Schedules" />
            </ListItem>
          </Link>

          <Link to="/schedule">
            <ListItem button key={3}>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary={"Today's Schdule"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
    );

    return (
      // <div>
      //   <FormattedMessage {...messages.header} />
      // </div>
      <div>
        <Drawer open={open} onClose={this.handleOpen(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleNavigation}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

SideNav.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  setOpenStatus: PropTypes.func.isRequired,
  sideNav: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sideNav: makeSelectSideNav(),
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

const withReducer = injectReducer({ key: 'sideNav', reducer });
const withSaga = injectSaga({ key: 'sideNav', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(SideNav);
