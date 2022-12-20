import { View, Text, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import {
    MinusIcon,
    PlusIcon,
    WalletIcon,
    TagIcon,
    HomeIcon,
    AcademicCapIcon,
    BanknotesIcon,
    MusicalNoteIcon,
    TvIcon,
    WrenchIcon,
    ShoppingBagIcon,
    CreditCardIcon
} from "react-native-heroicons/outline"
import Ripple from 'react-native-material-ripple'
import Modal from "react-native-modal";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';


const MoneyJar = ({getCurrentMonthID, changeColor, changeIcon, icon, color, getAccountData, deleteAccount, AddToAccountValue, SubFromAccountValue, title, ammount, val, }) => {

    const [showModal, setShowModal] = useState(false)
    const [accountValue, setAccountValue] = useState("")

    const colors = [
        ['#82aee0', '#eaf0f7'], //0
        ['#82e0b4', '#eaf7ef'], //1
        ['#dea5f4', '#f4eaf7'], //2
        ['#f4efa5', '#f7fae8'], //3
    ]

    const icons = [
        <CreditCardIcon color={'#4B5563'} size={30} className="items-left"/>, //database value 0
        <WalletIcon color={'#4B5563'} size={30} className="items-left"/>, //databse value 1
        <TagIcon color={'#4B5563'} size={30} className="items-left"/>, //databse value 2
        <HomeIcon color={'#4B5563'} size={30} className="items-left"/>, //databse value 3
        <AcademicCapIcon color={'#4B5563'} size={30} className="items-left"/>, //databse value 4
        <BanknotesIcon color={'#4B5563'} size={30} className="items-left"/>, //databse value 5
        <MusicalNoteIcon color={'#4B5563'} size={30} className="items-left"/>, // 6
        <TvIcon color={'#4B5563'} size={30} className="items-left"/>, // 7
        <WrenchIcon color={'#4B5563'} size={30} className="items-left"/>, // 8
        <ShoppingBagIcon color={'#4B5563'} size={30} className="items-left"/>, //9
    ]

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
                        {/**Modal Header */}
                        <View className="p-4 rounded-3xl bg-white shadow-md shadow-gray-300">
                            <Text className="text-2xl font-extrabold text-gray-400 text-center">
                                {title}
                            </Text>
                            <Text className="font-normal text-lg text-center text-[#4B5563]">
                                Current: ${ammount.toLocaleString(undefined, {maximumFractionDigits:2})}
                            </Text>
                        </View>
                        {/**Edit ammounts */}
                        <View className="flex-row items-center justify-center pt-10">
                            <Ripple rippleCentered={true} className="bg-[#ffffff] p-3 rounded-lg flex-row shadow-sm shadow-gray-300" onPress={() => {AddToAccountValue(parseFloat(accountValue.substring(1).replace(/\,/g,"")), val); setAccountValue("")}}>
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
                        
                        {/**Space */}
                        <View className="py-7"></View>

                        {/** Edit Icon */}
                        <View className="flex-row justify-center pt-5">
                            {icons.map((i, index) => (
                                <Ripple key={index} rippleCentered={true} className="items-center px-0.5" onPress={() => changeIcon(index, val)}>
                                    {i}
                                </Ripple>
                            ))}
                        </View>

                        {/**Edit Color */}
                        <View className="flex-row justify-center pt-5">
                            {colors.map((c, index) => (
                                <Ripple key={index} rippleCentered={true} className="items-center mx-2" onPress={() => changeColor(index, val)}>
                                    <LinearGradient colors={c} className="border w-7 h-7 rounded-3xl border-gray-300"></LinearGradient>
                                </Ripple>
                            ))}
                        </View>

                        {/**Delete account */}
                        <View className="items-center pt-10 pb-6">
                            <Ripple rippleCentered={true} className="bg-[#4B5563] px-4 h-10 rounded-2xl items-center justify-center shadow-sm shadow-gray-200" onPress={() => {deleteAccount(val);}}>
                                    <Text className="text-[#eeeeee] text-sm font-bold">
                                        Delete Account
                                    </Text>
                            </Ripple>
                        </View>
                    </View>
                </Pressable>
            </Modal>

            <Ripple rippleCentered={true} className="py-5 px-8 items-center bg-white flex-row rounded-2xl shadow-sm shadow-gray-400" onPress={() => setModal()}>
                    
                    <LinearGradient colors={colors[color]} className="border p-2.5 rounded-3xl border-gray-300">
                        {icons[icon]}
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
