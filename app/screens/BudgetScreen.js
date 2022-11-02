import { View, Text, SafeAreaView, TextInput, ScrollView, Pressable, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Ripple from 'react-native-material-ripple'
import {
    AdjustmentsVerticalIcon,
    Bars3Icon,
    MagnifyingGlassCircleIcon,
    PlusIcon
} from "react-native-heroicons/outline"
import Modal from "react-native-modal";
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import RadioGroup from 'react-native-radio-buttons-group/lib/RadioGroup';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { Picker } from '@react-native-picker/picker';




const BudgetScreen = ({navigation}) => {

    const dollarMask = createNumberMask({
        prefix: ['$'],
        delimiter: ',',
        separator: '.',
        precision: 2,
    })

    const [incomeValueOption1, setIncomeValueOption1] = useState("")

    const [selectedOption, setSelectedOption] = useState(0)

    const [showCreateBudget, setShowCreateBudget] = useState(false)

    const [radioButtons, setRadioButtons] = useState([{
        id: '1', // acts as primary key
        label: 'I get paid every (x) days',
        value: '1', //1 indicates the first option
        size: 35,
        labelStyle: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        onPress: () => setSelectedOption(1)
    }, {
        id: '2',
        label: 'I get paid (x) times a month',
        value: '2', //2 indicates the second option, this value will be set to incomeOption in order to render the right text inputs
        size: 35,
        labelStyle: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        onPress: () => setSelectedOption(2)
    }])

    const [selectedDaysOption1, setSelectedDaysOption1] = useState();

    const onPressRadioButton = (radioButtonArray) => {
        setRadioButtons(radioButtonArray)
    }

    const unsetCreateBudget = () => {
        setShowCreateBudget(false)
    }

    const setCreateBudget = () => {
        setShowCreateBudget(true)
    }

    const renderDaysItems = Array.from(Array(31).keys());

    const EveryXDays = (props) => {
        return (
            <View>
                <View className="items-center">
                    <Text className="font-bold text-lg pt-8">
                        How much do you get paid?
                    </Text>
                    <View className="py-8 w-1/2">
                        <MaskInput value={incomeValueOption1} placeholder='Ammount' keyboardType='number-pad' onChangeText={(masked) => {setIncomeValueOption1(masked); console.log(masked)}} maxLength={12}
                        className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-md rounded-lg focus:ring-[#8cbbf1] focus:border-[#8cbbf1] block p-4 shadow-sm shadow-gray-300"
                        mask={dollarMask}>
                        </MaskInput>
                    </View>
                    <Text className=" font-bold text-lg">
                        Every
                    </Text>
                </View>
                <View className="">
                    <Picker
                        selectedValue={selectedDaysOption1}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedDaysOption1(itemValue)
                        }>
                        {renderDaysItems.map((numbers, index) => (
                            <Picker.Item label={(numbers+1).toString()} value={numbers+1} key={index}/>
                        ))}
                    </Picker>
                </View>
                <View className="items-center">
                    <Text className=" font-bold text-lg">
                        Days
                    </Text>
                </View>
            </View>
        )
    }

    const TypeOfInputs = (props) => {
        const option = props.option
        if (option == 1) {
            return <EveryXDays/>
        }
    }
    
    return (
        <View className="min-h-screen flex flex-col">
            {/**Create new budget Modal */}
            <Modal 
            isVisible={showCreateBudget}
            onSwipeComplete={() => {unsetCreateBudget(); setSelectedOption(0); radioButtons.forEach((item) => item.selected=false)}}
            swipeDirection="right"
            backdropOpacity={0.4}
            animationInTiming={300}
            animationOutTiming={300}
            avoidKeyboard={false}
            animationIn='slideInRight'
            animationOut='slideOutRight'
            >
                <Pressable onPress={Keyboard.dismiss} className="flex-1 flex-col justify-start items-end pt-6">
                    <View className="bg-white rounded-3xl h-1/3">
                        <View className="p-2 items-center">
                            <Text className="font-bold text-center text-lg p-2">
                                Please select on option to{"\n"}determine how we calculate{"\n"}your budget
                            </Text>
                            <View className="p-3">
                                <Ripple rippleCentered={true} className="rounded-3xl" onPress={() => {unsetCreateBudget(); navigation.navigate("budgetOption1")}}>
                                <LinearGradient colors={['#8cbbf1', '#d4e6fb']} className="border p-3 rounded-3xl border-gray-300" >
                                    <Text className="text-black font-semibold text-lg">
                                        I get paid every (x) days
                                    </Text>
                                </LinearGradient>
                                </Ripple>
                            </View>
                            <View className="p-3">
                                <Ripple rippleCentered={true} className="rounded-3xl">
                                <LinearGradient colors={['#8cbbf1', '#d4e6fb']} className="border p-3 rounded-3xl border-gray-300">
                                    <Text className="text-black font-semibold text-lg">
                                        I get paid (x) times a month
                                    </Text>
                                </LinearGradient>
                                </Ripple>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>

            {/**Header */}
            <LinearGradient colors={['#b7f4e3', '#e2cbf9']}>
            <SafeAreaView className=" pt-5 border-b border-gray-300">
                <View className="shadow-lg shadow-gray-$00">
                    {/**Title and Icons*/}
                    <View className="flex-row pb-6 items-center justify-between mx-4 space-x-2">
                        <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => navigation.openDrawer()}>
                            <Bars3Icon size={35} color="#FFFFFF"/>
                        </Ripple>
                        <Text className="font-bold text-3xl text-center p-3 text-white">
                            Budget
                        </Text>
                        <Ripple rippleCentered={true} className="rounded-3xl p-3" onPress={() => setCreateBudget()}>
                            <PlusIcon size={35} color="#FFFFFF"/>
                        </Ripple>
                    </View>
                </View>
            </SafeAreaView>
            </LinearGradient>

            {/**Body */}
            <View className="flex-grow">
                <ScrollView
                    className="bg-white"
                    contentContainerStyle={{
                        paddingBottom: 0,
                    }}
                >
                
                <Text className="text-lg p-5 font-normal">
                    Looks like you don't have a budget yet. To get started, press the plus in right corner
                </Text>
                   
                
                </ScrollView>
            </View>

        </View>
    )
}

export default BudgetScreen