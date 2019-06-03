/**
 *
 * Authenticated
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAuthenticated from './selectors';
import reducer from './reducer';
import saga from './saga';

import TopNav from '../TopNav';

/* eslint-disable react/prefer-stateless-function */
export class Authenticated extends React.Component {
  componentDidMount() {
    const { authenticated } = this.props.authenticated;
    if (!authenticated) {
      // console.log( this.props.history)
    }
  }

  render() {
    const { authenticated } = this.props.authenticated;
    return (
      <div>
        <Helmet>
          <title>Authenticated</title>
          <meta name="description" content="Description of Authenticated" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        {authenticated ? <TopNav /> : <Redirect to="/login" />}
        {this.props.children}
      </div>
    );
  }
}

Authenticated.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'authenticated', reducer });
const withSaga = injectSaga({ key: 'authenticated', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Authenticated);
