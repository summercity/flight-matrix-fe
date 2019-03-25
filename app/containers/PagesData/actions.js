/*
 *
 * PagesData actions
 *
 */

import { DEFAULT_ACTION, SET_PAGE_DATA, SET_CURRENT_PAGE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setPageDataAction(pageData) {
  return {
    type: SET_PAGE_DATA,
    pageData,
  };
}

export function setCurrentPageAction(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
}
