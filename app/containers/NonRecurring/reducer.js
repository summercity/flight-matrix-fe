/*
 *
 * NonRecurring reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_OPEN_STATUS } from './constants';

export const initialState = fromJS({
  open: false,
  formData: {
    id: null,
    flightNo: null,
    destination: null,
    equipment: null,
    terminal: null,
    departure: '00:00',
    groundTime: 0,
    flightDate: null,
    status: '@pending',
  },
});

function nonRecurringReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_OPEN_STATUS:
      return state.set('open', action.open);
    default:
      return state;
  }
}

export default nonRecurringReducer;
