import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the topNav state domain
 */

const selectTopNavDomain = state => state.get('topNav', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TopNav
 */

const makeSelectTopNav = () =>
  createSelector(selectTopNavDomain, substate => substate.toJS());

export default makeSelectTopNav;
export { selectTopNavDomain };
