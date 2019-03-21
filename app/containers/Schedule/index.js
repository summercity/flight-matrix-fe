/**
 *
 * Schedule
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { filter, flatMapDeep, orderBy } from 'lodash';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSchedule from './selectors';
import makeSelectTimeFormat from '../TimeFormat/selectors';

import { Schedules } from './helpers';
import Column from '../../components/Column';
import Terminals from '../Terminals';
import TimeFormat from '../TimeFormat';
import Styles from './style';

/* eslint-disable react/prefer-stateless-function */
export class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preparedSchedules: [],
    };
  }

  componentDidMount() {
    const { schedules } = this.props.schedule;
    const { selectedFormat } = this.props.timeFormat
    const preparedSchedules = Schedules({ schedules, selectedFormat });
    this.setState({ preparedSchedules });
  }

  componentDidUpdate (nextProps) {
    const { selectedFormat } = this.props.timeFormat;
    const { schedules } = this.props.schedule;
    if (selectedFormat != nextProps.timeFormat.selectedFormat) {
      const preparedSchedules = Schedules({ schedules, selectedFormat });
      this.setState({ selectedFormat, preparedSchedules });
    }
  }

  handleTerminal = terminal => {
    const { schedules } = this.props.schedule
    const { selectedFormat } = this.props.timeFormat;
    const preparedSchedules = Schedules({ schedules, selectedFormat });
    let filteredData = [];
    if (terminal.length > 0) {
      Object.keys(terminal).forEach(t => {
        const r = filter(preparedSchedules, { terminal: terminal[t] });
        if (r.length > 0) filteredData.push(r);
      });
      // Todo Create Order State
      const orderState = orderBy(
        flatMapDeep(filteredData),
        ['terminal'],
        ['asc'],
      );
      this.setState({ preparedSchedules: orderState });
    } else {
      filteredData = preparedSchedules;
    }

  };

  render() {
    const { classes } = this.props;
    const { preparedSchedules } = this.state;
    const { headers, selectedFormat } = this.props.timeFormat
    return (
      <div className={classes.root}>
        <Helmet>
          <title>Schedule</title>
          <meta name="description" content="Description of Schedule" />
        </Helmet>
        <TimeFormat />
        <Paper className={classes.paper}>
          <table className={classes.tableFixed}>
            <thead>
              <tr className={classes.tr}>
                {headers.map(h => (
                  <th key={h.key} className={classes.thFixed}>
                    {h.text}
                  </th>
                ))}
              </tr>
              <Terminals onChange={this.handleTerminal} />
            </thead>
            <tbody>
              {preparedSchedules.map(s => (
                <tr className={classes.tr} key={s.id}>
                  <td className={classes.td}>{s.flightNo}</td>
                  <td className={classes.td}>{s.destination}</td>
                  <td className={classes.td}>{s.equipment}</td>
                  <td className={classes.td}>{s.terminal}</td>
                  <td className={classes.td}>{s.departure}</td>
                  <td className={classes.td}>{s.groundTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tr}>
                {selectedFormat.map(m => (
                  <th key={m.key} className={classes.thTime} rowSpan="2">
                    <span className={classes.spanHeaderTime}>{m.time}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preparedSchedules.map(s => (
                <tr className={classes.tr} key={s.id}>
                  {s.types.map(t => (
                    <Column
                      key={`${t.key}child`}
                      className={classes.td}
                      classIcon={classes.icon}
                      type={t.type}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>
    );
  }
}

Schedule.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  schedule: makeSelectSchedule(),
  timeFormat: makeSelectTimeFormat()
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

const withReducer = injectReducer({ key: 'schedule', reducer });
const withSaga = injectSaga({ key: 'schedule', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(Styles),
)(Schedule);
