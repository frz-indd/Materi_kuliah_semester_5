import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './login';
import Signup from './signup';
import MainNavigator from './navigation/MainNavigator';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Daftar Akun Baru' }} />
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detail Praktikum' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
