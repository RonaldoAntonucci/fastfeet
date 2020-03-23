import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { loadMoreFailure, loadMoreSuccess } from './actions';

export function* loadMore({ payload }) {
  try {
    const { reset = false } = payload;
    const currentState = yield select(state => state.deliveries);
    const deliverymanId = yield select(state => state.auth.id);

    const page = reset ? 1 : currentState.page + 1;
    if (!reset && page > currentState.totalPages) {
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

export function* deliveredLoadMore({ payload }) {
  try {
    const { reset = false } = payload;
    const currentState = yield select(state => state.deliveries);
    const deliverymanId = yield select(state => state.auth.id);

    const page = reset ? 1 : currentState.deliveredPage + 1;
    if (!reset && page > currentState.deliveredTotalPages) {
      return;
    }

    const {
      data: { data, totalPages },
    } = yield call(
      api.get,
      `/deliverymen/${deliverymanId}/deliveries?quantity=10&page=${page}&delivered=true`
    );

    yield put(
      loadMoreSuccess({ deliveries: data, totalPages, reset, delivered: true })
    );
  } catch (err) {
    Alert.alert('Erro ao carregar as entregas', 'Verifique sua conexão.');
    yield put(loadMoreFailure({ delivered: true }));
  }
}

export default all([
  takeLatest('@deliveries/LOAD_MORE_REQUEST', loadMore),
  takeLatest('@deliveries/DELIVERED_LOAD_MORE_REQUEST', deliveredLoadMore),
  takeLatest('@deliveries/REFRESH', loadMore),
  takeLatest('@deliveries/REFRESH', deliveredLoadMore),
]);
