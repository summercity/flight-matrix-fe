/*
 *
 * Terminals actions
 *
 */

import { DEFAULT_ACTION, SET_SELECTED_TERMINALS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

/**
 * @description This will set the selected terminals for the scheduling....
 */
export function setSelectedTerminalsAction(selectedTerminals) {
  return {
    type: SET_SELECTED_TERMINALS,
    selectedTerminals,
  };
}
