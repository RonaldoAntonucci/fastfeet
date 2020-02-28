import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Sign from '~/pages/Sign';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function Routes({ signed }) {
  return (
    <NavigationContainer>
      {!signed ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Sign" component={Sign}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="Entregas">
          <Tab.Screen name="Entregas" component={Deliveries} />
          <Tab.Screen name="Meu perfil" component={Profile} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

Routes.propTypes = {
  signed: PropTypes.bool,
};

Routes.defaultProps = {
  signed: false,
};
