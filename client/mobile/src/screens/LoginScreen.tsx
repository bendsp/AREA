// LoginScreen.tsx
import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './NavigationTypes';
import {useTheme} from 'react-native-paper';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const theme = useTheme();

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
        onPress={() =>
          navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'})
        }
        style={{width: 200}}
        color={theme.colors.primary}>
        Go to Home
      </Button>
    </View>
  );
};

export default LoginScreen;
