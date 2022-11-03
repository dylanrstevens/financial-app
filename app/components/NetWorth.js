import { View, Text } from 'react-native'
import React from 'react'

const NetWorth = ({item}) => {

    const RenderNetWorth = () => {
        if(item["total_money"] == null) {
            return;
        }
        else {
            return <Text className="text-black text-xl font-bold">{item["total_money"].toLocaleString(undefined, {maximumFractionDigits:2})}</Text>
        }
    }

    return (
        <View>
            <RenderNetWorth/>
        </View>
    )
}

export default NetWorth