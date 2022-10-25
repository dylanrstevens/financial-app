import { View, Text, Keyboard, Pressable, TextInput } from 'react-native'
import React from 'react'
import Ripple from 'react-native-material-ripple'



const EditAccountScreen = ({route}) => {

    console.log(route)

    return (
        <View>
            <Pressable onPress={Keyboard.dismiss} className="h-screen">
                <Text className="font-bold text-2xl text-center p-8">
                    App
                </Text>
                <View className="p-8">
                    <TextInput  placeholder='Account Name' keyboardType='default' onChangeText={(accountName) => setAccountName(accountName)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </View>
                <View className="p-8">
                    <TextInput  placeholder='Amount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </View>
                <View className="items-center p-5">
                    <Ripple rippleCentered={true} className="bg-[#0F57B3] w-24 h-10 rounded-lg flex-row items-center justify-center">
                        <Text className="text-white text-lg">
                            Add
                        </Text>
                    </Ripple>
                </View>
            </Pressable>
        </View>
    )
}

export default EditAccountScreen