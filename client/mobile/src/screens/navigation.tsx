import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './loginScreen';
import HomeScreen from './homeScreen';
import AppScreen from './appScreen';
import SettingsScreen from './settingsScreen';
import {RootStackParamList} from './navigationTypes';
import CreateArea from './createAreaScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      activeColor="#e91e63"
      barStyle={{backgroundColor: 'tomato'}}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <FontAwesome name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="App" component={AppScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="CreateArea"
          component={CreateArea}
          options={{
            headerShown: true, // Show the header for this screen
            title: 'Create Area', // Set the title of the header
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
