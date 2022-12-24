import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import BudgetScreen from './screens/BudgetScreen';
import {
    CreditCardIcon,
    ClipboardDocumentCheckIcon,
    PresentationChartLineIcon
} from "react-native-heroicons/outline"
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {

    return (
        <View className="h-screen">
            <LinearGradient colors={['#82aee0', '#FFFFFF']}>
            <SafeAreaView className="h-24">
                
            </SafeAreaView>
            </LinearGradient>
            <View className="bg-white h-screen">
            <DrawerContentScrollView {...props}
            contentContainerStyle={{
                paddingTop:useSafeAreaInsets}}>
                
            <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            </View>
        </View>
    )
}

const StackNavigator = () => {

    return (
        <Drawer.Navigator useLegacyImplementation initialRouteName='Your Accounts' screenOptions={
            {
                headerShown:false,
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
                        borderColor:'#BBBBBB',
                        paddingVertical:10,
                        marginVertical:10
                    },
                    drawerLabelStyle: {
                        fontSize:16,
                        paddingVertical:20
                    },
                    lazy:false
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
                        paddingVertical:10,
                        marginVertical:10,
                    },
                    drawerLabelStyle: {
                        fontSize:16,
                        paddingVertical:20,
                    },
                    lazy:false
                    
                }}
            />
            <Drawer.Screen
                name="Transaction History"
                component={TransactionHistoryScreen}
                options={{
                    drawerIcon:({color}) => (
                        <PresentationChartLineIcon color={color} size={35}/>
                    ),
                    drawerItemStyle: {
                        borderRadius:20,
                        borderStyle:'solid',
                        borderWidth:1,
                        borderColor:'#BBBBBB',
                        paddingVertical:10,
                        marginVertical:10
                    },
                    drawerLabelStyle: {
                        fontSize:16,
                        paddingVertical:20,
                    },
                    lazy:false
                }}
            />
        </Drawer.Navigator>
        
    )
}

export default StackNavigator