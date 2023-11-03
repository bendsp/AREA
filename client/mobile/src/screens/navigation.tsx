import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './loginScreen';
import HomeScreen from './homeScreen';
import AppScreen from './appScreen';
import SettingsScreen from './settingsScreen';
import {RootStackParamList} from './navigationTypes';
import CreateArea from './createAreaScreen';
import { useThemeContext } from '../components/themeContext';
import { useTheme } from 'react-native-paper';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isDarkTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.surfaceDisabled,
        tabBarStyle: { 
          backgroundColor: theme.colors.surface,
        },
        headerShown: false,}}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="home" size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon name="cog" color={color} size={26} />
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
            headerShown: true,
            title: 'Create Area',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
