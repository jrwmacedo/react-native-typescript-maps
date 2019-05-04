import React from 'react';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './Home';
import LoginScreen from './Login';
import { createBottomTabNavigator, TabBarBottom, createAppContainer, createSwitchNavigator } from 'react-navigation';

const Tabs = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Help: { screen: LoginScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Help') {
          iconName = `help-circle`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: LoginScreen,
    App: Tabs,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

