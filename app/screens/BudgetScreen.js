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
import CheckBox from '@react-native-community/checkbox';
import BudgetAccount from '../components/BudgetAccount';

import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase("AppDB");

const BudgetScreen = ({navigation}) => {

    const [maxBudgetIntervalAmount, setMaxBudgetIntervalAmount] = useState(1400)
    const [netWorth, setNetWorth] = useState([])
    const [budgetRemaining, setBudgetRemaining] = useState(800)
    const [budgetData, setBudgetData] = useState([])
    const [accData, setAccData] = useState([])
    const [showAddToBudget, setShowAddToBudget] = useState()

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

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
            "create table if not exists Budgets (budget_id integer primary key, max_amt real, remaining_amt real);"
            );
        });
        }, []);

    useFocusEffect(
        React.useCallback(() => {
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
            swipeDirection="down"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={true}
            >
                <Pressable onPress={Keyboard.dismiss} className="flex-1 flex-col justify-end">
                    <View className="bg-white rounded-3xl">
                        <View className="items-center">
                            {accData.map((accounts, index) => (
                                <View className="items-center" key={accounts.id}>
                                    <View className="flex-row p-2" key={accounts.id}>
                                        <Text className="font-bold text-xl px-2">{accounts.name} | {accounts.money.toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                                        <Ripple rippleCentered={true} className="rounded-3xl" onPress={() => addAccToBudget(accounts.id)}>
                                            <PlusIcon size={35} color="#000000"/>
                                        </Ripple>
                                        <Ripple rippleCentered={true} className="rounded-3xl" onPress={() => deleteAccFromBudget(accounts.id)}>
                                            <MinusIcon size={35} color="#000000"/>
                                        </Ripple>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                    
                </Pressable>
            </Modal>
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
            <View className="flex-1">
                <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center">
                        <Ripple className="border p-3" rippleCentered={true} onPress={() => setShowAddToBudget(true)}>
                            <Text>Add an Account to Budget</Text>
                        </Ripple>
                        <Text className="text-black text-xl font-bold">
                            Net Worth (Sum of all accounts)
                        </Text>
                        <Text className="text-black text-xl font-bold">
                            {netWorth.map((item, index) => (
                                <Text key={index}>{item["total_money"].toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
                            ))}
                        </Text>
                        <View>
                            
                            {budgetData.map((accounts, index) => (
                                <View key={accounts.budget_id} className="p-2">
                                    <BudgetAccount val={accounts.budget_id} AddMaxAmmountToBudgetAccount={AddMaxAmtToBudgetAccount} name={accounts.name} money={accounts.money} max_amt={accounts.max_amt} remaining_amt={accounts.remaining_amt}/>
                                </View> 
                            ))}
                            
                        </View>
                        
                    </View>
                
                </ScrollView>
            </View>

        </View>
    )
}

export default BudgetScreen