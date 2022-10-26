import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    CreditCardIcon,
    CurrencyDollarIcon
} from "react-native-heroicons/outline"
import Ripple from 'react-native-material-ripple'
import { useNavigation } from '@react-navigation/native'


const MoneyJar = ({deleteAccount, title, ammount, val }) => {

    const navigation = useNavigation();
    
    return (
        <View>
            <Ripple rippleCentered={true} className="px-8 py-5 w-screen bg-white items-center flex-row rounded-2xl shadow-md shadow-gray-300" onPress={() => navigation.navigate("EditAccount", {title, ammount, val})}>
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