export function loadMoreRequest({ reset = false, delivered = false } = {}) {
  return {
    type: '@deliveries/LOAD_MORE_REQUEST',
    payload: { reset, delivered },
  };
}

export function loadMoreFailure({ delivered = false } = {}) {
  return {
    type: '@deliveries/LOAD_MORE_FAILURE',
    payload: { delivered },
  };
}

export function loadMoreSuccess({
  deliveries,
  totalPages,
  reset = false,
  delivered = false,
}) {
  return reset
    ? {
        type: '@deliveries/SET_DELIVERIES',
        payload: { deliveries, totalPages, delivered },
      }
    : {
        type: '@deliveries/ADD_DELIVERIES',
        payload: { deliveries, totalPages, delivered },
      };
}
