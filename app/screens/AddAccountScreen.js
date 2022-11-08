import { View, Text, TextInput, Pressable, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ripple from 'react-native-material-ripple'
import { useNavigation } from '@react-navigation/native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import { SquaresPlusIcon } from 'react-native-heroicons/outline'



const AddAccountScreen = ({deleteALL, AddAccount}) => {

    const navigation = useNavigation();

    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")

    const config = {
        velocityThreshold: 0.01,
        directionalOffsetThreshold: 100
    };

    return (

        <GestureRecognizer config={config} onSwipeDown={() => navigation.navigate("Home")} className="flex-1 flex-col justify-end">
                <Pressable onPress={Keyboard.dismiss} className="h-2/3 items-center bg-white rounded-3xl border border-gray-300">
                    <View className="bg-[#FFFFFF] w-screen pb-5 pt-5 shadow-lg shadow-gray-300 rounded-3xl items-center justify-center flex-row">
                        <SquaresPlusIcon size={50} color={"#8cbbf1"} className="px-2"/>
                        <Text className="font-normal text-3xl text-center text-[#8cbbf1] px-2">
                            Add Account
                        </Text>
                    </View>
                    <View className="pt-6 w-1/2">
                        <TextInput value={accountName} placeholder='Account Name' keyboardType='default' onChangeText={(accountName) => setAccountName(accountName)}
                        className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                    </View>
                    <View className="pt-6 w-1/2">
                        <TextInput value={accountValue} placeholder='Starting Ammount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } 
                        className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                    </View>
                    <View className="items-center pt-6">
                        <Ripple rippleCentered={true} className="bg-[#8cbbf1] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-400" onPress={() => {AddAccount(accountName, parseFloat(accountValue)); navigation.navigate("Home");}}>
                            <Text className="text-white text-lg">
                                Done
                            </Text>
                        </Ripple>
                    </View>
                </Pressable>
        </GestureRecognizer>
    )
}

export default AddAccountScreen