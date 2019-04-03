import React from 'react'
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';

// SCREENS
import Scanner from '../screens/Scanner'
import Hooks from '../screens/Hooks'

const MainNavigation = createBottomTabNavigator(
  {
    Scanner: {
      screen: Scanner,
      navigationOptions: {
        tabBarIcon: ({ focused }) => <Icon name="qrcode" size={25} color={focused ? 'tomato' : 'gray'} />,

      }
    },
    Hooks: {
      screen: Hooks,
      navigationOptions: {
        tabBarIcon: ({ focused }) => <Icon name="star-o" size={25} color={focused ? 'tomato' : 'gray'} />
      }
    }
  }, 
  {
    tabBarOptions: {
      showLabel: false
    }
  }
)

export default createAppContainer(MainNavigation)