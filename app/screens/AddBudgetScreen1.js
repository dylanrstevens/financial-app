import { View, Text, SafeAreaView, Pressable, Keyboard } from 'react-native'
import React, {useState, useEffect} from 'react'
import RadioGroup from 'react-native-radio-buttons-group/lib/RadioGroup';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { Picker } from '@react-native-picker/picker';

const AddBudgetScreen1 = () => {

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

    const renderDaysItems = Array.from(Array(31).keys());

    
    
    const TypeOfInputs = (props) => {
        const option = props.option
        if (option == 1) {
            return <EveryXDays/>
        }
    }

    return (
        <SafeAreaView>
            <View>
                <Pressable onPress={Keyboard.dismiss} className="">
                    <View className="bg-white">
                        <View className="p-3 items-center">
                        <RadioGroup 
                            radioButtons={radioButtons}
                            onPress={onPressRadioButton}
                            containerStyle={{
                                alignItems: 'left'
                            }}
                        >
                        </RadioGroup>
                        </View>
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

                    </View>

                    
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default AddBudgetScreen1
