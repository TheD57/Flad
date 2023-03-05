import React, {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FavoriteNavigation from './FavoriteNavigation';

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
              tabBarStyle: {height: 60, position: 'absolute', bottom: 20, borderRadius: 90, marginHorizontal: 25},
              tabBarLabelStyle: { bottom: 5 }

            }}>
              <BottomTabNavigator.Screen name="Spots" component={SpotNavigation}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <TabBarIcon name="music" color={color}/>,
                         }}/>
              <BottomTabNavigator.Screen name="Favories" component={FavoriteNavigation}
                        options={{
                          // use Selector state redux badgeCount ? badgeCount : undefined
                          
                          tabBarBadge : 2,
                          tabBarBadgeStyle : {backgroundColor : 'yellow'}, 
                            headerShown: false,
                            tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color}/>,
                         }}/>
              <BottomTabNavigator.Screen name="Messages" component={Login}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <TabBarIcon name="comment" color={color}/>,
                         }}/>
              <BottomTabNavigator.Screen name="Paramètres" component={FladLoading}
                        options={{ 
                            headerShown: false,
                            tabBarIcon: ({color}) => <TabBarIcon name="cog" color={color}/>,
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