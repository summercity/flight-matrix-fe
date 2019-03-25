const Styles = () => ({
  root: {
    marginTop: -30,
    marginRight: 10,
    position: 'fixed',
    right: 0,
  },

  arrowButton: {
    background: '#023E54',
    padding: '0 0',
    minWidth: '40px',
    textAlign: 'center',
    display: 'inline',
    '&:hover': {
      backgroundColor: '#79CCCD',
    },
  },

  pages: {
    display: 'inline',
    fontSize: '12px',
    padding: '10px',
  },
});

export default Styles;
