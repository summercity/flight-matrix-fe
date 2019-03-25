import { all, fork, call, put, select, takeLatest } from 'redux-saga/effects';
import services from '../../services';

import { Schedules } from './helpers';
import { paginatedData } from '../../utils/helpers';

import { selectSelectedFormat } from '../TimeFormat/selectors';
import makeSelectPagesData from '../PagesData/selectors';

import { GET_SCHEDULES_ACTION } from './constants';
import { setPreparedSchedulesAction, setSchedulesAction } from './actions';
import { setPageDataAction } from '../PagesData/actions';

export function* getSchedules() {
  try {
    const schedules = yield call(services.schedules.get);
    yield put(setSchedulesAction(schedules));

    const selectedFormat = yield select(selectSelectedFormat());

    const preparedSchedules = Schedules({ schedules, selectedFormat });
    yield put(setPreparedSchedulesAction(preparedSchedules));

    const { pageSize } = yield select(makeSelectPagesData());

    const pageData = paginatedData(preparedSchedules, 1, pageSize);
    yield put(setPageDataAction(pageData));
  } catch (e) {
    console.log(e);
  }
}

export function* watchForGetSchedules() {
  yield takeLatest(GET_SCHEDULES_ACTION, getSchedules);
}

export default function* scheduleSaga() {
  yield all([fork(watchForGetSchedules)]);
}
