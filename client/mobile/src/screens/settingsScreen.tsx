//SettingsScreen.tsx
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigationTypes';
import {useTheme} from 'react-native-paper';
import {useThemeContext} from '../components/themeContext'; // Adjust the path to where your context is

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const theme = useTheme();
  const { toggleTheme } = useThemeContext(); // Use the context to access the toggleTheme function

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
        Settings Screen
      </Text>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'})
        }
        style={{width: 200}}
        color={theme.colors.primary}>
        Go to Home
      </Button>
      <Button
        mode="contained"
        onPress={toggleTheme}
        style={{width: 200, marginTop: 20}}
        color={theme.colors.primary}>
        Toggle Theme
      </Button>
    </View>
  );
};

export default SettingsScreen;
