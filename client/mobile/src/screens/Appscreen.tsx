// AppScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './NavigationTypes';

type AppScreenNavigationProp = StackNavigationProp<RootStackParamList, 'App'>;

const AppScreen = () => {
  const navigation = useNavigation<AppScreenNavigationProp>();

  return (
    <View>
      <Text>Welcome to AREA</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default AppScreen;
