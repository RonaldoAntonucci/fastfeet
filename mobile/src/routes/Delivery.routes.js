import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
// import DeliveryConfirmPhoto from '~/pages/DeliveryConfirmPhoto';
// import DeliveryDetails from '~/pages/DeliveryDetails';

import Delivery from '~/pages/Delivery';

import ProblemForm from '~/pages/Problems/ProblemForm';
import ProblemsList from '~/pages/Problems/ProblemsList';

import DeliverConfirm from '~/pages/DeliverConfirm';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Deliveries"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Deliveries"
        component={Deliveries}
      />
      <Stack.Screen
        name="Delivery"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={Delivery}
      />
      <Stack.Screen
        name="ProblemForm"
        options={{
          title: 'Informar Problema',
        }}
        component={ProblemForm}
      />
      <Stack.Screen
        name="ProblemsList"
        options={{
          title: 'Visualizar Problemas',
        }}
        component={ProblemsList}
      />
      <Stack.Screen
        name="DeliverConfirm"
        options={{
          title: 'Confirmar entrega',
        }}
        component={DeliverConfirm}
      />
    </Stack.Navigator>
  );
}
