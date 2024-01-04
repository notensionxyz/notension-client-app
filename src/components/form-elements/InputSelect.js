import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Modal, ScrollView } from 'react-native';

export default function ({ initial_value, data, selectText, onPress, border = true }) {

    const [visible, setVisible] = useState(false);
    const [arr, setArr] = useState(data);
    const [value, setValue] = useState(initial_value);

    const onPick = (item, idx) => {
        return () => {
            setValue(item.text);
            setVisible(false);
            return onPress(item);
        };
    };

    return (
        <View>

            <TouchableOpacity onPress={() => setVisible(true)}
                style={{
                    height: 44,
                    marginTop: 3,
                    borderWidth: border ? 1 : 0,
                    //borderRadius: border ? 5 : 0,
                    borderBottomWidth: !border ? 1 : 1,
                    borderColor: 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                }}>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 17, opacity: 0.7 }}>{value}</Text>
                </View>
                <View>
                    <Image style={{ width: 24, height: 24 }} source={require('../../assets/dialog/chevron_down.png')} />
                </View>

            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 20,
                }}>

                    <View style={{ backgroundColor: '#FFF', borderRadius: 5, borderWidth: 1, borderColor: '#E0E0E0' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{selectText}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setVisible(false)} style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image style={{ width: 15, height: 15 }}
                                    source={require('../../assets/icon/ic_close.png')} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 20 }}>
                                {
                                    arr.map((x, y) => {
                                        return (
                                            <TouchableOpacity onPress={onPick(x)} key={y} style={{
                                                height: 40,
                                                borderBottomWidth: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderBottomColor: '#E0E0E0',
                                            }}>
                                                <Text style={{ fontSize: 17, color: 'black' }}>{x.text}</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
