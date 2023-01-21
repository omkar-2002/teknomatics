import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Login from './src/screens/Login';
import CameraHome from './src/screens/CameraHome';
import Camera from './src/screens/Camera';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen name="CameraHome" component={CameraHome} />
        <Stack.Screen
          name="Camera"
          options={{headerShown: false}}
          component={Camera}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
