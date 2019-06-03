export const Styles = theme => ({
  root: {
    maxWidth: '1000px',
    marginTop: theme.spacing.unit * 3,
    margin: '0 auto',
    overflowX: 'auto',
  },
  heading: {
    maxWidth: '1000px',
    margin: '0 auto',
    color: 'rgb(2, 62, 84)',
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
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
