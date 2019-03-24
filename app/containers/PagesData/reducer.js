/*
 *
 * PagesData reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_PAGE_DATA } from './constants';

export const initialState = fromJS({
  pageSize: 10,
  currentPage: 1,
  pageData: [],
});

function pagesDataReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_PAGE_DATA:
      return state
        .set('pageData', action.pageData)
        .set('currentPage', action.currentPage);
    default:
      return state;
  }
}

export default pagesDataReducer;
