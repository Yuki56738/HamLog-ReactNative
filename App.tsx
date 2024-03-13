import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getCallSign(data:string) {

    const jsondata = JSON.parse(data)
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
    const loadStorage = async () =>{
        const loadDataString = await AsyncStorage.getItem('data')
        setCallSigns(loadDataString)
    }
    // setCallSigns([...callSigns, {key: 'data', text: AsyncStorage.getItem('data').toString()}])
    const addCallSign = async () => {
        if (callSign.trim()) {
            const data = {
                date: Date.now().toString(),
                callsign: callSign.toUpperCase(),
                hisrs: hisRS
            };
            setCallSigns([...callSigns, {
                key: Date.now().toString(),
                text: JSON.stringify(data)
            }]);
            const saveStorage = async () =>{
                const jsonraw = await AsyncStorage.getItem('data');
                if (jsonraw === null){
                    console.log('data is null')
                    await AsyncStorage.setItem("data", JSON.stringify([data]));
                    return ;
                }
                let jsondata = JSON.parse(jsonraw);
                const new_hamlog = {
                    date: Date.now().toString(),
                    callsign: callSign.toUpperCase(),
                    hisrs: hisRS
                }
                jsondata.push(new_hamlog); // ここで配列に追加したい
                await AsyncStorage.setItem("data", JSON.stringify(jsondata));
                const re = await AsyncStorage.getItem("data");
                console.log(`addCallSign: ${re?.toString()}`);
            }
            await saveStorage()

            setCallSign('');
            setHisRS('')
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
                    placeholder='  My RS'
                />
            </View>
            <Button
                title="追加"
                onPress={addCallSign}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>

                <Text>コールサイン</Text>
                <Text>HisRS</Text>
            </View>
            <FlatList
                data={callSigns}
                renderItem={({item}) => (
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text style={{marginRight: 10}}>
                            {getCallSign(item.text)}</Text>
                        <Text style={{marginRight: 10}}>
                            {getHisRS(item.text)}
                        </Text>
                        <Button
                            title="削除"
                            onPress={() => deleteTask(item.key)}
                        />
                    </View>
                )}
            />
        </View>

    )}
