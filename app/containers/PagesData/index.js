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
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import makeSelectPagesData from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class PagesData extends React.Component {
  pageController = move => {
    const { totalPages } = this.props.pagesData.pageData;
    let { currentPage } = this.props.pagesData;

    if (move === '@prev') {
      if (currentPage !== 1) {
        currentPage -= 1;
      }
    } else if (move === '@next') {
      if (currentPage !== totalPages) {
        currentPage += 1;
      }
    }
    this.props.onChange(currentPage);
  };

  render() {
    const { pageData } = this.props.pagesData;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.pageController('@prev')}
        >
          <BackIcon />
        </Button>
        <span>{`Page: ${pageData.page} of ${pageData.totalPages}`}</span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.pageController('@next')}
        >
          <ForwardIcon />
        </Button>
      </div>
    );
  }
}

PagesData.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
  pagesData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pagesData: makeSelectPagesData(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(PagesData);
