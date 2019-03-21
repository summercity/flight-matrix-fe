/*
 *
 * TimeFormat actions
 *
 */

import { 
  DEFAULT_ACTION ,
  SET_SELECTED_FORMAT
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

/**
 * @description This will set the selected time format for the scheduling....
 */
export function setSelectedFormatAction(selectedFormat) {
  return {
    type: SET_SELECTED_FORMAT,
    selectedFormat
  };
}
