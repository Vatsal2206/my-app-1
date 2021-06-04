import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HelpOthersScreen from '../screens/HelpOthersScreen';
import AskForHelpScreen from '../screens/AskForHelpScreen';
import ReceiverDetailsScreen from '../screens/ReceiverDetailScreen';
import { AppStackNavigator } from './AppStackNavigator';
import { RFValue } from 'react-native-responsive-fontsize';

export const AppTabNavigator = createBottomTabNavigator({
  Help_Others: {
    screen: HelpOthersScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/helping_hand.png')}
          style={{ width: RFValue(20), height: RFValue(20) }}
        />
      ),
      tabBarLabel: 'Help Others',
    },
  },
  Request_Help: {
    screen: AskForHelpScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/ask_help.png')}
          style={{ width: RFValue(20), height: RFValue(20) }}
        />
      ),
      tabBarLabel: 'Request Help',
    },
  },
});
