/*
 *
 * Status reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SET_OPEN_STATUS,
  SET_SELECTED_FLIGHT,
} from './constants';

export const initialState = fromJS({
  open: false,
  selectedFlight: [],
});

function statusReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_OPEN_STATUS:
      return state.set('open', action.open);
    case SET_SELECTED_FLIGHT:
      return state.set('selectedFlight', action.selectedFlight);
    default:
      return state;
  }
}

export default statusReducer;
