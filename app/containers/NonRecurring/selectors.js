import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nonRecurring state domain
 */

const selectNonRecurringDomain = state =>
  state.get('nonRecurring', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NonRecurring
 */

const makeSelectNonRecurring = () =>
  createSelector(selectNonRecurringDomain, substate => substate.toJS());

export default makeSelectNonRecurring;
export { selectNonRecurringDomain };
