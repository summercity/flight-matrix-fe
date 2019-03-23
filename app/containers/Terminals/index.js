import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
import Looks3 from '@material-ui/icons/Looks3';
import Looks4 from '@material-ui/icons/Looks4';
import messages from './messages';

const styles = theme => ({
  root: {
    background: '#D50000',
    padding: '0 0',
  },

  toggleButton: {
    padding: '0 0',
  },

  terminals: {
    backgroundColor: '#FFD600',
    color: '#000',
    border: '1px solid #000',
    textAlign: 'center',
  },

  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
  icon: {
    fontSize: '50px',
  },
});

class Terminals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terminal: ['1', '2', '3'],
    };
  }

  handdleChange = (event, terminal) => {
    this.setState({ terminal });
    this.props.onChange(terminal);
  };

  render() {
    const { classes } = this.props;

    const { terminal } = this.state;
    return (
      <React.Fragment>
        <tr>
          <td className={classes.terminals} colSpan="6">
            <span>
              <FormattedMessage {...messages.terminals} />
            </span>
            <ToggleButtonGroup
              className={classes.root}
              value={terminal}
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
        {/* <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <div className={classes.toggleContainer}>

            </div>
          </Grid>
        </Grid> */}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Terminals);
