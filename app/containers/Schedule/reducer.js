/*
 *
 * Schedule reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import { schedulesFaker } from './fakers';

export const initialState = fromJS({
  schedules: schedulesFaker  || [], // Todo convert to API
});

function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default scheduleReducer;
