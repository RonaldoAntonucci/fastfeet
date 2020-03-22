import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { loadMoreFailure, loadMoreSuccess } from './actions';

export function* loadMore({ payload }) {
  try {
    const { reset = false } = payload;
    const currentState = yield select(state => state.deliveries);
    const deliverymanId = yield select(state => state.auth.id);

    const page = currentState.page + 1;
    if (page > currentState.totalPages) {
      return;
    }

    const {
      data: { data, totalPages },
    } = yield call(
      api.get,
      `/deliverymen/${deliverymanId}/deliveries?quantity=10&page=${page}`
    );

    yield put(loadMoreSuccess({ deliveries: data, totalPages, reset }));
  } catch (err) {
    Alert.alert('Erro ao carregar as entregas', 'Verifique sua conexão.');
    yield put(loadMoreFailure());
  }
}

export default all([takeLatest('@deliveries/LOAD_MORE_REQUEST', loadMore)]);
