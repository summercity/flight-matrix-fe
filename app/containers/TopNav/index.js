/**
 *
 * TopNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import saga from './saga';
import reducer from './reducer';
import makeSelectTopNav from './selectors';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

/* eslint-disable react/prefer-stateless-function */
export class TopNav extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <Helmet>
          <title>TopNav</title>
          <meta name="description" content="Description of TopNav" />
        </Helmet>

        <div className={classes.root}>
          {/* <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
              }
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup> */}
          <AppBar position="static" style={{ backgroundColor: '#023E54' }}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Flight Matrix
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  topNav: makeSelectTopNav(),
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

const withConnect = connect(
  mapStateToProps,
  {},
);

const withReducer = injectReducer({ key: 'topNav', reducer });
const withSaga = injectSaga({ key: 'topNav', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(TopNav);
