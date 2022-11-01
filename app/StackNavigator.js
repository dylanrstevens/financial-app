import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BudgetScreen from './screens/BudgetScreen';
import {
    CreditCardIcon,
    ClipboardDocumentCheckIcon
} from "react-native-heroicons/outline"
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {

    return (
        <View className="h-screen">
        <DrawerContentScrollView {...props}>
                
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
        </View>
    )
}

const StackNavigator = () => {

    return (
        <Drawer.Navigator useLegacyImplementation initialRouteName='Your Accounts' screenOptions={
            {
                headerShown:false
            }
        }
        drawerContent={(props) => <CustomDrawer {...props}/>}
        >
            <Drawer.Screen 
                name="Your Accounts"
                component={HomeScreen}
                options={{
                    drawerIcon:({color}) => (
                        <CreditCardIcon color={color} size={35}/>
                    ),
                    drawerItemStyle: {
                        borderRadius:20,
                        borderStyle:'solid',
                        borderWidth:1,
                        borderColor:'#BBBBBB'
                    },
                    drawerLabelStyle: {
                        fontSize:16,
                        padding:20
                    },
                    
                }}
            />
            <Drawer.Screen
                name="Budget"
                component={BudgetScreen}
                options={{
                    drawerIcon:({color}) => (
                        <ClipboardDocumentCheckIcon color={color} size={35}/>
                    ),
                    drawerItemStyle: {
                        borderRadius:20,
                        borderStyle:'solid',
                        borderWidth:1,
                        borderColor:'#BBBBBB',
                    },
                    drawerLabelStyle: {
                        fontSize:16,
                        padding:20,
                    },

                    
                }}
            />
        </Drawer.Navigator>
        
    )
}

export default StackNavigator