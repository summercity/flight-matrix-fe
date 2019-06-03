import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authenticated state domain
 */

const selectAuthenticatedDomain = state =>
  state.get('authenticated', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Authenticated
 */

const makeSelectAuthenticated = () =>
  createSelector(selectAuthenticatedDomain, substate => substate.toJS());

export default makeSelectAuthenticated;
export { selectAuthenticatedDomain };
