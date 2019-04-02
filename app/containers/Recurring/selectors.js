import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the recurring state domain
 */

const selectRecurringDomain = state => state.get('recurring', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Recurring
 */

const makeSelectRecurring = () =>
  createSelector(selectRecurringDomain, substate => substate.toJS());

export default makeSelectRecurring;
export { selectRecurringDomain };
