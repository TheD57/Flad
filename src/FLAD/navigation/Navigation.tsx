import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FavoriteNavigation from './FavoriteNavigation';
import SettingNavigation from './SettingNavigation';

import normalize from '../components/Normalize';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SpotNavigation from './SpotNavigation';
import Login from '../screens/login';
import FladLoading from '../components/FladLoadingScreen';

export default function Navigation() {
  const BottomTabNavigator = createBottomTabNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      card: 'rgb(35, 33, 35)',
      border: 'rgb(35, 33, 35)',
      text: 'rgb(138, 138, 138)',
    }
  };
  return (
      // @ts-ignore
      <NavigationContainer theme={MyTheme}>
          <BottomTabNavigator.Navigator 
            initialRouteName="Spots" 
            screenOptions={{
              //tabBarShowLabel: false, //to remove the titles under the icons
              tabBarStyle: styles.tabBar,
              ...(Platform.OS === 'android' 
              ? { tabBarLabelStyle: { bottom: normalize(10) } }
              : { tabBarLabelStyle: { bottom: normalize(-22) } }
            ),

            }}>
              <BottomTabNavigator.Screen name="Spots" component={SpotNavigation}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <View style={styles.IconContainer}><TabBarIcon name="music" color={color}/></View>,
                         }}/>
              <BottomTabNavigator.Screen name="Favorites" component={FavoriteNavigation}
                        options={{
                          // use Selector state redux badgeCount ? badgeCount : undefined
                          
                          tabBarBadge : 2,
                          tabBarBadgeStyle : {backgroundColor : 'yellow'}, 
                            headerShown: false,
                            tabBarIcon: ({color}) => <View style={styles.IconContainer}><TabBarIcon name="heart" color={color}/></View>,
                         }}/>
              <BottomTabNavigator.Screen name="Messages" component={Login}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <View style={styles.IconContainer}><TabBarIcon name="comment" color={color}/></View>,
                         }}/>
              <BottomTabNavigator.Screen name="Setting" component={SettingNavigation}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <View style={styles.IconContainer}><TabBarIcon name="cog" color={color}/></View>,
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

const styles = StyleSheet.create({
  tabBar: {
    height: 60, 
    position: 'absolute', 
    bottom: normalize(50), 
    borderRadius: 30, 
    marginHorizontal: 25
  },
  IconContainer: {
    position: 'absolute', 
    top: 5, 
  }
})