/*
 *
 * TimeFormat reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_SELECTED_FORMAT } from './constants';
import { minutes, hourly, headers } from './data';

export const initialState = fromJS({
  minutes,
  hourly,
  headers,
  selectedFormat: minutes,
});

function timeFormatReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_SELECTED_FORMAT:
      return state.set('selectedFormat', action.selectedFormat);
    default:
      return state;
  }
}

export default timeFormatReducer;
