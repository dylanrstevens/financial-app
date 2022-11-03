import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Ripple from 'react-native-material-ripple'
import Modal from "react-native-modal";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
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

import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase("AppDB");

const BudgetScreen = ({navigation, data}) => {


    const [netWorth, setNetWorth] = useState([])

    const getTotalNetWorth = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select SUM(money) as total_money from Accounts;", [], (_, { rows: {_array} }) => {
                    const value = _array;
                    setNetWorth(value)
                }
            )}            
        )
    }

    useFocusEffect(
        React.useCallback(() => {
          getTotalNetWorth()
          return () => {
          };
        }, [])
    );

    
    
    return (
        <View>
            {/**Header */}
            <LinearGradient colors={['#b7f4e3', '#e2cbf9']}>
                <SafeAreaView className=" pt-5 border-b-2 border-gray-300">
                    <View className="shadow-lg shadow-gray-400">
                        {/**Title and Icons*/}
                        <View className="flex-row pb-6 items-center justify-between mx-4 space-x-2">
                            <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => {navigation.openDrawer()}}>
                                <Bars3Icon size={35} color="#FFFFFF"/>
                            </Ripple>
                            <Text className="font-bold text-3xl text-center p-3 text-white">
                                Budget
                            </Text>
                            <View className="rounded-3xl p-3">
                                <Bars3Icon size={35} color="#00000000"/>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/**Body */}
            <View className="h-screen">
                <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center">
                        <Text className="text-black text-xl font-bold">
                            Net Worth (Sum of all accounts)
                        </Text>
                        <Text className="text-black text-xl font-bold">
                            {netWorth.map((item, index) => (
                                <Text>{item["total_money"].toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                            ))}
                        </Text>
                        
                    </View>
                
                </ScrollView>
            </View>

        </View>
    )
}

export default BudgetScreen