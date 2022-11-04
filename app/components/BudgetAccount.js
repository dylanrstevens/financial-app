import { View, Text, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import Ripple from 'react-native-material-ripple'
import {
    PlusIcon,
    MinusIcon,
    BanknotesIcon 
} from 'react-native-heroicons/outline'
import Modal from "react-native-modal";
import MaskInput, { createNumberMask } from 'react-native-mask-input';


const BudgetAccount = ({AddMaxAmmountToBudgetAccount, val, name, money, max_amt, remaining_amt}) => {

    const [showModal, setShowModal] = useState(false)
    const [ammountRemaining, setAmmountRemaining] = useState("")

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
    }

    return (
        <View>
            <Modal 
            isVisible={showModal}
            onSwipeComplete={() => unsetModal()}
            swipeDirection="down"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={false}
            >
                <Pressable onPress={Keyboard.dismiss} className="h-screen justify-center">
                    <View className="bg-white rounded-3xl items-center">    
                        <Text className="font-bold text-2xl p-5 text-[#4B5563]">
                            {name}  |  ${money}
                        </Text>
                        <Text className="text-center text-lg font-semibold pb-5 text-[#4B5563]">
                            How much would you like to budget yourself from this account each paycheque?
                        </Text>
                        <MaskInput value={ammountRemaining} placeholder='Max Allowed' keyboardType='number-pad' onChangeText={(masked) => {setAmmountRemaining(masked)}} maxLength={12}
                            className="bg-gray-50 border w-1/2 border-gray-300 text-center text-gray-900 text-md rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"
                            mask={dollarMask}>
                        </MaskInput>
                        <View className="pt-4 pb-6">
                            <Ripple className="border p-3 items-center rounded-xl" rippleCentered={true} onPress={() => {AddMaxAmmountToBudgetAccount(parseFloat(ammountRemaining.substring(1).replace(/\,/g,"")), parseFloat(ammountRemaining.substring(1).replace(/\,/g,"")), val); setAmmountRemaining(""); unsetModal();}}>
                                <Text>Done</Text>
                            </Ripple>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            <View className="flex-row items-center p-2">
            <CircularProgress progressFormatter={(value) => {
            'worklet';
            return value.toFixed(2);}} 
            progressValueStyle={{fontSize:20}}
            progressValueColor='#4B5563' duration={2000} maxValue={max_amt} value={remaining_amt} valuePrefix='$' titleStyle={{fontWeight:'bold', fontSize: 14, color:'#4B5563'}} radius={65} title='Until next pay'
            
            activeStrokeColor={'#b7f4e3'}
            activeStrokeSecondaryColor={'#e2cbf9'}
            />
                <View className="flex-col px-2">
                    <View className="flex-row items-center">
                        <Text className="font-extrabold text-gray-400 text-2xl">
                            {name}
                        </Text>
                        <Text className="font-normal text-gray-600 text-xl pl-2">
                            |
                        </Text>
                        <Text className="font-bold text-lg pl-2 pr-2 text-gray-600">
                            ${money.toLocaleString(undefined, {maximumFractionDigits:2})}
                        </Text>
                    </View>
                    <View className="items-start p-2">
                        <Ripple className="shadow-sm shadow-gray-300 p-3 items-center rounded-xl bg-[#FFFFFF]" rippleCentered={true} onPress={() => setModal()}>
                            <View className="flex-row items-center">
                                <BanknotesIcon size={30} color={'#4B5563'}/>
                                <View className="flex-col">
                                    <PlusIcon size={18} color={'#4B5563'}/>
                                    <MinusIcon size={18} color={'#4B5563'}/>
                                </View>
                            </View>
                        </Ripple>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BudgetAccount