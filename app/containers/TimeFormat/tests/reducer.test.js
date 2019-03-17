import { fromJS } from 'immutable';
import timeFormatReducer from '../reducer';

describe('timeFormatReducer', () => {
  it('returns the initial state', () => {
    expect(timeFormatReducer(undefined, {})).toEqual(fromJS({}));
  });
});
