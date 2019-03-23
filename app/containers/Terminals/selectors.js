import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the terminals state domain
 */

const selectTerminalsDomain = state => state.get('terminals', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Terminals
 */

const makeSelectTerminals = () =>
  createSelector(selectTerminalsDomain, substate => substate.toJS());

export default makeSelectTerminals;
export { selectTerminalsDomain };
