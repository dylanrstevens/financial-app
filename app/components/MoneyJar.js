import { View, Text, TouchableOpacity, Keyboard, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import {
    MinusCircleIcon,
    MinusIcon,
    PlusCircleIcon,
    PlusIcon,
    CreditCardIcon,
    CurrencyDollarIcon
} from "react-native-heroicons/outline"
import Ripple from 'react-native-material-ripple'
import Modal from "react-native-modal";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';


const MoneyJar = ({getCurrentMonthID, getAccountData, deleteAccount, AddToAccountValue, SubFromAccountValue, title, ammount, val, }) => {

    const [showModal, setShowModal] = useState(false)
    const [accountValue, setAccountValue] = useState("")

    const dollarMask = createNumberMask({
        prefix: ['$'],
        delimiter: ',',
        separator: '.',
        precision: 2,
    })

    const setModal = () => {
        setShowModal(true)
    }

    const unsetModal = () => {
        setShowModal(false)
        setAccountValue("")
    }
    
    return (
        <View>
            {/**Modal for edit account */}
            <Modal 
            isVisible={showModal}
            onSwipeComplete={() => unsetModal()}
            swipeDirection="down"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={true}
            >
                <Pressable onPress={Keyboard.dismiss} className="flex-1 flex-col justify-end">
                    <View className="bg-white rounded-3xl">
                        <View className="p-4 rounded-t-3xl">
                            <Text className="text-2xl font-extrabold text-gray-400 text-center">
                                {title}
                            </Text>
                            <Text className="font-normal text-lg text-center text-[#4B5563]">
                                Current: ${ammount.toLocaleString(undefined, {maximumFractionDigits:2})}
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-center border-t pt-5">
                            <Ripple rippleCentered={true} className="bg-[#8db0e1] p-3 rounded-lg flex-row shadow-sm shadow-gray-300" onPress={() => {AddToAccountValue(parseFloat(accountValue.substring(1).replace(/\,/g,"")), val); setAccountValue("")}}>
                                <PlusIcon color={"#000000"}>

                                </PlusIcon>
                            </Ripple>
                            <View className="items-center">
                                <MaskInput value={accountValue} placeholder='Ammount' keyboardType='number-pad' obfuscationCharacter='' onChangeText={(masked) => {setAccountValue(masked)}} maxLength={12}
                                    className="bg-gray-50 border border-gray-300 text-center flex-grow text-gray-900 text-md rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"
                                    mask={dollarMask}>
                                </MaskInput>
                            </View>    
                            <Ripple rippleCentered={true} className="bg-[#ffffff] p-3 rounded-lg flex-row shadow-sm shadow-gray-300" onPress={() => {SubFromAccountValue(parseFloat(accountValue.substring(1).replace(/\,/g,"")), val, parseFloat(accountValue.substring(1).replace(/\,/g,"")), val, getCurrentMonthID()); setAccountValue("")}}>
                                <MinusIcon color={'#000000'}>

                                </MinusIcon>
                            </Ripple>
                           
                        </View>
                        <View className="items-center pt-10 pb-6">
                            <Ripple rippleCentered={true} className="bg-[#fcbad5] px-4 h-10 rounded-2xl items-center justify-center shadow-sm shadow-gray-200" onPress={() => {deleteAccount(val);}}>
                                    <Text className="text-[#ee788c] text-sm font-bold">
                                        Delete Account
                                    </Text>
                            </Ripple>
                        </View>
                    </View>
                </Pressable>
            </Modal>

            <Ripple rippleCentered={true} className="py-5 px-8 items-center bg-white flex-row rounded-2xl shadow-sm shadow-gray-400" onPress={() => setModal()}>
                    
                    <LinearGradient colors={['#8cbbf1', '#d4e6fb']} className="border p-3 rounded-3xl border-gray-300">
                        <CreditCardIcon color={'#FFFFFF'} size={30} className="items-left"/>
                    </LinearGradient>
                    
                    <View className="flex-col px-4">
                        <Text className="text-md font-extrabold text-gray-400">
                                {title.toUpperCase()}
                        </Text>
                        <Text className="font-normal text-xl text-[#4B5563]">
                                ${ammount.toLocaleString(undefined, {maximumFractionDigits:2})}
                        </Text>
                </View>
            </Ripple>
        </View>
    )
}

export default MoneyJar