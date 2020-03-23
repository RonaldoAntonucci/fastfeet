import React, { useCallback, useState, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DeliveryCard from '~/components/DeliveryCard';
import Loading from '~/components/Loading';

import { loadMoreRequest } from '~/store/modules/deliveries/actions';

import Header from './Header';
import { FlatList } from './styles';

const List = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    deliveries,
    loading,
    deliveredDeliveries,
    deliveredLoading,
  } = useSelector(state => state.deliveries);

  const [delivered, setDelivered] = useState(false);

  const handleDetails = useCallback(
    item => navigation.navigate('Delivery', { item }),
    [navigation]
  );

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => (
    <DeliveryCard data={item} handleDetails={() => handleDetails(item)} />
  );

  const loadMoreDeliveries = useCallback(() => {
    if (loading) {
      return () => {};
    }
    return dispatch(loadMoreRequest());
  }, [dispatch, loading]);

  const loadMoreDeliveredDeliveries = useCallback(() => {
    if (deliveredLoading) {
      return () => {};
    }
    return dispatch(loadMoreRequest({ delivered: true }));
  }, [deliveredLoading, dispatch]);

  const data = useMemo(() => (delivered ? deliveredDeliveries : deliveries), [
    delivered,
    deliveredDeliveries,
    deliveries,
  ]);

  const loadMore = useMemo(
    () => (delivered ? loadMoreDeliveredDeliveries : loadMoreDeliveries),
    [delivered, loadMoreDeliveredDeliveries, loadMoreDeliveries]
  );

  const moreLoading = useMemo(() => {
    if ((delivered && deliveredLoading) || (!delivered && loading)) {
      return <Loading />;
    }
    return null;
  }, [delivered, deliveredLoading, loading]);

  const onRefresh = useCallback(
    () => dispatch(loadMoreRequest({ delivered, reset: true })),
    [delivered, dispatch]
  );

  const refreshing = useMemo(() => {
    if ((delivered && deliveredLoading) || loading) {
      return true;
    }
    return false;
  }, [delivered, deliveredLoading, loading]);

  return (
    <>
      <Header delivered={delivered} setDelivered={setDelivered} />
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={loadMore}
        ListFooterComponent={moreLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
};

List.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(List);
