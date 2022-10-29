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
import { flex } from 'react-native-wind/dist/styles/flex/flex';
import { flexDirections } from 'react-native-wind/dist/styles/flex/flex-direction';
import { borderWidths } from 'react-native-wind/dist/styles/view/border-width';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {

    return (
        <DrawerContentScrollView {...props}>
            <View className='border-b border-gray-400 mb-4'>
                <Text className="font-normal text-3xl text-center pb-8 pt-6 text-gray-500">
                    Finance App
                </Text>
            </View>
            <DrawerItemList {...props}/>
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