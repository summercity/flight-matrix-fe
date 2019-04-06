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
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ReturnIcon from '@material-ui/icons/KeyboardReturn';

// import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectRecurring from './selectors';
import Styles from './style';
/* eslint-disable react/prefer-stateless-function */
export class UserForm extends React.Component {
  handleChange = event => {
    console.log(event);
  };

  onTimeChange(time) {
    console.log(time);
  }

  handleClickReturn = () => {
    this.props.history.push('/users');
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { formData } = this.props.users;
    return (
      <div>
        <Helmet>
          <title>User Form</title>
          <meta name="description" content="Description of Recurring" />
        </Helmet>
        <Paper className={classes.heading}>
          <h2>{this.props.match.params.id ? 'Update' : 'Create'}</h2>
        </Paper>
        <Paper className={classes.root}>
          <div className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Last Name
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                First Name
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Department
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Email
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Username
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Password
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label} htmlFor="component-simple">
                Confirm Password
              </InputLabel>
              <Input
                id="component-simple"
                onChange={this.handleChange}
                value={formData.lastName}
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

UserForm.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  users: PropTypes.object.isRequired,
  match: PropTypes.object,
  formData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectRecurring(),
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
)(UserForm);
