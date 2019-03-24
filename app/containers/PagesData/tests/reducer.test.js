import { fromJS } from 'immutable';
import pagesDataReducer from '../reducer';

describe('pagesDataReducer', () => {
  it('returns the initial state', () => {
    expect(pagesDataReducer(undefined, {})).toEqual(fromJS({}));
  });
});
