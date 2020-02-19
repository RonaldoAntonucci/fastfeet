import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import DeliveriesList from '~/pages/Deliveries/DeliveriesList';

import DeliverymenList from '~/pages/Deliverymen/DeliverymenList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />

      <Route path="/dashboard" component={DeliveriesList} isPrivate />
      <Route path="/deliveries" component={DeliveriesList} exact isPrivate />

      <Route path="/deliverymen" component={DeliverymenList} exact isPrivate />
    </Switch>
  );
}
