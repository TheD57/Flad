import React from 'react';
import Setting from '../screens/Setting';
import SettingProfil from '../screens/SettingProfil';
import { createStackNavigator } from '@react-navigation/stack';

export default function SettingNavigation() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingProfil"
        component={SettingProfil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}