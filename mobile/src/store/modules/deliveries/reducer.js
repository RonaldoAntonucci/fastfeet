import produce from 'immer';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

const INITIAL_STATE = {
  deliveries: [],
  page: 0,
  totalPages: 1,

  loading: false,
  initialized: false,

  deliveredDeliveries: [],
  deliveredPage: 0,
  deliveredTotalPages: 1,
  deliveredLoading: false,
};

const formatDeliveries = data =>
  data.map(delivery => ({
    ...delivery,
    id: String(delivery.id),
    createdAt: format(new Date(delivery.createdAt), "dd'/'MM'/'y", {
      locale: pt,
    }),
  }));

const deliveries = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveries/SET_DELIVERIES': {
        if (action.payload.delivered) {
          draft.deliveredDeliveries = formatDeliveries(
            action.payload.deliveries
          );
          draft.deliveredPage += 1;
          draft.deliveredTotalPages = action.payload.totalPages;
          draft.deliveredLoading = false;
        } else {
          draft.deliveries = formatDeliveries(action.payload.deliveries);
          draft.page += 1;
          draft.totalPages = action.payload.totalPages;
          draft.loading = false;
        }

        draft.initialized = true;
        break;
      }
      case '@deliveries/ADD_DELIVERIES': {
        if (action.payload.delivered) {
          draft.deliveredDeliveries = [
            ...draft.deliveredDeliveries,
            ...formatDeliveries(action.payload.deliveries),
          ];
          draft.deliveredPage += 1;
          draft.deliveredTotalPages = action.payload.totalPages;
          draft.deliveredLoading = false;
        } else {
          draft.deliveries = [
            ...draft.deliveries,
            ...formatDeliveries(action.payload.deliveries),
          ];
          draft.page += 1;
          draft.totalPages = action.payload.totalPages;
          draft.loading = false;
        }

        draft.initialized = true;
        break;
      }
      case '@deliveries/LOAD_MORE_REQUEST': {
        if (action.payload.delivered) {
          draft.deliveredLoading = true;
        } else {
          draft.loading = true;
        }
        break;
      }
      case '@deliveries/LOAD_MORE_FAILURE': {
        if (action.payload.delivered) {
          draft.deliveredLoading = false;
        } else {
          draft.loading = false;
        }
        break;
      }
      default:
    }
  });
};

export default deliveries;
