import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the confirmation state domain
 */

const selectConfirmationDomain = state =>
  state.get('confirmation', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Confirmation
 */

const makeSelectConfirmation = () =>
  createSelector(selectConfirmationDomain, substate => substate.toJS());

export default makeSelectConfirmation;
export { selectConfirmationDomain };
