/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import LoginIcon from '@material-ui/icons/Send';

import { setAuthenticationAction } from '../Authenticated/actions';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import Styles from './style';
/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  handleClickLogin = () => {
    this.props.setAuthentication(true);
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;
    const { formData } = this.props.login;
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <Paper className={classes.root}>
          <Paper className={classes.heading}>
            <h2>Login</h2>
          </Paper>
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Username
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Password
              </InputLabel>
              <Input id="component-simple" onChange={this.handleChange} />
            </FormControl>
          </div>
          <div className={classes.formControl}>
            <Button
              onClick={this.handleClickLogin}
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              <LoginIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              <span> Login</span>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  formData: PropTypes.object,
  login: PropTypes.object.isRequired,
  setAuthentication: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    setAuthentication: authenticated =>
      dispatch(setAuthenticationAction(authenticated)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(Styles),
)(Login);
