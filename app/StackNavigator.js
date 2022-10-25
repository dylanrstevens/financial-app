import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import AddAccountScreen from './screens/AddAccountScreen';
import * as SQLite from "expo-sqlite"
import EditAccountScreen from './screens/EditAccountScreen';
const db = SQLite.openDatabase("AppDB");

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const [data, setData] = useState([])

    const AddAccount = (name, money) => {
        // is text empty?
        if (name === null || name === "") {
          return false;
        }
    
        db.transaction(
          (tx) => {
            tx.executeSql("insert into Accounts (name, money) values (?, ?)", [name, money]);
          },
        );
      }; 

    const getAccountData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql("select * from Accounts", [], (_, { rows: {_array} }) => {
                    const values = _array;
                    setData(values)
                }
            )}            
        )
    }

    const deleteALL = () => {

        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts")
            }
        )
    }


    const deleteAccount = (id) => {

        db.transaction(
            (tx) => {
                tx.executeSql("delete from Accounts where id = ?", [id])
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
                {(props) => <HomeScreen deleteAccount={deleteAccount} data={data} deleteALL={deleteALL} AddAccount={AddAccount} getAccountData={getAccountData}/>}
            </Stack.Screen>

            <Stack.Screen name="AddAccount"
                options={{ presentation: 'card', headerShown: false }}
            >
                {(props) => <AddAccountScreen deleteALL={deleteALL} AddAccount={AddAccount} getAccountData={getAccountData}/>}
            </Stack.Screen>

            <Stack.Screen name="EditAccount" component={EditAccountScreen}
                options={{ presentation: 'modal', headerShown: false }}
            />   
            
        </Stack.Navigator>
        
    )
}

export default StackNavigator