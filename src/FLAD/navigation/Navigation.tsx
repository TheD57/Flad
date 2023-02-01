import React, {Component} from 'react';
import { NavigationContainer } from 'react-native';

export default function Navigation() {
    const BottomTabNavigator = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <BottomTabNavigator.Navigator initialRouteName="Favorite">
                <BottomTabNavigator.Screen name="Home" component={Home}
                                           options={{
                                               title: 'Home',
                                               tabBarIcon: ({color}) => <TabBarIcon name="hear" color={color}/>,
                                           }}/>
                <BottomTabNavigator.Screen name="Favoris" component={Favorite}
                                           options={{
                                               title: 'Favoris',
                                               tabBarIcon: ({color}) => <TabBarIcon name="hear" color={color}/>,
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