import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import * as Constants from "node:constants";

export function getCallSign(data: string) {

    const jsondata = JSON.parse(data)
    if(jsondata['callsign'] === undefined || jsondata['callsign'] === null){
        return {}
    }
    console.log(jsondata['callsign'])
    return jsondata['callsign']
}

export function getHisRS(data: string) {
    const jsondata = JSON.parse(data)
    return jsondata['hisrs']
}

export default function App() {
    const [callSign, setCallSign] = React.useState('');
    const [callSigns, setCallSigns] = React.useState([])
    const [hisRS, setHisRS] = React.useState('')
    const [hisRSs, setHisRSs] = React.useState([])
    const loadFromStorage = async () => {
        let rawdata = await AsyncStorage.getItem('data')
        console.log(`loadFromStorage: ${rawdata}`)
        const jsondata = JSON.parse(rawdata)
        setCallSigns([...callSigns, {
            key: Date.now().toString(),
            text: rawdata
        }]);
        if (rawdata === undefined || rawdata === null) {
            rawdata = JSON.stringify({})
        }
    }
    React.useEffect(() => {
        loadFromStorage()
    }, [])
    const addCallSign = async () => {
        if (callSign.trim()) {
            setCallSigns([...callSigns, {
                key: Date.now().toString(),
                text: JSON.stringify({
                    date: Date.now().toString(),
                    callsign: callSign.toUpperCase(),
                    hisrs: hisRS
                }).toString()
            }]);
            await AsyncStorage.setItem('data', JSON.stringify({
                date: Date.now().toString(),
                callsign: callSign.toUpperCase(),
                hisrs: hisRS
            }).toString())
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
            {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
            {/*    <Text>コールサイン</Text>*/}
            {/*    <Text>HisRS</Text>*/}
            {/*</View>*/}
            {/*<FlatList*/}
            {/*    data={callSigns}*/}
            {/*    renderItem={({item}) => (*/}
            {/*        <View style={{flexDirection: 'row', marginTop: 10}}>*/}
            {/*            <Text style={{marginRight: 10}}>*/}
            {/*                {getCallSign(item.text)}</Text>*/}
            {/*            <Text style={{marginRight: 10}}>*/}
            {/*                {getHisRS(item.text)}*/}
            {/*            </Text>*/}
            {/*            <Button*/}
            {/*                title="削除"*/}
            {/*                onPress={() => deleteTask(item.key)}*/}
            {/*            />*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*/>*/}
            <View style={styles.container}>
                <FlatList
                    data={Object.keys(getCallSign(callSigns))}
                    renderItem={({item}) => <Text>{getCallSign(callSigns)[item].name}</Text>}
                />
            </View>


        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});
