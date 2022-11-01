import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';



const BudgetScreen = () => {

    
    return (
        <View>
            <SafeAreaView className="h-screen">

                <View className="p-4">
                <CircularProgress
                    value={58}
                    duration={1000}
                />
                </View>
            </SafeAreaView>

        </View>
    )
}

export default BudgetScreen