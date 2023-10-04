// Navigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AppScreen from './AppScreen';
import {RootStackParamList} from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={AppScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            // Set headerLeft to null to remove the back button on LoginScreen
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // Set headerLeft to null to remove the back button on HomeScreen
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
