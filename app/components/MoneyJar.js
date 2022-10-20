import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    CurrencyDollarIcon
} from "react-native-heroicons/outline"

const MoneyJar = ({ title }) => {
  return (
    <View>
        <TouchableOpacity className="p-5 items-center">
            <CurrencyDollarIcon color={'#000000'} size={80}/>
            <Text className="font-light text-lg">
                {title}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default MoneyJar