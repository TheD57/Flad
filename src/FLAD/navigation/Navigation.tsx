import React, {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FavoriteNavigation from './FavoriteNavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Navigation() {
  const BottomTabNavigator = createBottomTabNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      card: 'rgb(35, 33, 35)',
      border: 'rgb(35, 33, 35)',
    },
  };
  return (
      <NavigationContainer theme={MyTheme}>
          <BottomTabNavigator.Navigator initialRouteName="Home">
              <BottomTabNavigator.Screen name="Home" component={FavoriteNavigation}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <TabBarIcon name="music" color={color}/>,
                         }}/>
          </BottomTabNavigator.Navigator>
      </NavigationContainer>
  )
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} {...props} />;
}