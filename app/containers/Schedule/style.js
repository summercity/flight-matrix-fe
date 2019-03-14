const Styles = theme => ({
  root: {
    width: '100%',
    padding: '10px',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },

  paper: {
    overflowX: 'scroll',
    position: 'relative',
  },

  tableFixed: {
    position: 'fixed',
    borderRadius: 3,
    borderStyle: 'hidden',
    display: 'inline',
    zIndex: 10,
    background: '#fff',
  },

  table: {
    top: 0,
    marginLeft: '303px',
    borderRadius: 3,
    borderStyle: 'hidden',
    display: 'inline',
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

  thFixed: {
    color: '#023E54',
    fontSize: 14,
    fontWeight: 700,
    border: '2px solid #79CCCD',
    padding: 5,
    textAlign: 'center',
    width: '50px',
    height: '39px',
    overflow: 'hidden',
  },

  thTime: {
    backgroundColor: '#79CCCD',
    color: '#023E54',
    fontFamily: `"Roboto", "Helvetica", "Arial", "sans-serif"`,
    fontSize: 18,
    border: '2px solid #023E54',
    padding: 5,
    textAlign: 'center',
    minWidth: '50px',
    height: '99px',
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
    minWidth: '50px',
    height: '36px',
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

// position: absolute;
//     width: 5em;
//     left: 0;
//     top: auto;
//     border-right: 0px none black;
//     border-top-width: 3px;
//     margin-top: -3px;
//     z-index: 109;
//     background: #fff;

// }

export default Styles;
