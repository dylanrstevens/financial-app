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
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal";


const MoneyJar = ({getAccountData, deleteAccount, AddToAccountValue, SubFromAccountValue, title, ammount, val, }) => {

    const [showModal, setShowModal] = useState(false)
    const [accountValue, setAccountValue] = useState("")

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
                        <View className="p-4 shadow-md bg-white rounded-3xl">
                            <Text className="font-normal text-4xl text-center text-gray-600 pt-4">
                                {title}
                            </Text>
                            <Text className="font-normal text-lg text-center text-gray-400 pb-4">
                                Current: ${ammount}
                            </Text>
                        </View>
                        <View>
                            <View className="pt-10 pb-10 items-center">
                                <TextInput value={accountValue} placeholder='Ammount' keyboardType='decimal-pad' onChangeText={(accountValue) => setAccountValue(accountValue) } className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block w-1/2 p-4 shadow-sm shadow-gray-300"/>
                            </View>
                            <View className="items-center p-5 flex-row justify-center">
                                <Ripple rippleCentered={true} className="bg-[#8cbbf1] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-300" onPress={() => {AddToAccountValue(accountValue, val);}}>
                                    <PlusIcon color={"#f0f6fc"}>

                                    </PlusIcon>
                                </Ripple>
                                <Ripple rippleCentered={true} className="bg-[#f0f6fc] w-24 h-10 rounded-2xl flex-row items-center justify-center shadow-sm shadow-gray-300" onPress={() => {SubFromAccountValue(accountValue, val);}}>
                                    <MinusIcon color={'#8cbbf1'}>

                                    </MinusIcon>
                                </Ripple>
                            </View>
                        </View>
                        <View className="items-center pt-10 pb-10">
                            <Ripple rippleCentered={true} className="bg-[#fcbad5] w-44 h-10 rounded-2xl items-center justify-center shadow-sm shadow-gray-500" onPress={() => {deleteAccount(val);}}>
                                    <Text className="text-[#ee788c] text-sm font-bold">
                                        Delete This Account
                                    </Text>
                            </Ripple>
                        </View>
                    </View>
                </Pressable>
            </Modal>

            <Ripple rippleCentered={true} className="px-8 py-5 w-screen bg-white items-center flex-row rounded-2xl shadow-md shadow-gray-300" onPress={() => setShowModal(true)}>
                    <CreditCardIcon color={'#000000'} size={40} className="items-left"/>
                    <View className="flex-col px-4">
                        <Text className="font-light text-lg">
                                {title}
                        </Text>
                        <Text className="font-light text-lg">
                                ${ammount}
                        </Text>
                </View>
            </Ripple>
        </View>
    )
}

export default MoneyJar