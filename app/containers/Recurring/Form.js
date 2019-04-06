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
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TimeField from 'react-simple-timefield';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ReturnIcon from '@material-ui/icons/KeyboardReturn';

// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectRecurring from './selectors';
import Styles from './style';
/* eslint-disable react/prefer-stateless-function */
export class RecurringForm extends React.Component {
  handleChange = event => {
    console.log(event);
  };

  onTimeChange(time) {
    console.log(time);
  }

  handleClickReturn = () => {
    this.props.history.push('/recurring/schedules');
  };

  render() {
    const { classes } = this.props;
    const { formData } = this.props.recurring;
    return (
      <div>
        <Helmet>
          <title>Recurring Form</title>
          <meta name="description" content="Description of Recurring" />
        </Helmet>
        <Paper className={classes.heading}>
          <h2>Create</h2>
        </Paper>
        <Paper className={classes.root}>
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Flight Number
              </InputLabel>
              <Input id="component-simple" onChange={this.handleChange} />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Destination
              </InputLabel>
              <Input id="component-simple" onChange={this.handleChange} />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Equipment
              </InputLabel>
              <Input id="component-simple" onChange={this.handleChange} />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Terminal</InputLabel>
              <Select
                value=""
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Ground Time</InputLabel>
              <Select
                value=""
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={90}>90</MenuItem>
                <MenuItem value={120}>120</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Departure
              </InputLabel>
              <TimeField
                input={<Input />}
                value={formData.departure}
                onChange={this.onTimeChange}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <TextField
                id="dateTo"
                label="Schedule Date"
                type="date"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </div>
          <div className={classes.ButtonControl}>
            <Button
              onClick={this.handleClickReturn}
              variant="outlined"
              size="small"
              color="secondary"
              className={classNames(classes.button, classes.rightMargin10)}
            >
              <ReturnIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Back
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save changes
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

RecurringForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  recurring: PropTypes.object.isRequired,
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
  withStyles(Styles),
)(RecurringForm);
