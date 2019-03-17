/**
 *
 * TimeFormat
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeSelectTimeFormat from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class TimeFormat extends React.PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return (
      <div>
        <Paper square style={{ marginBottom: '5px' }}>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="EVERY 15 MINUTES" />
            <Tab label="EVERY HOUR" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

TimeFormat.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timeFormat: makeSelectTimeFormat(),
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

const withReducer = injectReducer({ key: 'timeFormat', reducer });
const withSaga = injectSaga({ key: 'timeFormat', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TimeFormat);