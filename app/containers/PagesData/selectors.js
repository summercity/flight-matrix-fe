import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pagesData state domain
 */

const selectPagesDataDomain = state => state.get('pagesData', initialState);

/**
 * Other specific selectors
 */
const selectCurrentPage = () =>
  createSelector(selectPagesDataDomain, subState =>
    subState.get('currentPage'),
  );

/**
 * Default selector used by PagesData
 */

const makeSelectPagesData = () =>
  createSelector(selectPagesDataDomain, substate => substate.toJS());

export default makeSelectPagesData;
export { selectPagesDataDomain, selectCurrentPage };
