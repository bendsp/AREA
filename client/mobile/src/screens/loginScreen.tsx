import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes';
import { useTheme } from 'react-native-paper';
import Auth0 from 'react-native-auth0';
import { auth0Config } from '../../auth0';

// const auth0 = new Auth0(auth0);


const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();

  const loginHandler = async () => {
    try {
      // const credentials = await auth0.webAuth.authorize({scope: 'openid profile email'});
      console.log('Login successful');
      // console.log(credentials);
      navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'});
    } catch (error) {
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

// import {useAuth0, Auth0Provider} from 'react-native-auth0';


// const LoginScreen = () => {
//   const {authorize} = useAuth0();
//   const navigation = useNavigation<LoginScreenNavigationProp>();

//   const onPress = async () => {
//       try {
//         console.log('Login attempt');
//           const balls = await authorize();
//           console.log(balls);
//           console.log('Login successful');
//           navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'});

//       } catch (e) {
//         console.log('Login failed');
//           console.log(e);
//       }
//   };

//   return <Button onPress={onPress}> ma bite </Button>;
// }

export default LoginScreen;
