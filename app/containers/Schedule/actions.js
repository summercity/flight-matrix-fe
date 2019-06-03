/*
 *
 * Schedule actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_SCHEDULES_ACTION,
  SET_SCHEDULES_ACTION,
  SET_PREPARED_SCHEDULES_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getSchedulesAction() {
  return {
    type: GET_SCHEDULES_ACTION,
  };
}

export function setSchedulesAction(schedules) {
  return {
    type: SET_SCHEDULES_ACTION,
    schedules,
  };
}

export function setPreparedSchedulesAction(preparedSchedules) {
  return {
    type: SET_PREPARED_SCHEDULES_ACTION,
    preparedSchedules,
  };
}
