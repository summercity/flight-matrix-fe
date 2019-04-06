import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the users state domain
 */

const selectUsersDomain = state => state.get('users', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Users
 */

const makeSelectUsers = () =>
  createSelector(selectUsersDomain, substate => substate.toJS());

export default makeSelectUsers;
export { selectUsersDomain };
