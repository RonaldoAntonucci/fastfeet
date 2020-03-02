import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '~/components/TabBar';

import Sign from '~/pages/Sign';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

import Delivery from '~/pages/Delivery';

import colors from '~/styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DeliveriesStack = createStackNavigator();

function DeliveriesStackScreen() {
  return (
    <DeliveriesStack.Navigator headerMode="none">
      <DeliveriesStack.Screen
        name="Deliveries"
        component={Deliveries}
      ></DeliveriesStack.Screen>
      <DeliveriesStack.Screen
        name="Delivery"
        component={Delivery}
      ></DeliveriesStack.Screen>
    </DeliveriesStack.Navigator>
  );
}

export default function Routes({ signed }) {
  return (
    <>
      <StatusBar
        barStyle={`${signed ? 'dark' : 'light'}-content`}
        backgroundColor={!signed ? colors.primary : colors.bg}
      />
      <NavigationContainer>
        {!signed ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Sign" component={Sign}></Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName="deliveries"
            // eslint-disable-next-line react/jsx-props-no-spreading
            tabBar={props => <TabBar {...props} />}
          >
            <Tab.Screen
              name="deliveries"
              component={DeliveriesStackScreen}
              options={{
                tabBarLabel: 'Entregas',
                tabBarIcon: 'reorder',
              }}
            />
            <Tab.Screen
              name="profile"
              component={Profile}
              options={{
                tabBarLabel: 'Meu perfil',
                tabBarIcon: 'account-circle',
              }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

Routes.propTypes = {
  signed: PropTypes.bool,
};

Routes.defaultProps = {
  signed: false,
};
