import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getCallSign(data:string) {

    const jsondata = JSON.parse(data)
    console.log(jsondata['callsign'])
    return jsondata['callsign']
}

export function getHisRS(data:string) {
    const jsondata = JSON.parse(data)
    return jsondata['hisrs']
}

export default function App() {
    const [callSign, setCallSign] = React.useState('');
    const [callSigns, setCallSigns] = React.useState([])
    const [hisRS, setHisRS] = React.useState('')
    const [hisRSs, setHisRSs] = React.useState([])
    const [myRS, setMyRS] = React.useState('')
    const addCallSign = async () => {
        if (callSign.trim()) {

            // const data = JSON.stringify({callsign: callSign.toUpperCase(), hisrs: hisRS});
            let data = []
            let date = new Date();
            let date1 = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            data.push([date1, callSign.toUpperCase(), hisRS, myRS])
            console.log(data);
            setCallSigns(data);
            const saveStorage = async () =>{
                await AsyncStorage.setItem("data", data);
                const re = await AsyncStorage.getItem("data")
                console.log(re)
            }
            await saveStorage()

            setCallSign('');
            setHisRS('')
            setMyRS('')
        }

    };
    const deleteTask = (taskId) => {
        setCallSigns(callSigns.filter(task => task.key !== taskId));
    };

    return (
        <View style={{padding: 20}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>ハムログ by JK1UXI</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
                    onChangeText={text => setCallSign(text)}
                    value={callSign}
                    placeholder='  コールサイン'
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: 60}}
                    onChangeText={text => setHisRS(text)}
                    value={hisRS}
                    placeholder='  His RS'
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: 60}}
                    value={myRS}
                    onChangeText={text => setMyRS(text)}
                    placeholder='  My RS'
                />
            </View>
            <Button
                title="追加"
                onPress={addCallSign}
            />
            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
            {/*    <Text>コールサイン</Text>*/}
            {/*    <Text>HisRS</Text>*/}
            {/*</View>*/}
            <FlatList
                data={callSigns}
                renderItem={({item}) => (
                    // <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View>
                        <Text>
                            {item}</Text>
                        {/*<Text style={{marginRight: 10}}>*/}
                        {/*    {getHisRS(item.text)}*/}
                        {/*</Text>*/}
                        <Button
                            title="削除"
                            onPress={() => deleteTask(item.key)}
                        />
                    </View>
                )}
            />
        </View>

    )}
