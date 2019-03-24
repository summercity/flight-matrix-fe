/*
 *
 * Schedule reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_SCHEDULES_ACTION,
  SET_PREPARED_SCHEDULES_ACTION,
} from './constants';

export const initialState = fromJS({
  schedules: {},
  preparedSchedules: {},
  pageSize: 10,
});

function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_PREPARED_SCHEDULES_ACTION:
      return state.set('preparedSchedules', action.preparedSchedules);
    case SET_SCHEDULES_ACTION:
      return state.set('schedules', action.schedules);
    default:
      return state;
  }
}

export default scheduleReducer;
