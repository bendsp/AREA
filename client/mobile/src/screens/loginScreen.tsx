import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { useTheme } from 'react-native-paper';
import Auth0 from 'react-native-auth0';
import { auth0Config } from '../../auth0';

const auth0 = new Auth0(auth0Config);

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();

  const loginHandler = async () => {
    try {
      console.log('Login attempt');
      const credentials = await auth0.webAuth.authorize({scope: 'openid profile email'});
      console.log('Login successful');
      console.log(credentials);
      navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'});
    } catch (error) {
      console.log('Login failed');
      console.log(error);
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
        Login Screen
      </Text>
      <Button
        mode="contained"
        onPress={loginHandler}
        style={{width: 200}}
        color={theme.colors.primary}>
        Login
      </Button>
    </View>
  );
};

export default LoginScreen;
