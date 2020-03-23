/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StatusBar } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '~/components/TabBar';

import Profile from '~/pages/Profile';
import DeliveryRoutes from '~/routes/Delivery.routes';
import colors from '~/styles/colors';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Entregas"
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: 'reorder',
          }}
          component={DeliveryRoutes}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Meu perfil',
            tabBarIcon: 'account-circle',
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}
