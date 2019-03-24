/*
 *
 * PagesData actions
 *
 */

import { DEFAULT_ACTION, SET_PAGE_DATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setPageDataAction(pageData, currentPage = 1) {
  return {
    type: SET_PAGE_DATA,
    pageData,
    currentPage,
  };
}
