import { View, Text, Keyboard, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ripple from 'react-native-material-ripple'
import * as SQLite from "expo-sqlite"
import { useNavigation } from '@react-navigation/native'
import {
    MinusCircleIcon,
    MinusIcon,
    PlusCircleIcon,
    PlusIcon
} from "react-native-heroicons/outline"

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
            <Pressable onPress={Keyboard.dismiss} className="h-screen bg-white">
                <View className="h-2/3">
                    <View className="p-4 bg-white shadow-sm">
                        <Text className="font-normal text-4xl text-center text-[#8cbbf1] pt-10">
                            {route.params["title"]}
                        </Text>
                        <Text className="font-normal text-lg text-center text-gray-400 pb-6">
                            Current: ${route.params["ammount"]}
                        </Text>
                    </View>
                    <View className="pt-12 pb-10 items-center">
                        <TextInput value={accountValue} placeholder='Ammount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block w-1/2 p-4 shadow-sm shadow-gray-300"/>
                    </View>
                    <View className="items-center p-5 flex-row justify-center">
                        <Ripple rippleCentered={true} className="bg-[#8cbbf1] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-300" onPress={() => {AddToAccountValue(accountValue, route.params["val"]); ; navigation.navigate("Home")}}>
                            <PlusIcon color={"#f0f6fc"}>

                            </PlusIcon>
                        </Ripple>
                        <Ripple rippleCentered={true} className="bg-[#f0f6fc] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-300" onPress={() => {SubFromAccountValue(accountValue, route.params["val"]); navigation.navigate("Home")}}>
                            <MinusIcon color={'#8cbbf1'}>

                            </MinusIcon>
                        </Ripple>
                    </View>
                </View>
                <View className="items-center pt-20">
                    <Ripple rippleCentered={true} className="bg-[#fcbad5] w-44 h-10 rounded-2xl items-center justify-center shadow-sm shadow-gray-500" onPress={() => {deleteAccount(route.params["val"]); navigation.navigate("Home")}}>
                            <Text className="text-[#ee788c] text-sm font-bold">
                                Delete This Account
                            </Text>
                    </Ripple>
                </View>
            </Pressable>
        </View>
    )
}

export default EditAccountScreen