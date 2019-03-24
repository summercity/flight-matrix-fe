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
import { Schedules } from '../Schedule/helpers';

import { setSelectedFormatAction } from './actions';
import makeSelectTimeFormat from './selectors';

import { setPreparedSchedulesAction } from '../Schedule/actions';
import makeSelectSchedule from '../Schedule/selectors';

import reducer from './reducer';
import saga from './saga';

// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class TimeFormat extends React.PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    const { minutes, hourly } = this.props.timeFormat;
    let selectedFormat = {};
    if (value === 0) {
      selectedFormat = minutes;
    } else {
      selectedFormat = hourly;
    }
    const { schedules } = this.props.schedule;
    this.props.setSelectedFormat(selectedFormat);
    const preparedSchedules = Schedules({ schedules, selectedFormat });
    this.props.setPreparedSchedules(preparedSchedules);
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab label="EVERY 15 MINUTES" />
          <Tab label="EVERY HOUR" />
        </Tabs>
      </div>
    );
  }
}

TimeFormat.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  timeFormat: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
  setSelectedFormat: PropTypes.func.isRequired,
  setPreparedSchedules: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timeFormat: makeSelectTimeFormat(),
  schedule: makeSelectSchedule(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedFormat: selectedFormat =>
      dispatch(setSelectedFormatAction(selectedFormat)),
    setPreparedSchedules: preparedSchedules => 
      dispatch(setPreparedSchedulesAction(preparedSchedules)),
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
