/**
 *
 * Recurring
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NewIcon from '@material-ui/icons/CalendarToday';
import SchedulePlanIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Create';

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

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

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
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickCreate = () => {
    this.props.history.push('/recurring/schedules/form');
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Recurring Schedules</title>
          <meta name="description" content="Description of Recurring" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <Paper className={classes.heading}>
          <h2>List of Schedules</h2>
        </Paper>
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
          <Button
            onClick={this.handleClickOpen}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
          >
            <SchedulePlanIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Schedule Plan
          </Button>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Flight #</CustomTableCell>
                <CustomTableCell align="right">Destination</CustomTableCell>
                <CustomTableCell align="right">Equipment</CustomTableCell>
                <CustomTableCell align="right">Terminal</CustomTableCell>
                <CustomTableCell align="right">Departure</CustomTableCell>
                <CustomTableCell align="right">Ground Time</CustomTableCell>
                <CustomTableCell align="right">Schedule Date</CustomTableCell>
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
                  <CustomTableCell align="right">
                    {row.fakerData1}
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    <Button
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
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}
            >
              Schedule Date
            </DialogTitle>
            <DialogContent>
              <TextField
                id="dateFrom"
                label="From"
                type="date"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="dateTo"
                label="To"
                type="date"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                variant="contained"
                size="small"
                className={classes.button}
              >
                <SchedulePlanIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Preview
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    );
  }
}

Recurring.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
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
