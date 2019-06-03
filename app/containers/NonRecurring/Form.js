/**
 *
 * NonRecurring
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TimeField from 'react-simple-timefield';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../../components/Dialog';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectNonRecurring from './selectors';
import { setOpenStatusAction } from './actions';
import Styles from './style';

/* eslint-disable react/prefer-stateless-function */
export class NonRecurring extends React.Component {
  handleClose = () => {
    this.props.setOpenStatus(false);
  };

  handleChange = event => {
    console.log(event);
  };

  onTimeChange(time) {
    console.log(time);
  }

  render() {
    const { classes } = this.props;
    const { open, formData } = this.props.nonRecurring;
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            <FormattedMessage className={classes.label} {...messages.header} />
          </DialogTitle>
          <DialogContent>
            <Paper>
              <div className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.label}
                    htmlFor="component-simple"
                  >
                    Flight Number
                  </InputLabel>
                  <Input id="component-simple" onChange={this.handleChange} />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.label}
                    htmlFor="component-simple"
                  >
                    Destination
                  </InputLabel>
                  <Input id="component-simple" onChange={this.handleChange} />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel
                    className={classes.label}
                    htmlFor="component-simple"
                  >
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
                  <InputLabel
                    className={classes.label}
                    htmlFor="component-simple"
                  >
                    Departure
                  </InputLabel>
                  <TimeField
                    input={<Input />}
                    value={formData.departure}
                    onChange={this.onTimeChange}
                  />
                </FormControl>
              </div>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.save}
              onClick={this.handleClose}
              color="primary"
            >
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

NonRecurring.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  setOpenStatus: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nonRecurring: makeSelectNonRecurring(),
});

function mapDispatchToProps(dispatch) {
  return {
    setOpenStatus: open => dispatch(setOpenStatusAction(open)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'nonRecurring', reducer });
const withSaga = injectSaga({ key: 'nonRecurring', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(Styles),
)(NonRecurring);
