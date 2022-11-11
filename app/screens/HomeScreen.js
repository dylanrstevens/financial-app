import { View, Text, SafeAreaView, TextInput, ScrollView, Pressable, Keyboard } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import {
    AdjustmentsVerticalIcon,
    Bars3Icon,
    MagnifyingGlassCircleIcon,
    MinusCircleIcon,
    MinusIcon,
    PlusCircleIcon,
    SquaresPlusIcon,
    PlusIcon,
    UserIcon,
    WalletIcon,
    TagIcon,
    HomeIcon,
    AcademicCapIcon,
    BanknotesIcon,
    MusicalNoteIcon,
    TvIcon,
    WrenchIcon,
    ShoppingBagIcon,
    ArrowUturnLeftIcon
} from "react-native-heroicons/outline"
//import { SquaresPlusIcon } from "react-native-heroicons/solid"
import MoneyJar from '../components/MoneyJar'
import Ripple from 'react-native-material-ripple'
import Modal from "react-native-modal";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';


import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase("AppDB");


const HomeScreen = ({navigation}) => {

    const [showAddAcc, setShowAddAcc] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")
    const [data, setData] = useState([])
    const [dates, setDates] = useState([])
    const [searchVal, setSearchVal] = useState("")


    const AddAccount = (name, money) => {
        // is text empty?
        if (name === null || name === "") {
          return false;
        }
    
        db.transaction(
          (tx) => {
            tx.executeSql("insert into Accounts (account_name, account_amt, icon, color) values (?, ?, 0, 0)", [name, money]);
          },
        );

        getAccountData()
      }; 

    const getAccountData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Accounts", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setData(values)
                    //console.log("get data")
                    //console.log(values)
                }
            )}            
        )
    }

    const AddToAccountValue = (a_amt, a_id, b_amt, b_id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Accounts set account_amt = account_amt+? where account_id=?;", [a_amt, a_id], {}, (_, error) => {
                console.log(error)
            });
            },
        );
        getAccountData()
    }; 

    const SubFromAccountValue = (a_amt, a_id, b_amt, b_id, m_id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Accounts set account_amt = account_amt-? where account_id=?;", [a_amt, a_id]);
            },
        );
        db.transaction(
            (tx) => {
                tx.executeSql("update Budgets set remaining_amt = remaining_amt-? where account_id = ? and month_id = ?;", [b_amt, b_id, m_id], {}, (_, error) => {
                    console.log(error)
                })
            },
        );
        getAccountData()
    };

    const getCurrentMonthId = () => {
        const thisMonth = new Date()
        for (let iter in dates) {
            const d = new Date(dates[iter].month)
            if (d.getFullYear() == thisMonth.getFullYear() && d.getMonth() == thisMonth.getMonth()) {
                return dates[iter].month_id
            }
        }
        console.log("failed to get proper month")
        return 0;
    }

    const selectMonths = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Dates", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setDates(values)
                    //console.log(values)
                }
            )}            
        )
    }

    const deleteAccount = (id) => {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts where account_id = ?", [id])
            }
        )
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Budgets where account_id = ?", [id])
            }
        )

        getAccountData()
    }

    const deleteALLAccounts = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts")
            }
        )
    }

    const changeColor = (col, id) => {
        db.transaction(
            (tx) => {
                tx.executeSql("update Accounts set color = ? where account_id = ?", [col, id])
            }
        )
        getAccountData()
    }

    const changeIcon = (ico, id) => {
        db.transaction(
            (tx) => {
                tx.executeSql("update Accounts set icon = ? where account_id = ?", [ico, id])
            }
        )
        getAccountData()
    }

    
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
            "create table if not exists Accounts (account_id integer primary key not null, account_name text, account_amt real, icon integer, color integer);"
            );
        });
        db.transaction((tx) => {
            tx.executeSql(
            "create table if not exists Dates (month_id integer primary key not null, month text);"
            );
        });
        db.transaction((tx) => {
            tx.executeSql(
            "create table if not exists Budgets (budget_id integer primary key not null, month_id integer, account_id integer, max_amt real, remaining_amt real, FOREIGN KEY(month_id) REFERENCES Dates(month_id), FOREIGN KEY(account_id) REFERENCES Accounts(account_id), UNIQUE(month_id, account_id));"
            );
        });


    }, []);

    

    const dollarMask = createNumberMask({
        prefix: ['$'],
        delimiter: ',',
        separator: '.',
        precision: 2,
    })

    const setAddAcc = () => {
        setShowAddAcc(true)
    }

    const unsetAddAcc = () => {
        setShowAddAcc(false)
    }

    const renderCardsViaSearch = () => {
        const cards = []
        if (searchVal == "") {
            for (let iter in data) {
                const accounts = data[iter]
                cards.push(
                    <View className="pt-4 w-11/12" key={accounts.account_id}>
                    <MoneyJar changeIcon={changeIcon} changeColor={changeColor} icon={accounts.icon} color={accounts.color} getCurrentMonthID={getCurrentMonthId} getAccountData={getAccountData} deleteAccount={deleteAccount} AddToAccountValue={AddToAccountValue} SubFromAccountValue={SubFromAccountValue} title={accounts.account_name} ammount={accounts.account_amt} key={accounts.account_id} val={accounts.account_id}></MoneyJar>
                    </View>
                )
            }
            return (
                cards
            )
        }
        else {
            const subdata = data.filter(account => account.account_name.includes(searchVal))
            for (let iter in subdata) {
                const accounts = subdata[iter]
                cards.push(
                    <View className="pt-4 w-11/12" key={accounts.account_id}>
                    <MoneyJar changeIcon={changeIcon} changeColor={changeColor} icon={accounts.icon} color={accounts.color} getCurrentMonthID={getCurrentMonthId} getAccountData={getAccountData} deleteAccount={deleteAccount} AddToAccountValue={AddToAccountValue} SubFromAccountValue={SubFromAccountValue} title={accounts.account_name} ammount={accounts.account_amt} key={accounts.account_id} val={accounts.account_id}></MoneyJar>
                    </View>
                )
            }
            return (
                cards
            )
        }
    }

    useEffect(() => {
        getAccountData()
        selectMonths()
        //console.log("get initial acc data")
    }, []);
    //getAccountData()
    
    return (
        <View className="min-h-screen flex flex-col">
            {/**Modal for add account */}
            <Modal 
            isVisible={showAddAcc}
            onSwipeComplete={() => unsetAddAcc()}
            swipeDirection="down"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={true}
            >
                <Pressable onPress={Keyboard.dismiss} className="flex-1 flex-col justify-end">
                    <View className="bg-white rounded-3xl">
                        <View className="bg-[#FFFFFF] pb-5 pt-5 shadow-lg shadow-gray-300 rounded-3xl items-center justify-center flex-row">
                            <SquaresPlusIcon size={50} color={"#8cbbf1"} className="px-2"/>
                            <Text className="font-normal text-3xl text-center text-[#8cbbf1] px-2">
                                Add Account
                            </Text>
                        </View>
                        <View className="items-center">
                            <View className="pt-6 w-1/2">
                                <TextInput value={accountName} placeholder='Account Name' keyboardType='default' onChangeText={(accountName) => setAccountName(accountName)}
                                className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-md rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                            </View>
                            <View className="pt-6 w-1/2">
                                <MaskInput value={accountValue} placeholder='Starting Ammount' keyboardType='number-pad' onChangeText={(masked) => {setAccountValue(masked)}} maxLength={12}
                                className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-md rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"
                                mask={dollarMask}>
                                </MaskInput>
                            </View>
                        </View>
                        <View className="items-center pt-6 pb-6">
                            <Ripple rippleCentered={true} className="bg-[#8cbbf1] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-400" onPress={() => {AddAccount(accountName, parseFloat(accountValue.substring(1).replace(/\,/g,""))); unsetAddAcc(); setAccountName(''); setAccountValue('')}}>
                                <Text className="text-white text-lg">
                                    Done
                                </Text>
                            </Ripple>
                        </View>
                    </View>
                    
                </Pressable>
            </Modal>

            {/**Header*/}
            <LinearGradient colors={['#8cbbf1', '#d8f7ee']}>
            <SafeAreaView className=" pt-5 border-b-2 border-gray-300">
                <View className="shadow-lg shadow-gray-300">
                    {/**Title and Icons*/}
                    <View className="flex-row pb-6 items-center justify-between mx-4 space-x-2">
                        <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => { navigation.openDrawer()}}>
                            <Bars3Icon size={35} color="#FFFFFF"/>
                        </Ripple>
                        <Text className="font-bold text-3xl text-center p-3 text-white">
                            Your Accounts
                        </Text>
                        <View className="rounded-3xl p-3">
                            <Bars3Icon size={35} color="#00000000"/>
                        </View>
                    </View>

                    {/**Search */}
                    <View className="flex-row justify-space items-center pb-6 mx-4">
                        <View className="flex-row space-x-2 bg-gray-100 p-1.5 rounded-md w-11/12">
                            <MagnifyingGlassCircleIcon color={"#4B5563"}/>
                            <TextInput placeholder='Search' value={searchVal} onChangeText={(text) => {setSearchVal(text)}} keyboardType="default" className="flex-grow"/>
                        </View>
                        <Ripple rippleCentered={true} className="py-1.5 flex-grow items-center" onPress={() => setSearchVal("")}>
                            <ArrowUturnLeftIcon color={"#FFFFFF"}/>
                        </Ripple>
                    </View>
                </View>
            </SafeAreaView>
            </LinearGradient>
            {/**Body*/}
            <View className="h-2/3">
                <ScrollView
                    className="bg-gray-50"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center">
                        {/**ENTER VALUE IN CLASSNAME ON THIS LINE FOR ACCOUNT CARD PADDING */}
                        {renderCardsViaSearch()}
                    </View>
                
                </ScrollView>
            </View>
            {/**Footer*/}
            <View className="flex-grow">
                <View className="flex-row flex-grow">
                    <View className="bg-gray-50 w-screen items-center justify-center pb-8">
                        <Ripple rippleCentered={true} className="flex-row items-center bg-white px-8 py-2 rounded-3xl shadow-xl shadow-gray-400" onPress={() => setAddAcc()}>
                            <SquaresPlusIcon size={50} color={"#8cbbf1"}/>
                            <Text className="text-[#8cbbf1] font-medium text-lg px-2">
                                Add Account
                            </Text>
                        </Ripple>
                    </View>
                </View>
            </View>
            
        
        </View>

    )
}

//onPress={() => AddAccount("A")}
export default HomeScreen
