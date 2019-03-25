const Styles = theme => ({
  root: {
    background: '#023E54',
    padding: '0 0',
  },

  toggleButton: {
    padding: '0 0',
  },

  terminals: {
    backgroundColor: '#023E54',
    fontSize: '10px',
    color: '#fff',
    border: '1px solid #000',
    textAlign: 'center',
    fontWeight: 600,
    padding: '6px',
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
    fontSize: '35px',
  },
});

export default Styles;
