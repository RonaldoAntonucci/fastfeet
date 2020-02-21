import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import DeliveriesList from '~/pages/Deliveries/DeliveriesList';

import DeliverymenList from '~/pages/Deliverymen/DeliverymenList';

import RecipientsList from '~/pages/Recipients/RecipientsList';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />

      <Route path="/dashboard" component={DeliveriesList} isPrivate />
      <Route path="/deliveries" component={DeliveriesList} exact isPrivate />

      <Route path="/deliverymen" component={DeliverymenList} exact isPrivate />

      <Route path="/recipients" component={RecipientsList} exact isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
