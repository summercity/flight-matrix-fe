import blue from '@material-ui/core/colors/blue';
const Styles = () => ({
  avatar: {
    borderRadius: 0,
    backgroundColor: '#023E54',
    color: blue[600],
  },

  dialogTitle: {
    color: 'red',
  },

  iconPending: {
    color: '#76FF03',
    fontSize: 30,
    writingMode: 'vertical-rl',
    transform: 'rotate(90deg)',
  },

  iconCancelled: {
    color: '#FF1744 !important',
    fontSize: 30,
    writingMode: 'vertical-rl',
    transform: 'rotate(90deg)',
  },

  iconOnSite: {
    color: '#FFFF00 !important',
    fontSize: 30,
  },

  iconCompleted: {
    color: '#FF3D00 !important',
    fontSize: 30,
  },
});

export default Styles;
