import { View, Text, SafeAreaView, TextInput, ScrollView, Pressable, Keyboard } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
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

const HomeScreen = ({deleteAccount, AddToAccountValue, SubFromAccountValue, deleteALL, AddAccount, getAccountData, data}) => {

    const [showAddAcc, setShowAddAcc] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")

    const navigation = useNavigation();
    useLayoutEffect(() => {
      
        navigation.setOptions({
            headerShown: false,

        }); 
    }, []) 

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
                                className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                            </View>
                            <View className="pt-6 w-1/2">
                                <TextInput value={accountValue} placeholder='Starting Ammount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } 
                                className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"/>
                            </View>
                        </View>
                        <View className="items-center pt-6 pb-6">
                            <Ripple rippleCentered={true} className="bg-[#8cbbf1] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-400" onPress={() => {AddAccount(accountName, parseFloat(accountValue)); unsetAddAcc(); setAccountName(''); setAccountValue('')}}>
                                <Text className="text-white text-lg">
                                    Done
                                </Text>
                            </Ripple>
                        </View>
                    </View>
                    
                </Pressable>
            </Modal>

            {/**Header*/}
            <SafeAreaView className="bg-[#8cbbf1] pt-5">
                <View className="shadow-lg shadow-gray-400">
                    {/**Title and Icons*/}
                    <View className="flex-row pb-3 items-center mx-4 space-x-2">
                        {/**<Bars3Icon size={35} color="#FFFFFF"/>*/}
                        <Text className="font-normal text-3xl text-center p-3 flex-1 text-white">
                            Your Accounts
                        </Text>
                        {/**<UserIcon size={35} color={"#FFFFFF"}/>*/}
                    </View>

                    {/**Search */}
                    <View className="flex-row items-center space-x-2 pb-3 mx-4">
                        <View className="flex-row space-x-2 flex-1 bg-gray-100 p-1.5 rounded-md">
                            <MagnifyingGlassCircleIcon color={"#000000"}/>
                            <TextInput placeholder='Search' keyboardType="default"/>
                        </View>
                        <AdjustmentsVerticalIcon color={"#FFFFFF"}/>
                    </View>
                </View>
            </SafeAreaView>
            {/**Body*/}
            <View className="h-2/3">
                <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                    <View className="items-center">
                        {data.map((accounts) => (
                            <MoneyJar getAccountData={getAccountData} deleteAccount={deleteAccount} AddToAccountValue={AddToAccountValue} SubFromAccountValue={SubFromAccountValue} title={accounts.name} ammount={accounts.money} key={accounts.id} val={accounts.id}></MoneyJar>
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
                            <Text className="text-[#8cbbf1] font-medium text-lg px-2">
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
