/*
 *
 * Authenticated actions
 *
 */

import { DEFAULT_ACTION, SET_AUTHENTICATION_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setAuthenticationAction(authenticated) {
  return {
    type: SET_AUTHENTICATION_ACTION,
    authenticated,
  };
}
