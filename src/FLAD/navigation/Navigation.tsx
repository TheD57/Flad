import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesMusic } from '../redux/actions/appActions';
import { GraphicalCharterDark } from '../assets/GraphicalCharterDark';
import { GraphicalCharterLight } from '../assets/GraphicalCharterLight';
import { getCurrentUserMusic } from '../redux/thunk/spotThunk';
import SpotifyService from '../services/spotify/spotify.service';
// import { fetchFavoritesMusic } from '../redux/thunk/spotThunk';

export default function Navigation() {
  const isDark = useSelector(state => state.userReducer.dark);
  const style = isDark ? GraphicalCharterLight : GraphicalCharterDark;
  const BottomTabNavigator = createBottomTabNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      card: style.Card,
      border: style.Card,
      text: 'rgb(138, 138, 138)',
    }
  };
  //@ts-ignore
  const favoritesMusicLength: number = useSelector(state => state.appReducer.favoriteMusic.length);
  const dispatch = useDispatch();
  // useEffect(() => {
  //       const loadFavoritesMusics = async () => {
  //           await dispatch(fetchFavoritesMusic());
  //       };
  //       loadFavoritesMusics();
  //   }, [dispatch]);
  const token = "BQBNdaYRkD3GAOFASk8uc-l72zVwQeQ0sFB4GJnkBGudsJHnuAXd4eIWb78gbFLKZeBoHrWpHxMeSmqvHk75Utg9fsOJp7XyJfm-tAlgGhUQ-xiUM8rXTpa9k3M40BMSnujPDrap_O1ChCyGhBWYVHDd2t67qY0NVDvCJ4Qz7LucJJdgu1BN838qXTScQV90zriO8lp6Rjx6SsWov_fMZTyadzxebYIiQ-VDQDs63gUordThas-jFlAHLgJlqPhVOHJ1WaZt-_oLhgY3fk4bhORkyeAFZVRTnjw38A70b0eZU3ziQkOYW6w7kN__tzgP5gis0Y8mEIiUyTnyuQ"
  const sheet = async () => {
    const service = new SpotifyService(token)
    dispatch(getCurrentUserMusic(service))
  }

  useEffect(() => {
    sheet()
  }, []);
  return (
    // @ts-ignore
    <NavigationContainer theme={MyTheme}>
      <BottomTabNavigator.Navigator
        initialRouteName="Spots"
        screenOptions={{
          tabBarStyle: styles.tabBar,
          ...(Platform.OS === 'android'
            ? { tabBarLabelStyle: { bottom: normalize(10) } }
            : { tabBarLabelStyle: { bottom: normalize(-22) } }
          ),

        }}>
        <BottomTabNavigator.Screen name="Spots" component={SpotNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <View style={styles.IconContainer}><TabBarIcon name="music" color={color} /></View>,
          }} />
        <BottomTabNavigator.Screen name="Favorites" component={FavoriteNavigation}
          options={{
            tabBarBadge: favoritesMusicLength,
            tabBarBadgeStyle: { backgroundColor: 'yellow' },
            headerShown: false,
            tabBarIcon: ({ color }) => <View style={styles.IconContainer}><TabBarIcon name="heart" color={color} /></View>,
          }} />
        <BottomTabNavigator.Screen name="Messages" component={Login}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <View style={styles.IconContainer}><TabBarIcon name="comment" color={color} /></View>,
          }} />
        <BottomTabNavigator.Screen name="Setting" component={SettingNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <View style={styles.IconContainer}><TabBarIcon name="cog" color={color} /></View>,
          }} />
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
