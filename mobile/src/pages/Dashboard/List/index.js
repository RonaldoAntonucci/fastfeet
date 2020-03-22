import React, { useCallback, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';

import DeliveryCard from '~/components/DeliveryCard';
import Loading from '~/components/Loading';

import { loadMoreRequest } from '~/store/modules/deliveries/actions';

import Header from './Header';

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
  const renderItem = useCallback(
    ({ item }) => (
      <DeliveryCard data={item} handleDetails={() => handleDetails(item)} />
    ),
    [handleDetails]
  );

  const loadMoreDeliveries = useCallback(() => {
    if ((!delivered && loading) || (delivered && deliveredLoading)) {
      return;
    }
    dispatch(loadMoreRequest({ delivered }));
  }, [delivered, deliveredLoading, dispatch, loading]);

  const renderFooter = useCallback(() => {
    if ((!delivered && loading) || (delivered && deliveredLoading)) {
      return null;
    }
    return <Loading />;
  }, [delivered, deliveredLoading, loading]);

  return (
    <>
      <Header delivered={delivered} setDelivered={setDelivered} />
      {delivered ? (
        <OptimizedFlatList
          data={deliveredDeliveries}
          // eslint-disable-next-line react/prop-types
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onEndReached={loadMoreDeliveries}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ padding: 20 }}
          removeClippedSubviews
          initialNumToRender={10}
          style={{ width: '100%' }}
        />
      ) : (
        <OptimizedFlatList
          data={deliveries}
          // eslint-disable-next-line react/prop-types
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onEndReached={loadMoreDeliveries}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ padding: 20 }}
          removeClippedSubviews
          initialNumToRender={10}
          style={{ width: '100%' }}
        />
      )}
    </>
  );
};

List.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(List);
