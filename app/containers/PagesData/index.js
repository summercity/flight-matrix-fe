/**
 *
 * PagesData
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import SkipPrevIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { setCurrentPageAction } from './actions';
import makeSelectPagesData from './selectors';
import reducer from './reducer';
import saga from './saga';
import Styles from './style';

/* eslint-disable react/prefer-stateless-function */
export class PagesData extends React.Component {
  pageController = move => {
    const { totalPages } = this.props.pagesData.pageData;
    let { currentPage } = this.props.pagesData;

    if (move === '@prev') {
      if (currentPage !== 1 && currentPage > 0) {
        currentPage -= 1;
      }
    } else if (move === '@next') {
      if (currentPage !== totalPages && currentPage < totalPages) {
        currentPage += 1;
      }
    } else if (move === '@skip-prev') {
      if (currentPage !== 1) {
        currentPage -= 5;
        currentPage = currentPage < 0 ? 1 : currentPage;
      }
    } else if (move === '@skip-next') {
      if (currentPage !== totalPages) {
        currentPage += 5;
        currentPage = currentPage > totalPages ? totalPages : currentPage;
      }
    }
    this.props.setCurrentPage(currentPage);
    this.props.onChange(currentPage);
  };

  render() {
    const { classes } = this.props;
    const { pageData } = this.props.pagesData;
    return (
      <div className={classes.root}>
        <Button
          className={classes.arrowButton}
          variant="contained"
          color="primary"
          onClick={() => this.pageController('@skip-prev')}
        >
          <SkipPrevIcon />
        </Button>
        <Button
          className={classes.arrowButton}
          variant="contained"
          color="primary"
          onClick={() => this.pageController('@prev')}
        >
          <BackIcon />
        </Button>
        <div className={classes.pages}>
          <span>{`Page: ${pageData.page} of ${pageData.totalPages}`}</span>
        </div>
        <Button
          className={classes.arrowButton}
          variant="contained"
          color="primary"
          onClick={() => this.pageController('@next')}
        >
          <ForwardIcon />
        </Button>
        <Button
          className={classes.arrowButton}
          variant="contained"
          color="primary"
          onClick={() => this.pageController('@skip-next')}
        >
          <SkipNextIcon />
        </Button>
      </div>
    );
  }
}

PagesData.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  pagesData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pagesData: makeSelectPagesData(),
});

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: currentPage => dispatch(setCurrentPageAction(currentPage)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pagesData', reducer });
const withSaga = injectSaga({ key: 'pagesData', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(Styles),
)(PagesData);
