import { View, Text, TextInput, Pressable, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ripple from 'react-native-material-ripple'
import { useNavigation } from '@react-navigation/native'



const AddAccountScreen = ({deleteALL, AddAccount}) => {

    const navigation = useNavigation();

    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")

    return (
        <SafeAreaView>
            <Pressable onPress={Keyboard.dismiss} className="h-screen">
                <Text className="font-bold text-2xl text-center p-8">
                    Add Account
                </Text>
                <View className="p-8">
                    <TextInput value={accountName} placeholder='Account Name' keyboardType='default' onChangeText={(accountName) => setAccountName(accountName)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </View>
                <View className="p-8">
                    <TextInput value={accountValue} placeholder='Starting Amount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </View>
                <View className="items-center p-5">
                    <Ripple rippleCentered={true} onPress={() => {AddAccount(accountName, parseFloat(accountValue)); navigation.navigate("Home");}} className="bg-[#0F57B3] w-24 h-10 rounded-lg flex-row items-center justify-center">
                        <Text className="text-white text-lg">
                            Add
                        </Text>
                    </Ripple>
                </View>
            </Pressable>

            
        </SafeAreaView>
    )
}

export default AddAccountScreen