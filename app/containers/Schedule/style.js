const Styles = theme => ({
  root: {
    width: '100%',
    padding: '10px',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },

  paper: {
    padding: 10,
  },

  table: {
    borderRadius: 3,
    borderStyle: 'hidden',
    boxShadow: '0 0 0 3px #023E54',
  },
  th: {
    color: '#023E54',
    fontSize: 14,
    fontWeight: 700,
    border: '2px solid #79CCCD',
    padding: 5,
    textAlign: 'center',
    width: '50px',
    overflow: 'hidden',
  },

  thTime: {
    backgroundColor: '#023E54',
    color: '#fff',
    fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
    fontSize: 18,
    border: '2px solid #79CCCD',
    padding: 5,
    textAlign: 'center',
    width: '50px',
    overflow: 'hidden',
    letterSpacing: '0.0075em',
  },

  spanHeaderTime: {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
  },

  tr: {
    border: '2px solid #79CCCD',
  },

  td: {
    backgroundColor: '#023E54',
    color: '#00C853',
    fontSize: 12,
    fontWeight: 700,
    border: '2px solid #79CCCD',
    padding: 2,
    textAlign: 'center',
  },

  icon: {
    fontSize: 30,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },

  iconSmall: {
    fontSize: 20,
  },
});

export default Styles;
