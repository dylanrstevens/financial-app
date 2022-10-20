import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    AdjustmentsVerticalIcon,
    Bars3Icon,
    MagnifyingGlassCircleIcon,
    UserIcon
} from "react-native-heroicons/outline"

import MoneyJar from '../components/MoneyJar'

const HomeScreen = () => {

    const navigation = useNavigation();
    useLayoutEffect(() => {
      
        navigation.setOptions({
            headerShown: false,

        }); 
    }, [])

    return (
        
        <SafeAreaView className="bg-white pt-5">
            {/**Header*/}

                {/**Title and Icons*/}
                <View className="flex-row pb-3 items-center mx-4 space-x-2">
                    <Bars3Icon size={35} color="#000000"/>
                    <Text className="font-bold text-2xl text-center p-3 flex-1">
                        Your Money Jars 
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

                {/**Body*/}
                <ScrollView
                    className="bg-gray-100"
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                >
                    <View className="items-center">
                        <MoneyJar title={"Savings"}/>
                        <MoneyJar title={"Travel"}/>
                        <MoneyJar title={"Groceries"}/>
                        <MoneyJar title={"Spending Money"}/>
                        <MoneyJar title={"School Expenses"}/>

                    </View>

                </ScrollView>

            {/**Footer*/}
                

        </SafeAreaView>

    )
}

export default HomeScreen