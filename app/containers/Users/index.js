/**
 *
 * Users
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

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NewIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Create';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUsers from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

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
  heading: {
    width: '98%',
    margin: '0 auto',
    color: 'rgb(2, 62, 84)',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

let id = 1;
function createData(name, fakerData1) {
  id += 1;
  return { id, name, fakerData1 };
}

const rows = [
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
  createData(id, 'Doe', 'value', 'value', 'value'),
];

/* eslint-disable react/prefer-stateless-function */
export class Users extends React.Component {
  handleClickCreate = () => {
    this.props.history.push('/users/form');
  };

  handleClickEdit = () => {
    this.props.history.push('/users/form/1');
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Users</title>
          <meta name="description" content="Description of Users" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <Paper className={classes.root}>
          <Button
            onClick={this.handleClickCreate}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
          >
            <NewIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Create
          </Button>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>id</CustomTableCell>
                <CustomTableCell align="right">Last Name</CustomTableCell>
                <CustomTableCell align="right">First Name</CustomTableCell>
                <CustomTableCell align="right">Username</CustomTableCell>
                <CustomTableCell align="right">Department</CustomTableCell>
                <CustomTableCell align="right">Email</CustomTableCell>
                <CustomTableCell align="center">Action</CustomTableCell>
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
                  <CustomTableCell align="center">
                    <Button
                      onClick={this.handleClickEdit}
                      variant="contained"
                      size="small"
                      className={classes.button}
                    >
                      <EditIcon
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall,
                        )}
                      />
                      Edit
                    </Button>
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

Users.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
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

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Users);
