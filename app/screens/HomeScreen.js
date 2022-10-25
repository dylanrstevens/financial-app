import { View, Text, SafeAreaView, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    AdjustmentsVerticalIcon,
    Bars3Icon,
    MagnifyingGlassCircleIcon,
    MinusCircleIcon,
    MinusIcon,
    PlusCircleIcon,
    SquaresPlusIcon,
    PlusIcon,
    UserIcon
} from "react-native-heroicons/outline"
//import { SquaresPlusIcon } from "react-native-heroicons/solid"
import MoneyJar from '../components/MoneyJar'
import Ripple from 'react-native-material-ripple'

const HomeScreen = ({deleteAccount, deleteALL, AddAccount, getAccountData, data}) => {


    const navigation = useNavigation();
    useLayoutEffect(() => {
      
        navigation.setOptions({
            headerShown: false,

        }); 
    }, []) 

    getAccountData()


    return (
        <View className="min-h-screen flex flex-col">
            {/**Header*/}
            <SafeAreaView className="bg-white pt-5">
                <View>
                    {/**Title and Icons*/}
                    <View className="flex-row pb-3 items-center mx-4 space-x-2">
                        <Bars3Icon size={35} color="#000000"/>
                        <Text className="font-bold text-2xl text-center p-3 flex-1">
                            Your Accounts
                        </Text>
                        <UserIcon size={35} color={"#000000"}/>
                    </View>

                    {/**Search */}
                    <View className="flex-row items-center space-x-2 pb-3 mx-4">
                        <View className="flex-row space-x-2 flex-1 bg-gray-100 p-1.5">
                            <MagnifyingGlassCircleIcon color={"#000000"}/>
                            <TextInput placeholder='Search' keyboardType="default"/>
                        </View>
                        <AdjustmentsVerticalIcon color={"#000000"}/>
                    </View>
                </View>
            </SafeAreaView>
            {/**Body*/}
            <View className="h-2/3">
                <ScrollView
                    className="bg-gray-200"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center">
                        {data.map((accounts) => (
                            <MoneyJar deleteAccount={deleteAccount} title={accounts.name} ammount={accounts.money} key={accounts.id} val={accounts.id}></MoneyJar>
                        ))}
                    </View>
                
                </ScrollView>
            </View>
            {/**Footer*/}
            <View className="flex-grow">
                <View className="flex-row flex-grow">
                    <Ripple rippleCentered={true} className="bg-gray-100 border-t w-screen items-center justify-center" onPress={() => navigation.navigate("AddAccount")}>
                        <SquaresPlusIcon size={50} color={"#072D5C"}/>
                        <Text>
                            Add Account
                        </Text>
                    </Ripple>
                </View>
            </View>
            

            {/**LITTLE SPACE AT BOTTOM TO GIVE ROOM FOR SWIPE UP BAR */}
            
        
        </View>

    )
}

//onPress={() => AddAccount("A")}
export default HomeScreen
