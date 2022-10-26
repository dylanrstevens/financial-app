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
            <SafeAreaView className="bg-[#8cbbf1] pt-5">
                <View className="shadow-lg shadow-gray-400">
                    {/**Title and Icons*/}
                    <View className="flex-row pb-3 items-center mx-4 space-x-2">
                        {/**<Bars3Icon size={35} color="#FFFFFF"/>*/}
                        <Text className="font-normal text-3xl text-center p-3 flex-1 text-white">
                            Your Accounts
                        </Text>
                        {/**<UserIcon size={35} color={"#FFFFFF"}/>*/}
                    </View>

                    {/**Search */}
                    <View className="flex-row items-center space-x-2 pb-3 mx-4">
                        <View className="flex-row space-x-2 flex-1 bg-gray-100 p-1.5 rounded-md">
                            <MagnifyingGlassCircleIcon color={"#000000"}/>
                            <TextInput placeholder='Search' keyboardType="default"/>
                        </View>
                        <AdjustmentsVerticalIcon color={"#FFFFFF"}/>
                    </View>
                </View>
            </SafeAreaView>
            {/**Body*/}
            <View className="h-2/3">
                <ScrollView
                    className="bg-white"
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
                    <View className="bg-white w-screen items-center justify-center pb-8">
                        <Ripple rippleCentered={true} className="flex-row items-center bg-white px-8 py-2 rounded-3xl shadow-xl shadow-gray-400" onPress={() => navigation.navigate("AddAccount")}>
                            <SquaresPlusIcon size={50} color={"#8cbbf1"}/>
                            <Text className="text-[#8cbbf1] font-medium text-lg px-2">
                                Add Account
                            </Text>
                        </Ripple>
                    </View>
                </View>
            </View>
            

            {/**LITTLE SPACE AT BOTTOM TO GIVE ROOM FOR SWIPE UP BAR */}
            
        
        </View>

    )
}

//onPress={() => AddAccount("A")}
export default HomeScreen
