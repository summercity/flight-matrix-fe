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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectSchedule from './selectors';
import makeSelectTimeFormat from '../TimeFormat/selectors';
import makeSelectTerminals from '../Terminals/selectors';

import { Schedules, filterByTerminal } from './helpers';
import { paginatedData } from '../../utils/helpers';
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
      currentPage: 1,
      totalPages: 0,
    };
  }

  componentDidMount() {
    const { schedules, pageSize } = this.props.schedule;
    const { selectedFormat } = this.props.timeFormat;
    const preparedSchedules = Schedules({ schedules, selectedFormat });

    const r = paginatedData(preparedSchedules, 1, pageSize);
    this.setState({
      preparedSchedules,
      totalPages: r.totalPages,
      currentPage: 1,
    });
  }

  componentDidUpdate(nextProps) {
    const { selectedFormat } = this.props.timeFormat;
    const { selectedTerminals } = this.props.terminals;
    const { schedules, pageSize } = this.props.schedule;
    const preparedSchedules = Schedules({ schedules, selectedFormat });

    this.timeFormatSideEffect({
      selectedFormat,
      nextProps,
      preparedSchedules,
      pageSize,
    });
    this.terminalsSideEffect({
      selectedTerminals,
      nextProps,
      preparedSchedules,
      pageSize,
    });
  }

  handleSelectedFlight = rd => {
    console.log(rd);
  };

  pageController = move => {
    const { totalPages } = this.state;
    let { currentPage } = this.state;
    if (move === '@prev') {
      if (currentPage !== 1) {
        currentPage -= 1;
      }
    } else if (move === '@next') {
      if (currentPage !== totalPages) {
        currentPage += 1;
      }
    }
    this.setState({ currentPage });
  };

  // Side Effects
  terminalsSideEffect({
    selectedTerminals,
    nextProps,
    preparedSchedules,
    pageSize,
  }) {
    if (selectedTerminals !== nextProps.terminals.selectedTerminals) {
      const filtered = filterByTerminal({
        preparedSchedules,
        selectedTerminals,
      });
      const r = paginatedData(filtered, 1, pageSize);
      this.setState({
        preparedSchedules: filtered,
        totalPages: r.totalPages,
        currentPage: 1,
      });
    }
  }

  timeFormatSideEffect({
    selectedFormat,
    nextProps,
    preparedSchedules,
    pageSize,
  }) {
    if (selectedFormat !== nextProps.timeFormat.selectedFormat) {
      const r = paginatedData(preparedSchedules, 1, pageSize);
      this.setState({
        preparedSchedules,
        totalPages: r.totalPages,
        currentPage: 1,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { pageSize } = this.props.schedule;
    const { preparedSchedules, currentPage } = this.state;
    const { headers, selectedFormat } = this.props.timeFormat;
    const pageData = paginatedData(preparedSchedules, currentPage, pageSize);
    return (
      <div className={classes.root}>
        <Helmet>
          <title>Schedule</title>
          <meta name="description" content="Description of Schedule" />
        </Helmet>
        <TimeFormat />
        {/* Todo make a separate component */}
        <Paper>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.pageController('@prev')}
            >
              <BackIcon />
            </Button>
            <span>{`Page: ${pageData.page} of ${pageData.totalPages}`}</span>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => this.pageController('@next')}
            >
              <ForwardIcon />
            </Button>
          </div>
        </Paper>
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
              <Terminals />
            </thead>
            <tbody>
              {pageData.data.map(s => (
                <tr
                  className={classNames(classes.tr, classes.dataDetails)}
                  key={s.id}
                >
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
              {pageData.data.map(s => (
                <tr
                  className={classNames(classes.tr, classes.controls)}
                  key={s.id}
                  onClick={() => this.handleSelectedFlight(s)}
                >
                  {s.types.map(t => (
                    <Column
                      key={`${t.key}child`}
                      className={classes.td}
                      iconPending={classes.iconPending}
                      iconCancelled={classes.iconCancelled}
                      iconOnSite={classes.iconOnSite}
                      iconCompleted={classes.iconCompleted}
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
  schedule: PropTypes.object.isRequired,
  timeFormat: PropTypes.object.isRequired,
  terminals: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  schedule: makeSelectSchedule(),
  timeFormat: makeSelectTimeFormat(),
  terminals: makeSelectTerminals(),
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
