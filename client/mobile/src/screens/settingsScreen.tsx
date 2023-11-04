import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigationTypes';
import {useTheme} from 'react-native-paper';
import {useThemeContext} from '../components/themeContext';
import {useAuth0} from 'react-native-auth0';
import RNSecureStorage from 'rn-secure-storage';

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const theme = useTheme();
  const {toggleTheme} = useThemeContext();
  const {clearSession} = useAuth0();

  const logoutHandler = async () => {
    try {
      await clearSession();
      await RNSecureStorage.remove('accessToken');
      await RNSecureStorage.remove('idToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

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
      <Button
        mode="contained"
        onPress={logoutHandler}
        style={{width: 200, marginTop: 20}}
        color={theme.colors.primary}>
        Logout
      </Button>
    </View>
  );
};

export default SettingsScreen;
