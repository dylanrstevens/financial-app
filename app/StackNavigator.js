import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import AddAccountScreen from './screens/AddAccountScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="AddAccount" component={AddAccountScreen}
                options={{ presentation: 'modal', headerShown: false }}
            />
        </Stack.Navigator>
        
    )
}

export default StackNavigator