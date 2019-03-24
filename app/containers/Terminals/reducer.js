/*
 *
 * Terminals reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_SELECTED_TERMINALS } from './constants';

export const initialState = fromJS({
  selectedTerminals: ['1', '2', '3'],
});

function terminalsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_SELECTED_TERMINALS:
      return state.set('selectedTerminals', action.selectedTerminals);
    default:
      return state;
  }
}

export default terminalsReducer;
