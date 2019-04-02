/**
 *
 * Recurring
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

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectRecurring from './selectors';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#79CCCD',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '98%',
    marginTop: theme.spacing.unit * 3,
    margin: '0 auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, fakerData1) {
  id += 1;
  return { id, name, fakerData1 };
}

const rows = [
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
  createData('ABC 000', 'value', 'value', 'value', 'value'),
];

/* eslint-disable react/prefer-stateless-function */
export class Recurring extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Recurring Schedules</title>
          <meta name="description" content="Description of Recurring" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Flight #</CustomTableCell>
                <CustomTableCell align="right">Destination</CustomTableCell>
                <CustomTableCell align="right">Equipment</CustomTableCell>
                <CustomTableCell align="right">Terminal</CustomTableCell>
                <CustomTableCell align="right">Departure</CustomTableCell>
                <CustomTableCell align="right">Ground Time</CustomTableCell>
                <CustomTableCell align="right">Departure Date</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Recurring.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recurring: makeSelectRecurring(),
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

const withReducer = injectReducer({ key: 'recurring', reducer });
const withSaga = injectSaga({ key: 'recurring', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Recurring);
