import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `/deliverymen/${id}`);

    const { data: user } = response;

    if (!user) {
      Alert.alert('Erro no login', 'O ID é inválido.');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'ID invalido');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
