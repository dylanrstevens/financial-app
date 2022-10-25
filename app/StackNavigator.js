import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import * as SQLite from "expo-sqlite"
const db = SQLite.openDatabase("AppDB");

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const AddAccount = (name, money) => {
        // is text empty?
        if (name === null || name === "") {
          return false;
        }
    
        db.transaction(
          (tx) => {
            tx.executeSql("insert into Accounts (name, money) values (?, ?)", [name, money]);
            tx.executeSql("select * from Accounts", [], (_, { rows }) =>
              console.log(JSON.stringify(rows))
            );
          },
        );
      }; 
    
      const deleteALL = () => {
    
        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts")
            }
        )
      }
    
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            "create table if not exists Accounts (id integer primary key not null, name text, money real);"
          );
        });
      }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home">
                {(props) => <HomeScreen deleteALL={deleteALL} AddAccount={AddAccount}/>}
            </Stack.Screen>
            <Stack.Screen name="AddAccount"
                options={{ presentation: 'modal', headerShown: false }}
            >
                {(props) => <AddAccountScreen deleteALL={deleteALL} AddAccount={AddAccount}/>}
            </Stack.Screen>
        </Stack.Navigator>
        
    )
}

export default StackNavigator