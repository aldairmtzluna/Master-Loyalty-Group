import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ title: 'Register' }} />
      <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
};