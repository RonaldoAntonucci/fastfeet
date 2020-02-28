import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Sign from '~/pages/Sign';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      {true ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Sign" component={Sign}></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="Sign">
          <Tab.Screen name="Sign" component={Sign} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
