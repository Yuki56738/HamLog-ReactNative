import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const [callSign, setCallSign] = React.useState('');
    const [callSigns, setCallSigns] = React.useState([])
    const addTask = () => {
        if (callSign.trim()) {
            setCallSigns([...callSigns, {key: Date.now().toString(), text: callSign.toUpperCase()}]);
            setCallSign('');
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
                    // onChangeText={text => setCallSign(text)}
                    // value={callSign}
                    placeholder='  His RS'
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: 60}}
                    // onChangeText={text => setCallSign(text)}
                    // value={callSign}
                    placeholder='  My RS'
                />
            </View>
            <Button
                title="追加"
                onPress={addTask}
            />
            <FlatList
                data={callSigns}
                renderItem={({item}) => (
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text style={{marginRight: 10}}>{item.text}</Text>
                        <Button
                            title="削除"
                            onPress={() => deleteTask(item.key)}
                        />
                    </View>
                )}
            />
        </View>

    )
    // const addHamLog = () =>{
    //   if (callSign.trim() !== ''){
    // setHamLog([...hanLogs, {id: Date.now(), text: callSign}])
    // }
    // return (
    //     <View
    //         style={{
    //           flex: 1,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}>
    //         <TextInput
    //             style={{
    //               height: 40,
    //               borderColor: 'gray',
    //               borderWidth: 1,
    //             }}
    //           // style={{flex: 1, height: 40, borderColor: 'gray'}}
    //           placeholder='コールサインを入力'
    //           value={callSign}
    //           onChangeText={(text) => setHamLog(text)}>
    //         </TextInput>
    //     </View>
    // );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
