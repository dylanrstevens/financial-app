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

import * as SQLite from "expo-sqlite"
import NetWorth from '../components/NetWorth';
const db = SQLite.openDatabase("AppDB");

const BudgetScreen = ({navigation}) => {

    const [netWorth, setNetWorth] = useState([{"total_money": 0}])
    const [budgetData, setBudgetData] = useState([])
    const [accData, setAccData] = useState([])
    const [showAddToBudget, setShowAddToBudget] = useState()

    const [date, setDate] = useState([])
    const [nextPay, setNextPay] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.log(date);
        hideDatePicker();

        setNextPay([date])
    };

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

    const getBudgetData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Accounts a inner join Budgets b on a.id = b.budget_id", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setBudgetData(values)
                    //console.log(values)
                }
            )}           
        )
    }

    const getAccData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Accounts", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setAccData(values)
                    //console.log(values)
                }
            )}            
        )
        getBudgetData()
    }

    const addAccToBudget = (id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("insert or replace into Budgets (budget_id, max_amt, remaining_amt) values (?, 0, 0)", [id]);
            },
        )
        getBudgetData()
    }; 

    const deleteAccFromBudget = (id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("delete from Budgets where budget_id = (?)", [id]);
            },
        )
        getBudgetData()
    }; 

    const AddMaxAmtToBudgetAccount = (m_amt, r_amt, id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Budgets set max_amt = ?, remaining_amt = ? where budget_id=?", [m_amt, r_amt, id]);
            },
        );
        getBudgetData()
    }; 

    const ResetBudgetToTop = () => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Budgets set remaining_amt = max_amt", []);
            },
        );
        getBudgetData()
    }; 

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDate = () => {
        const d = new Date()
        setDate([d])
    }

    const daysUntilPay = () => {
        if (date.length > 0 && nextPay.length > 0) {
            const difference_In_Time = nextPay[0].getTime() - date[0].getTime();
            const difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
            return Math.ceil(difference_In_Days)
        }
        else {
            return 0
        }
    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
            "create table if not exists Budgets (budget_id integer primary key, max_amt real, remaining_amt real);"
            );
        });
        }, []);

    useFocusEffect(
        React.useCallback(() => {
            getDate()
            getTotalNetWorth()
            getBudgetData()
            getAccData()
            return () => {
            };
        }, [])
    );

    return (
        <View className="flex-1">
            <Modal 
            isVisible={showAddToBudget}
            onSwipeComplete={() => setShowAddToBudget(false)}
            swipeDirection="right"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={true}
            animationIn='slideInRight'
            animationOut='slideOutRight'
            >
                <Pressable onPress={Keyboard.dismiss} className="flex-1 items-start flex-row justify-end pt-8">
                    
                    <View className="rounded-3xl bg-white">
                    <LinearGradient colors={['#e2cbf9', '#b7f4e3']} className="rounded-t-3xl">
                        <Text className="text-center p-4 font-extrabold text-lg text-white shadow-lg shadow-gray-600">
                            Edit Accounts In Your Budget
                        </Text>
                    </LinearGradient>
                        <View className="pb-4 pt-4">
                            {accData.map((accounts, index) => (
                                <View className="" key={accounts.id}>
                                    <View className="flex-row justify-between p-2" key={accounts.id}>
                                        <View className="flex-row  flex-1 items-center">
                                            <Text className="font-extrabold flex-1 text-gray-400 text-xl">
                                                {accounts.name}
                                            </Text>
                                            <Text className="font-light text-xl pl-2 pr-2 text-gray-600">
                                                ${accounts.money.toLocaleString(undefined, {maximumFractionDigits:2})}
                                            </Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Ripple rippleCentered={true} className="rounded-xl border border-gray-200 bg-[#f0f6fc]" onPress={() => addAccToBudget(accounts.id)}>
                                                <PlusIcon size={35} color="#4B5563"/>
                                            </Ripple>
                                            <Ripple rippleCentered={true} className="rounded-xl border border-gray-200 bg-[#f0f6fc]" onPress={() => deleteAccFromBudget(accounts.id)}>
                                                <MinusIcon size={35} color="#4B5563"/>
                                            </Ripple>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                    
                    
                </Pressable>
            </Modal>
            {/**Date Picker Modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display='inline'
            />
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
                            <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => setShowAddToBudget(true)}>
                                <PlusIcon size={35} color="#FFFFFF"/>
                            </Ripple>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/**Body */}
            <View className="flex-1">
                <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center py-4 space-y-5">
                        <View className="items-center w-11/12 rounded-xl py-4 bg-white shadow-sm shadow-gray-500">
                            <Text className="font-extrabold text-gray-500 text-xl">
                                Net Worth (Sum of all accounts)
                            </Text>
                            
                            <Text className="text-black text-xl font-bold">
                                {netWorth.map((item, index) => (
                                    <NetWorth key={index} item={item}/>
                                ))}
                            </Text>
                        </View>
                        <View className="bg-white shadow-sm shadow-gray-500 w-11/12 rounded-xl items-center justify-center p-3">
                            <View className="flex-row">
                                <View>
                                    {date.map((item, index) => (
                                        <Text key={index} className="font-extrabold text-gray-500 text-xl">{monthNames[item.getMonth()]} {item.getDate()}, {item.getFullYear()}</Text>
                                    ))}
                                </View>
                            </View>
                            <Text className="text-gray-500 font-extrabold text-xl">
                                Next Pay in {daysUntilPay()} day(s)
                            </Text>
                            <Ripple rippleCentered={true} className="flex-row items-center bg-white px-2 py-2 rounded-3xl shadow-sm shadow-gray-500" onPress={() => showDatePicker()}>
                                <Text className="text-gray-500 font-bold text-lg px-2">
                                    Choose next pay date
                                </Text>   
                            </Ripple>
                            
                        </View>
                        <View className="bg-white shadow-sm shadow-gray-500 w-11/12 rounded-xl">
                            
                            {budgetData.map((accounts, index) => (
                                <View key={accounts.budget_id} className="px-2 py-3">
                                    <BudgetAccount val={accounts.budget_id} AddMaxAmmountToBudgetAccount={AddMaxAmtToBudgetAccount} name={accounts.name} money={accounts.money} max_amt={accounts.max_amt} remaining_amt={accounts.remaining_amt}/>
                                </View> 
                            ))}
                              
                        </View>
                        <View className="items-center w-11/12 rounded-xl py-4 bg-white shadow-sm shadow-gray-500">
                            <Ripple rippleCentered={true} className="flex-row items-center bg-white px-2 py-2 rounded-3xl shadow-sm shadow-gray-500" onPress={() => ResetBudgetToTop()}>
                                <Text className="text-gray-500 font-bold text-lg px-2">
                                    Reset Account Budgets To Max
                                </Text>
                            </Ripple>
                        </View>
                        
                    </View>
                
                </ScrollView>
            </View>
            
        </View>
    )
}

export default BudgetScreen