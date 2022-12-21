import { View, Text, SafeAreaView, TextInput, ScrollView, Keyboard, Pressable, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Ripple from 'react-native-material-ripple'
import Modal from "react-native-modal";
import {
    Bars3Icon,
    MinusIcon,
    PlusIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ExclamationTriangleIcon,
} from "react-native-heroicons/outline"
import BudgetAccount from '../components/BudgetAccount';
import Collapsible from 'react-native-collapsible';
import Animated, {StretchInX} from 'react-native-reanimated';
import CheckBox from 'expo-checkbox';

import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase("AppDB");

const BudgetScreen = ({navigation}) => {


    const [date, setDate] = useState([])
    const [monthPages, setMonthPages] = useState([])
    const [accData, setAccData] = useState([])
    const [budgetData, setBudgetData] = useState([])
    const [expanded, setExpanded] = useState(true)
    const [resetModal, setResetModal] = useState(false)
    const [proceedReset, setProceedReset] = useState(false)

    const [thisMonth, setThisMonth] = useState([0])

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    //{ getDate, getNextMonth, initializeMonthInserts, insertMonth, selectMonths, getAccData, addAccToBudget, deleteAccFromBudget, getBudgetData, AddMaxAmtToBudgetAccount, renderBudgetAccounts, }

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
        console.log("selectMonths CALLED") 
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
        console.log("getAccData CALLED") 
    }

    const addAccToBudget = (m_id, acc_id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("insert into Budgets (month_id, account_id, max_amt, remaining_amt) values (?, ?, 0, 0)", [m_id, acc_id], {},  (_, error) => {
                console.log(error)
            });
            }, 
        )
        getBudgetData()
    };

    const deleteAccFromBudget = (m_id, acc_id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("delete from Budgets where month_id = ? and account_id = ?", [m_id, acc_id], {},  (_, error) => {
                console.log(error)
            });
            },
        )
        getBudgetData()
    }; 

    const getBudgetData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Budgets b inner join Accounts a on b.account_id = a.account_id", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setBudgetData(values)
                    //console.log(values)
                }
            )}            
        )
        console.log("getBudgetData CALLED") 
    }

    const AddMaxAmtToBudgetAccount = (m_amt, r_amt, id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Budgets set max_amt = ?, remaining_amt = ? where budget_id=?", [m_amt, r_amt, id]);
            },
        );
        getBudgetData()
    }; 

    const resetData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Dates")
            }
        )
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Budgets")
            }
        )
        initializeMonthInserts()
        selectMonths()
        getAccData()
        getBudgetData()
    }

    const renderBudgetAccounts = (page) => {
        const vals = []
        const subdata = budgetData.filter(acc => acc.month_id == page.month_id)
        for (let iter in subdata) {
            const account = subdata[iter]
            vals.push(
                <View key={account.budget_id} className="px-2 py-3">
                    <BudgetAccount AddMaxAmtToBudgetAccount={AddMaxAmtToBudgetAccount} val={account.budget_id} name={account.account_name} money={account.account_amt} max_amt={account.max_amt} remaining_amt={account.remaining_amt}/>
                </View>
            )
        }
        return (vals)
    }

    const ammountRender = (amt) => {
        if (amt == null) {
            return 0
        }
        else {
            return amt.toLocaleString(undefined, {maximumFractionDigits:2})
        }
    }

    const renderAccounts = (page) => {
        const vals = []
        for (let iter in accData) {
            const accounts = accData[iter]
            vals.push(
                <View className="flex-row justify-center" key={accounts.account_id}>
                    <View className="p-2 flex-row items-center">
                        <View className="flex-row">
                            <Text className="font-extrabold text-gray-400 text-xl">
                                {accounts.account_name}
                            </Text>
                            <Text className="font-light text-xl pl-2 pr-2 text-gray-600">
                                ${ammountRender(accounts.account_amt)}
                            </Text>
                        </View>
                        <View className="flex-row">
                            <Ripple rippleCentered={true} className="rounded-xl shadow-sm shadow-gray-400 bg-[#FFFFFF]" onPress={() => addAccToBudget(page.month_id, accounts.account_id)}>
                                <PlusIcon size={35} color="#4B5563"/>
                            </Ripple>
                            <Ripple rippleCentered={true} className="rounded-xl shadow-sm shadow-gray-400 bg-[#FFFFFF]" onPress={() => deleteAccFromBudget(page.month_id, accounts.account_id)}>
                                <MinusIcon size={35} color="#4B5563"/>
                            </Ripple>
                        </View>
                    </View>
                </View>
            )
        }
        return (vals)
    }

    const renderPages = (curMonth) => {
        console.log("renderPages RENDERED")
        const pages = []
        if (monthPages.length > 0) {
            const page = monthPages[curMonth]
            pages.push(
                <Animated.ScrollView
                entering={StretchInX.springify()}
                duration={100}
                className="bg-white"
                contentContainerStyle={{
                    paddingBottom: 0,
                }}
                key={page.month_id}
                >
                    {/**Month title */}
                    <View className="py-2">
                        <View className="items-center">
                            <View className="w-11/12 rounded-3xl bg-white shadow-sm shadow-gray-500">
                                <View className="flex-row items-center justify-between">
                                    <Ripple rippleCentered={true} className="px-4 py-4" onPress={() => changeMonthLeft()}>
                                        <ArrowLeftIcon color={'#000000'} size={20}></ArrowLeftIcon>
                                    </Ripple>
                                    <Text className="font-extrabold text-gray-500 text-xl">
                                        {monthNames[new Date(page.month).getMonth()]} {new Date(page.month).getFullYear()}
                                    </Text>
                                    <Ripple rippleCentered={true} className="px-4 py-4" onPress={() => changeMonthRight()}>
                                        <ArrowRightIcon color={'#000000'} size={20}></ArrowRightIcon>                                        
                                    </Ripple>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/**Accounts collapsable */}
                    <View className="py-2">
                        <View className="items-center">
                            <Ripple rippleCentered={true} className="items-center rounded-3xl py-2 bg-white shadow-sm shadow-gray-500" onPress={() => setExpanded(!expanded)}>
                                <View className="flex-row items-center justify-between px-4">
                                    <Text className="font-extrabold text-gray-500 text-md">
                                        Show/Hide Accounts
                                    </Text>
                                </View>
                            </Ripple>
                        </View>
                    </View>

                    <Collapsible collapsed={expanded} duration={500} className="" easing={Easing.cubic}>
                    <View>
                        {renderAccounts(page)}
                    </View>
                    </Collapsible>

                    {/**Budget Accounts */}
                    <View className="items-center">
                        <View className="bg-white shadow-sm shadow-gray-500 w-11/12 rounded-xl">
                            {renderBudgetAccounts(page)}
                        </View>
                    </View>
                </Animated.ScrollView>
            )
        }
        return (pages)
    }

    const changeMonthLeft = () => {
        if (thisMonth[0] == 0) {
            return
        }
        else {setThisMonth([thisMonth[0]-1])}
    }

    const changeMonthRight = () => {
        if (thisMonth[0] == 11) {
            return
        }
        else {setThisMonth([thisMonth[0]+1])}
    }

    const initMonth = () => {
        const d = new Date()
        let setval = [0]
        //console.log(d.getMonth())
        for (let i = 0; i < 12; i++) {
            //console.log(i)
            if (monthPages.length != 0) {
                //console.log(d.getMonth())
                const iter_date = new Date(monthPages[i]["month"])
                //console.log(iter_date.getMonth())
                if (iter_date.getMonth() == d.getMonth()) {        
                    //console.log(i)
                    setval[0] = i
                }
            }
        }
        console.log("initMonth CALLED") 
        setThisMonth(setval)
        
    }

    const confirmButton = () => {
        if (proceedReset) {
            return (
                <Ripple className="py-3 px-5 items-center bg-white shadow-sm shadow-gray-400 rounded-xl" rippleCentered={true} onPress={() => {resetData()}}>
                    <Text>Confirm</Text>
                </Ripple> 
            )
        }
        else {
            return
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            //Insert functions here
            initializeMonthInserts()
            selectMonths()
            getAccData()
            getBudgetData()
            return () => {
            };
        }, [])
    );
    
    useEffect(() => {
        initMonth()
    }, [monthPages])

    //console.log(thisMonth)

    return (
        <View className="flex-1">
            <Modal 
            isVisible={resetModal}
            onSwipeComplete={() => {setResetModal(false); setProceedReset(false);}}
            swipeDirection="down"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={false}
            >
                <Pressable onPress={Keyboard.dismiss} className="h-screen justify-center">
                    <View className="bg-white rounded-3xl items-center">
                        <View className="flex-row items-center">
                            <ExclamationTriangleIcon color={"#a32f2f"} size={45}/>
                            <Text className="font-bold text-2xl py-5 px-3 text-[#a32f2f]">
                                Warning
                            </Text>
                        </View>
                        <Text className="font-bold text-2xl pb-5 px-3 text-[#4B5563]">
                                Reset Budgets
                            </Text>
                        <Text className="text-center text-lg font-semibold pb-5 px-4 text-[#4B5563]">
                            The following will erase all your budget data, and reset the first month to the month you are currently in. Accounts will not be affected.
                        </Text>
                        <View className="flex-row items-center pb-5">
                            <Text className="text-center text-lg font-semibold px-4 text-[#4B5563]">
                                Would you like to proceed?
                            </Text>
                            <CheckBox
                            disabled={false}
                            value={proceedReset}
                            onValueChange={(value) => setProceedReset(value)} 
                            />
                        </View>
                        <View className="pb-5">
                            {confirmButton()}
                        </View>
                    </View>
                </Pressable>
            </Modal>
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
                            <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => {setResetModal(true)}}>
                                <ExclamationTriangleIcon size={35} color="#FFFFFF"/>
                            </Ripple>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/**BODY PAGES */}
            <View className="flex-1 bg-white">
                {renderPages(thisMonth[0])}
            </View>
        </View>
    )
}

export default BudgetScreen