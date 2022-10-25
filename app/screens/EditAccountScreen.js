import { View, Text, Keyboard, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ripple from 'react-native-material-ripple'
import * as SQLite from "expo-sqlite"
import { useNavigation } from '@react-navigation/native'

const db = SQLite.openDatabase("AppDB");


const EditAccountScreen = ({route}) => {

    const navigation = useNavigation();

    const [accountValue, setAccountValue] = useState("")

    const AddToAccountValue = (amt, id) => {
    db.transaction(
            (tx) => {
            tx.executeSql("update Accounts set money = money+? where id=?", [amt, id]);
            },
        );
    }; 

    const SubFromAccountValue = (amt, id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Accounts set money = money-? where id=?", [amt, id]);
            },
        );
    }; 

    const deleteAccount = (id) => {

        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts where id = ?", [id])
            }
        )
    }

      
    return (
        <View>
            <Pressable onPress={Keyboard.dismiss} className="h-screen">
                <Text className="font-bold text-2xl text-center p-8">
                    {route.params["title"]}
                </Text>
                <Text className="font-semibold text-xl text-center">
                    Current: ${route.params["ammount"]}
                </Text>
                
                <View className="p-8">
                    <TextInput value={accountValue} placeholder='Amount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </View>
                <View className="items-center p-5 flex-row justify-center">
                    <Ripple rippleCentered={true} className="bg-[#072D5C] w-24 h-10 rounded-lg flex-row items-center justify-center" onPress={() => {AddToAccountValue(accountValue, route.params["val"]); ; navigation.navigate("Home")}}>
                        <Text className="text-white text-2xl">
                            +
                        </Text>
                    </Ripple>
                    <Ripple rippleCentered={true} className="bg-[#072D5C] w-24 h-10 rounded-lg flex-row items-center justify-center" onPress={() => {SubFromAccountValue(accountValue, route.params["val"]); navigation.navigate("Home")}}>
                        <Text className="text-white text-2xl">
                            -
                        </Text>
                    </Ripple>
                </View>
                <View className="items-center pt-20">
                    <Ripple rippleCentered={true} className="bg-[#072D5C] w-52 h-12 rounded-lg items-center justify-center" onPress={() => {deleteAccount(route.params["val"]); navigation.navigate("Home")}}>
                            <Text className="text-white text-lg">
                                Delete This Account
                            </Text>
                    </Ripple>
                </View>
            </Pressable>
        </View>
    )
}

export default EditAccountScreen