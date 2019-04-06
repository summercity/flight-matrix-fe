export const Styles = theme => ({
  root: {
    maxWidth: '400px',
    marginTop: theme.spacing.unit * 3,
    margin: '0 auto',
    overflowX: 'auto',
  },
  heading: {
    marginTop: '-20px',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: 'none',
    backgroundColor: 'rgb(2, 62, 84)',
    color: '#fff',
    paddingLeft: '10px',
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },

  ButtonControl: {
    padding: '10px',
  },

  rightMargin10: {
    marginRight: '10px',
  },

  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  label: {
    color: '#006064 !important',
  },
  save: {
    color: '#023E54',
  },
});

export default Styles;
