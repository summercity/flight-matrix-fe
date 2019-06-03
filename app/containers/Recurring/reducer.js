/*
 *
 * Recurring reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({
  formData: {
    id: null,
    flightNo: null,
    destination: null,
    equipment: null,
    terminal: null,
    departure: '00:00',
    groundTime: 0,
    scheduleDate: null,
    status: '@pending',
  },
});

function recurringReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default recurringReducer;
