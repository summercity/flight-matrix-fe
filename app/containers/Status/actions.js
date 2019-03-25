/*
 *
 * Status actions
 *
 */

import { DEFAULT_ACTION, SET_OPEN_STATUS } from './constants';

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
