import React from 'react';
import RegistrationPage from './src/containers/registrationPage';
import HomePage from './src/containers/homePage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Registration" component={RegistrationPage} />
          <Stack.Screen name="HomeScreen" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
