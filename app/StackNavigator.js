import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BudgetScreen from './screens/BudgetScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => {

    return (
        <Drawer.Navigator useLegacyImplementation initialRouteName='Home' screenOptions={
            {
                headerShown:false
            }
        }>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Budget" component={BudgetScreen}/>
        </Drawer.Navigator>
        
    )
}

export default StackNavigator