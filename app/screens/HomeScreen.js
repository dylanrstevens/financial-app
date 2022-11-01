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
    UserIcon
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

    const AddAccount = (name, money) => {
        // is text empty?
        if (name === null || name === "") {
          return false;
        }
    
        db.transaction(
          (tx) => {
            tx.executeSql("insert into Accounts (name, money) values (?, ?)", [name, money]);
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
                    console.log("get data")
                }
            )}            
        )
    }

    const AddToAccountValue = (amt, id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Accounts set money = money+? where id=?", [amt, id]);
            },
        );
        getAccountData()
    }; 

    const SubFromAccountValue = (amt, id) => {
        db.transaction(
            (tx) => {
            tx.executeSql("update Accounts set money = money-? where id=?", [amt, id]);
            },
        );
        getAccountData()
    }; 

    const deleteAccount = (id) => {

        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts where id = ?", [id])
            }
        )
        getAccountData()
    }

    const deleteALL = () => {

        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts")
            }
        )
    }

    useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql(
        "create table if not exists Accounts (id integer primary key not null, name text, money real);"
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

    useEffect(() => {
        getAccountData()
        console.log("get initial acc data")
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
                <View className="shadow-lg shadow-gray-400">
                    {/**Title and Icons*/}
                    <View className="flex-row pb-6 items-center justify-between mx-4 space-x-2">
                        <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => navigation.openDrawer()}>
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
                    <View className="flex-row items-center space-x-2 pb-6 mx-4">
                        <View className="flex-row space-x-2 flex-1 bg-gray-100 p-1.5 rounded-md">
                            <MagnifyingGlassCircleIcon color={"#000000"}/>
                            <TextInput placeholder='Search' keyboardType="default"/>
                        </View>
                        <AdjustmentsVerticalIcon color={"#FFFFFF"}/>
                    </View>
                </View>
            </SafeAreaView>
            </LinearGradient>
            {/**Body*/}
            <View className="h-2/3">
                <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center">
                        {/**ENTER VALUE IN CLASSNAME ON THIS LINE FOR ACCOUNT CARD PADDING */}
                        {data.map((accounts) => (
                            <View className="p-2" key={accounts.id}>
                            <MoneyJar getAccountData={getAccountData} deleteAccount={deleteAccount} AddToAccountValue={AddToAccountValue} SubFromAccountValue={SubFromAccountValue} title={accounts.name} ammount={accounts.money} key={accounts.id} val={accounts.id}></MoneyJar>
                            </View>
                        ))}
                    </View>
                
                </ScrollView>
            </View>
            {/**Footer*/}
            <View className="flex-grow">
                <View className="flex-row flex-grow">
                    <View className="bg-white w-screen items-center justify-center pb-8">
                        <Ripple rippleCentered={true} className="flex-row items-center bg-white px-8 py-2 rounded-3xl shadow-xl shadow-gray-400" onPress={() => setAddAcc()}>
                            <SquaresPlusIcon size={50} color={"#8cbbf1"}/>
                            <Text className="text-[#c0f0e2] font-medium text-lg px-2">
                                Add Account
                            </Text>
                        </Ripple>
                    </View>
                </View>
            </View>
            

            {/**LITTLE SPACE AT BOTTOM TO GIVE ROOM FOR SWIPE UP BAR */}
            
        
        </View>

    )
}

//onPress={() => AddAccount("A")}
export default HomeScreen
