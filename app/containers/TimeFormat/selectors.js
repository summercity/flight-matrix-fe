import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the timeFormat state domain
 */

const selectTimeFormatDomain = state => state.get('timeFormat', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TimeFormat
 */

const makeSelectTimeFormat = () =>
  createSelector(selectTimeFormatDomain, substate => substate.toJS());

export default makeSelectTimeFormat;
export { selectTimeFormatDomain };
