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
        <View>
            <Pressable onPress={Keyboard.dismiss} className="h-screen items-center bg-white">
                <View className="bg-[#f0f6fc] w-screen pb-10 shadow-md">
                    <Text className="font-normal text-3xl text-center text-[#8cbbf1] pt-12">
                        Add Account
                    </Text>
                </View>
                <View className="pt-10 w-1/2">
                    <TextInput value={accountName} placeholder='Account Name' keyboardType='default' onChangeText={(accountName) => setAccountName(accountName)}
                    className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                </View>
                <View className="pt-10 w-1/2">
                    <TextInput value={accountValue} placeholder='Starting Ammount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } 
                    className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                </View>
                <View className="items-center pt-10">
                    <Ripple rippleCentered={true} className="bg-[#8cbbf1] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-400" onPress={() => {AddAccount(accountName, parseFloat(accountValue)); navigation.navigate("Home");}}>
                        <Text className="text-white text-lg">
                            Add
                        </Text>
                    </Ripple>
                </View>
            </Pressable>

            
        </View>
    )
}

export default AddAccountScreen