export function loadMoreRequest({ reset = false, delivered = false } = {}) {
  return delivered
    ? {
        type: '@deliveries/DELIVERED_LOAD_MORE_REQUEST',
        payload: { reset },
      }
    : {
        type: '@deliveries/LOAD_MORE_REQUEST',
        payload: { reset },
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
