/*
 *
 * Authenticated reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_AUTHENTICATION_ACTION } from './constants';

export const initialState = fromJS({
  authenticated: false,
});

function authenticatedReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_AUTHENTICATION_ACTION:
      return state.set('authenticated', action.authenticated);
    default:
      return state;
  }
}

export default authenticatedReducer;
