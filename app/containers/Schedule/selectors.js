import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the schedule state domain
 */

const selectScheduleDomain = state => state.get('schedule', initialState);

/**
 * Other specific selectors
 */


/**
 * Default selector used by Schedule
 */


const makeSelectSchedule = () =>
  createSelector(selectScheduleDomain, substate => substate.toJS());

export default makeSelectSchedule;
export { 
  selectScheduleDomain,
};
