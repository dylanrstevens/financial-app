import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BudgetScreen from './screens/BudgetScreen';
import {
    CreditCardIcon,
    ClipboardDocumentCheckIcon
} from "react-native-heroicons/outline"
import { flex } from 'react-native-wind/dist/styles/flex/flex';
import { flexDirections } from 'react-native-wind/dist/styles/flex/flex-direction';
import { borderWidths } from 'react-native-wind/dist/styles/view/border-width';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {

    return (
        <DrawerContentScrollView>
            <View className="">
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
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
                    }
                    
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
                        borderColor:'#BBBBBB'
                    },
                    drawerLabelStyle: {
                        fontSize:16,
                        padding:20
                    },

                    
                }}
            />
        </Drawer.Navigator>
        
    )
}

export default StackNavigator