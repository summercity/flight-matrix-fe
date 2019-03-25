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

// import messages from './messages';
import saga from './saga';
import { getSchedulesAction } from './actions';
import { setPageDataAction, setCurrentPageAction } from '../PagesData/actions';
import reducer from './reducer';
import makeSelectSchedule from './selectors';
import makeSelectTimeFormat from '../TimeFormat/selectors';
import makeSelectTerminals from '../Terminals/selectors';
import makeSelectPagesData from '../PagesData/selectors';

import { filterByTerminal } from './helpers';
import { paginatedData } from '../../utils/helpers';
import Column from '../../components/Column';
import Terminals from '../Terminals';
import TimeFormat from '../TimeFormat';
import PagesData from '../PagesData';
import Styles from './style';

/* eslint-disable react/prefer-stateless-function */
export class Schedule extends React.Component {
  async componentDidMount() {
    await this.props.getSchedules();
  }

  componentDidUpdate(nextProps) {
    const { selectedFormat } = this.props.timeFormat;
    const { selectedTerminals } = this.props.terminals;
    const { initialPage, pageSize } = this.props.pagesData;
    const { preparedSchedules } = this.props.schedule;

    this.timeFormatSideEffect({
      selectedTerminals,
      selectedFormat,
      nextProps,
      preparedSchedules,
      pageSize,
    });
    this.terminalsSideEffect({
      initialPage,
      selectedTerminals,
      nextProps,
      preparedSchedules,
      pageSize,
    });
  }

  handleSelectedFlight = rd => {
    console.log(rd);
  };

  // Side Effects
  terminalsSideEffect({
    initialPage,
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
      this.props.setCurrentPage(initialPage);
      const pageData = paginatedData(filtered, initialPage, pageSize);
      this.props.setPageData(pageData);
    }
  }

  timeFormatSideEffect({
    selectedTerminals,
    selectedFormat,
    nextProps,
    preparedSchedules,
    pageSize,
  }) {
    if (selectedFormat !== nextProps.timeFormat.selectedFormat) {
      const filtered = filterByTerminal({
        preparedSchedules,
        selectedTerminals,
      });
      const pageData = paginatedData(filtered, pageSize);
      this.props.setPageData(pageData);
    }
  }

  handlePageChange = currentPage => {
    const { selectedTerminals } = this.props.terminals;
    const { pageSize } = this.props.pagesData;
    const { preparedSchedules } = this.props.schedule;
    const filtered = filterByTerminal({
      preparedSchedules,
      selectedTerminals,
    });
    const pageData = paginatedData(filtered, currentPage, pageSize);
    this.props.setPageData(pageData, currentPage);
  };

  render() {
    const { classes } = this.props;
    const { pageData } = this.props.pagesData;
    const { headers, selectedFormat } = this.props.timeFormat;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>Schedule</title>
          <meta name="description" content="Description of Schedule" />
        </Helmet>
        <TimeFormat />
        <PagesData onChange={this.handlePageChange} />
        {/* Todo make a separate component */}
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
              {pageData.data &&
                pageData.data.map(s => (
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
                    <div className={classes.badges}>
                      <span>{99}</span>
                    </div>
                    <span className={classes.spanHeaderTime}>{m.time}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.data &&
                pageData.data.map(s => (
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
  getSchedules: PropTypes.func.isRequired,
  setPageData: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  schedule: PropTypes.object.isRequired,
  timeFormat: PropTypes.object.isRequired,
  terminals: PropTypes.object.isRequired,
  pagesData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  schedule: makeSelectSchedule(),
  timeFormat: makeSelectTimeFormat(),
  terminals: makeSelectTerminals(),
  pagesData: makeSelectPagesData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSchedules: () => dispatch(getSchedulesAction()),
    setPageData: pageDta => dispatch(setPageDataAction(pageDta)),
    setCurrentPage: currentPage => dispatch(setCurrentPageAction(currentPage)),
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
