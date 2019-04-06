/*
 *
 * Users reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({
  formData: {
    id: null,
    lastName: null,
    firstName: null,
  },
});

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default usersReducer;
