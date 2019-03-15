import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import messages from './messages';

const styles = theme => ({
  terminals: {
    backgroundColor: '#FFD600',
    color: '#000',
    fontSize: 14,
    border: '1px solid #000',
    padding: 2,
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
});

class Terminals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alignment: ['1', '2', '3'],
    };
  }
  // handdleChange = (event, alignment) => {
  //   console.log("event", alignment);
  //   props.handleAlignment(event, alignment);
  // }

  handdleChange = (event, alignment) => this.setState({ alignment });

  render() {
    const { classes } = this.props;

    const { alignment } = this.state;
    return (
      <React.Fragment>
        <tr>
          <td className={classes.terminals} colSpan="6">
            <span>
              <FormattedMessage {...messages.terminals} />
            </span>
            <ToggleButtonGroup value={alignment} onChange={this.handdleChange}>
              <ToggleButton value="1">1</ToggleButton>
              <ToggleButton value="2">2</ToggleButton>
              <ToggleButton value="3">3</ToggleButton>
              <ToggleButton value="4">4</ToggleButton>
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
