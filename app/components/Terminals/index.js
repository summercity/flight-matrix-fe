import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';

const styles = () => ({
  terminals: {
    backgroundColor: '#A1887F',
    color: '#fff',
    fontSize: 14,
    border: '1px solid #000',
    padding: 2,
    textAlign: 'center',
  },
});

function Terminals(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <tr>
        <td className={classes.terminals} colSpan="6">
          <FormattedMessage {...messages.terminals} />
        </td>
      </tr>
    </React.Fragment>
  );
}

export default withStyles(styles)(Terminals);
