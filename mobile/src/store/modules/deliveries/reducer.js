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

const formatDelivery = delivery => ({
  ...delivery,
  id: String(delivery.id),
  createdAt: format(new Date(delivery.createdAt), "dd'/'MM'/'y", {
    locale: pt,
  }),
});

const concatByKey = (prevArray, newArray) => {
  const data = prevArray;
  const newData = [];
  newArray.forEach(delivery => {
    const formattedDelivery = formatDelivery(delivery);
    const index = data.findIndex(d => d.id === formattedDelivery.id);
    if (index !== '-1') {
      newData.push(formattedDelivery);
    } else {
      data[index] = formattedDelivery;
    }
  });
  return [...data, ...newData];
};

const deliveries = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveries/SET_DELIVERIES': {
        if (action.payload.delivered) {
          draft.deliveredDeliveries = concatByKey(
            [],
            action.payload.deliveries
          );
          draft.deliveredPage += 1;
          draft.deliveredTotalPages = action.payload.totalPages;
          draft.deliveredLoading = false;
        } else {
          draft.deliveries = concatByKey([], action.payload.deliveries);
          draft.page += 1;
          draft.totalPages = action.payload.totalPages;
          draft.loading = false;
        }

        draft.initialized = true;
        break;
      }
      case '@deliveries/ADD_DELIVERIES': {
        if (action.payload.delivered) {
          draft.deliveredDeliveries = concatByKey(
            draft.deliveredDeliveries,
            action.payload.deliveries
          );

          draft.deliveredPage += 1;
          draft.deliveredTotalPages = action.payload.totalPages;
          draft.deliveredLoading = false;
        } else {
          draft.deliveries = concatByKey(
            draft.deliveries,
            action.payload.deliveries
          );
          draft.page += 1;
          draft.totalPages = action.payload.totalPages;
          draft.loading = false;
        }

        draft.initialized = true;
        break;
      }
      case '@deliveries/LOAD_MORE_REQUEST': {
        if (draft.page + 1 <= draft.totalPages) {
          draft.loading = true;
        }
        break;
      }
      case '@deliveries/DELIVERED_LOAD_MORE_REQUEST': {
        if (draft.deliveredPage + 1 <= draft.deliveredTotalPages) {
          draft.deliveredLoading = true;
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
      case '@deliveries/REFRESH': {
        draft.deliveries = [];
        draft.page = 0;
        draft.totalPages = 1;
        draft.loading = true;

        draft.initialized = false;

        draft.deliveredDeliveries = [];
        draft.deliveredPage = 0;
        draft.deliveredTotalPages = 1;
        draft.deliveredLoading = true;
        break;
      }
      default:
    }
  });
};

export default deliveries;
