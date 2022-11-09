import { View, Text, SafeAreaView, TextInput, ScrollView, Keyboard, Pressable } from 'react-native'
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
    PlusSmallIcon,
    PlusIcon,
    MinusSmallIcon,
    UserIcon,
    BanknotesIcon
} from "react-native-heroicons/outline"
import BudgetAccount from '../components/BudgetAccount';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PagerView from 'react-native-pager-view';

import * as SQLite from "expo-sqlite"
import NetWorth from '../components/NetWorth';
const db = SQLite.openDatabase("AppDB");

const BudgetScreen = ({navigation}) => {


    const [date, setDate] = useState([])
    const [monthPages, setMonthPages] = useState([])

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const getDate = () => {
        const d = new Date()
        setDate([d])
    }

    const getNextMonth = (cur_month) => {
        if (cur_month.getMonth() == 11) {
            var next_month = new Date(cur_month.getFullYear() + 1, 0);
        } else {
            var next_month = new Date(cur_month.getFullYear(), cur_month.getMonth() + 1);
        }
        return next_month
    }
    
    const initializeMonthInserts = () => {
        /*
        This function is inteded to run every time the app opens but only inserts the first time the app is opened.
        Initializes the current month and inserts it, along with the 11 month dates after it into Dates table
        */
        var cur_month_date = new Date();
        var init_id = 1;
        for (let i = 0; i < 12; i++) {
            insertMonth(init_id, cur_month_date.toISOString());
            cur_month_date = getNextMonth(cur_month_date)
            init_id++;
        } 

    }

    const insertMonth = (id, month) => {
        db.transaction((tx) => {
            tx.executeSql("insert into Dates (month_id, month) values (?, ?);", [id, month]);
        });
    }

    const selectMonths = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Dates", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setMonthPages(values)
                }
            )}            
        )
    }


    useEffect(() => {
        
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            //Insert functions here
            getDate()
            initializeMonthInserts()
            selectMonths()
            return () => {
            };
        }, [])
    );

    return (
        <View className="flex-1">
            {/**HEADER */}
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
                            <Ripple rippleCentered={true} className="rounded-3xl p-3">
                                <PlusIcon size={35} color="#FFFFFF"/>
                            </Ripple>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/**BODY PAGES */}
            <PagerView className="flex-1" initialPage={0}>
                {monthPages.map((page, index) => (
                    <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                    key={index}
                    >
                    <View className="py-2">
                        <View className="items-center">
                            <View className="items-center w-11/12 rounded-3xl py-4 bg-white shadow-sm shadow-gray-500">
                                <Text className="font-extrabold text-gray-500 text-xl">
                                    {monthNames[new Date(page.month).getMonth()]} {new Date(page.month).getFullYear()}
                                </Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                ))}
            </PagerView>
        </View>
    )
}

export default BudgetScreen