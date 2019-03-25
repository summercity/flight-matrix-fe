/*
 *
 * Status reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_OPEN_STATUS } from './constants';

export const initialState = fromJS({
  open: true,
  selectedFlight: {},
});

function statusReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_OPEN_STATUS:
      return state.set('open', action.open);
    default:
      return state;
  }
}

export default statusReducer;
