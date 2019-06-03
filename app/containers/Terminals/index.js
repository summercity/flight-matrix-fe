import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
import Looks3 from '@material-ui/icons/Looks3';
import Looks4 from '@material-ui/icons/Looks4';
import messages from './messages';

import saga from './saga';
import reducer from './reducer';
import { setSelectedTerminalsAction } from './actions';
import makeSelectTerminals from './selectors';
import Styles from './style';

export class Terminals extends React.Component {
  handdleChange = (event, terminals) => {
    this.props.setSelectedTerminals(terminals);
  };

  render() {
    const { classes } = this.props;

    const { selectedTerminals } = this.props.terminals;
    return (
      <React.Fragment>
        <tr>
          <td className={classes.terminals} colSpan="6">
            <span>
              <FormattedMessage {...messages.terminals} />
            </span>
            <ToggleButtonGroup
              className={classes.root}
              value={selectedTerminals}
              onChange={this.handdleChange}
            >
              <ToggleButton className={classes.toggleButton} value="1">
                <LooksOne className={classes.icon} />
              </ToggleButton>
              <ToggleButton className={classes.toggleButton} value="2">
                <LooksTwo className={classes.icon} />
              </ToggleButton>
              <ToggleButton className={classes.toggleButton} value="3">
                <Looks3 className={classes.icon} />
              </ToggleButton>
              <ToggleButton className={classes.toggleButton} value="4">
                <Looks4 className={classes.icon} />
              </ToggleButton>
            </ToggleButtonGroup>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

Terminals.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  terminals: PropTypes.object.isRequired,
  setSelectedTerminals: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  terminals: makeSelectTerminals(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTerminals: selectedTerminals =>
      dispatch(setSelectedTerminalsAction(selectedTerminals)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'terminals', reducer });
const withSaga = injectSaga({ key: 'terminals', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(Styles),
)(Terminals);
