import React, { useCallback, useState, memo, useMemo } from 'react';
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
    initialized,
    deliveredDeliveries,
    deliveredLoading,
  } = useSelector(state => state.deliveries);

  const [delivered, setDelivered] = useState(false);

  const handleDetails = useCallback(
    item => navigation.navigate('Delivery', { item }),
    [navigation]
  );

  // eslint-disable-next-line react/prop-types
  const renderItem = useCallback(({ item }) => (
    <DeliveryCard data={item} handleDetails={() => handleDetails(item)} />
  ));

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

  const DeliveriesList = useMemo(() => {
    if (delivered) {
      return (
        <OptimizedFlatList
          ListHeaderComponent={() => (
            <Header delivered={delivered} setDelivered={setDelivered} />
          )}
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
      );
    }

    return (
      <OptimizedFlatList
        ListHeaderComponent={() => (
          <Header delivered={delivered} setDelivered={setDelivered} />
        )}
        data={deliveries}
        // eslint-disable-next-line react/prop-types
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={loadMoreDeliveries}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={10}
        style={{ width: '100%' }}
        stickyHeaderIndices={[0, 6, 13]}
      />
    );
  }, [
    delivered,
    deliveredDeliveries,
    deliveries,
    loadMoreDeliveries,
    renderFooter,
    renderItem,
  ]);

  return initialized ? DeliveriesList : <Loading />;
};

List.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(List);
