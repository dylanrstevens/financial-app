import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from './StackNavigator';

export default function App() {

  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  );
}
