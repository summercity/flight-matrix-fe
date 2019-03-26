/*
 *
 * Status actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_OPEN_STATUS,
  SET_SELECTED_FLIGHT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setOpenStatusAction(open) {
  return {
    type: SET_OPEN_STATUS,
    open,
  };
}

export function setSelectedFlightAction(selectedFlight) {
  return {
    type: SET_SELECTED_FLIGHT,
    selectedFlight,
  };
}
