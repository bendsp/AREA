import React from 'react';
import {View, Text} from 'react-native';
import {Button, useTheme} from 'react-native-paper'; // Import Button and useTheme from Paper UI
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './NavigationTypes';

type AppScreenNavigationProp = StackNavigationProp<RootStackParamList, 'App'>;

const AppScreen = () => {
  const navigation = useNavigation<AppScreenNavigationProp>();
  const theme = useTheme(); // Get the current theme

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
        Welcome to AREA
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={{width: 200}}
        color={theme.colors.primary} // Use theme color for the button
      >
        Go to Login
      </Button>
    </View>
  );
};

export default AppScreen;
