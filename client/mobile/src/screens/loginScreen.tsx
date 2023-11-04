import React, { useContext } from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigationTypes';
import {useTheme} from 'react-native-paper';
import Auth0 from 'react-native-auth0';
import {auth0Config} from '../../auth0';
import RNSecureStorage from 'rn-secure-storage';
import isNewUser from '../../methods/auth/isNewUser';
import addNewUser from '../../methods/auth/addNewUser';
import {UserContext} from '../context/userContext'; // Adjust the path to match your file structure

const auth0 = new Auth0(auth0Config);

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();
  const {setSub} = useContext(UserContext);

  const loginHandler = async () => {
    try {
      console.log('Login attempt');
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      // console.log(credentials);

      // Store tokens securely
      await RNSecureStorage.set('accessToken', credentials.accessToken, {});
      await RNSecureStorage.set('idToken', credentials.idToken, {});

      // Fetch user info
      const userInfo = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      console.log('User info:', userInfo);

      // You can now access user.sub from userInfo.sub
      console.log('User ID:', userInfo.sub);
      if (userInfo.sub && userInfo.email && userInfo.nickname) {
        if (await isNewUser(userInfo.sub)) {
          console.log('Existing user');
        } else {
          console.log('New user');
          await addNewUser({
            email: userInfo.email,
            nickname: userInfo.nickname,
            sub: userInfo.sub,
          });
          console.log('New user added');
        }
        setSub(userInfo.sub);
      }

      console.log('Login successful');
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
          colour: theme.colors.onBackground,
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
