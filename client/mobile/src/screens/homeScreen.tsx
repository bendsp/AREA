// Import necessary dependencies
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigationTypes';
import fetchAboutJson from '../../methods/fetchAboutJson'; // Adjust the path to where fetchAboutJson.ts is located

// Define the type for navigation prop
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme(); // Get the current theme
  const [services, setServices] = useState(null); // State hook for services

  useEffect(() => {
    fetchAboutJson({setServices}); // Effect hook to fetch data
  }, []);
  console.log(services); // Debug: Log the updated state

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          color: theme.colors.onBackground,
        }}>
        Home Screen
      </Text>
      {/* Iterate through services and actions to display action names */}
      {services &&
        services.length > 0 &&
        services.map((service, index) => (
          <View key={index}>
            {service.actions &&
              service.actions.length > 0 &&
              service.actions.map((action, actionIndex) => (
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 20,
                    color: theme.colors.onBackground,
                  }}
                  key={`action-${actionIndex}`}>
                  {action.name}
                </Text>
              ))}
            {service.reactions &&
              service.reactions.length > 0 &&
              service.reactions.map((reaction, reactionIndex) => (
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 20,
                    color: theme.colors.onBackground,
                  }}
                  key={`reaction-${reactionIndex}`}>
                  {reaction.name}
                </Text>
              ))}
          </View>
        ))}

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={{width: 200}}
        color={theme.colors.primary} // Use theme color for the button
      >
        Logout
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Settings')}
        style={{width: 200, marginTop: 20}}
        color={theme.colors.primary} // Use theme color for the button
      >
        Go to Settings
      </Button>
    </View>
  );
};

export default HomeScreen;
